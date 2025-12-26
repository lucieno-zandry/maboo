import React from "react";
import ProductRow from "./ProductRow/ProductRow";
import { Category, ProductList } from "../../../../../../utilities/constants/types";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { useDeleteProduct } from "../Products";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useFilterRow } from "../../../../../../utilities/hooks/admin/useFilterRow";

type Props = {
    products: ProductList[],
    categories: Category[],
}

const ProductsList = (props: Props) => {
    const { products, categories } = props;
    const onDelete = useDeleteProduct();
    const filterRow = useFilterRow();

    const [state, setState] = React.useState({
        selected: null as ProductList[] | null,
    });

    const [categoryFilter, setCategoryFilter] = React.useState<number | 'all'>('all');

    const categoryById = React.useMemo(() => {
        const map = new Map<number, Category>();
        categories.forEach(c => map.set(c.id, c));
        return map;
    }, [categories]);

    const filteredProducts = React.useMemo(() => {
        if (categoryFilter === 'all') return products;
        return products?.filter(p => p.category_id === categoryFilter);
    }, [products, categoryFilter]);

    const displayedProducts = React.useMemo(() => filteredProducts || [], [filteredProducts]);

    const toggleSelected = React.useCallback(() => {
        setState(s => ({ ...s, selected: s.selected ? null : [] }));
    }, []);

    const addToSelected = React.useCallback((product: ProductList) => {
        setState(s => {
            const state = { ...s };

            if (state.selected) {
                state.selected.push(product);
            }

            return state;
        });
    }, []);

    const removeFromSelected = React.useCallback((id: number) => {
        setState(s => {
            const state = { ...s };

            if (state.selected) {
                state.selected = state.selected.filter((product) => product.id !== id);
            }

            return state;
        })
    }, []);


    const handleDelete = React.useCallback(() => {
        if (state.selected) {
            setState(s => ({ ...s, selected: null }));
            onDelete.setCurrent(state.selected);
        }
    }, [state.selected, onDelete.setCurrent]);

    const handleSelectAll = React.useCallback(() => {
        setState(s => {
            const state = { ...s };

            if ((state.selected?.length ?? 0) < displayedProducts.length) {
                state.selected = displayedProducts;
            } else {
                state.selected = [];
            }
            
            return state
        });
    }, [displayedProducts]);

    return <table className="products-list-container table table-striped table-hover align-middle">
        <thead>
            <tr>
                {state.selected && <th className="col-1">
                    <Checkbox
                        label="Tout"
                        checked={state.selected.length === displayedProducts.length}
                        onChange={handleSelectAll} />
                </th>}
                <th className="col-1"></th>
                <th className="col-2">Titre</th>
                <th className="col-2">Description</th>
                <th className="col-1">Prix</th>
                <th className="col-1">Créé le</th>
                <th className="col-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Catégorie</span>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto', maxWidth: '120px' }}
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        >
                            <option value="all">Toutes</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </th>
                <th className="col-2 text-align-center">
                    {state.selected ?
                        <Button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={state.selected.length === 0}
                            onClick={handleDelete}>
                            <i className="fa fa-trash"></i> Supprimer
                        </Button> :
                        <Button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={toggleSelected}>
                            Séléctionner
                        </Button>}
                </th>
            </tr>
        </thead>
        <tbody >
            {displayedProducts.map(product => {
                const categoryName = categoryById.get(product.category_id)?.name || '';
                const firstVariant = product.variants?.[0];
                const price = firstVariant?.price || 0;
                const salePrice = firstVariant?.special_price || 0;

                const row = <ProductRow
                    product={product}
                    key={product.id}
                    addToSelected={addToSelected}
                    removeFromSelected={removeFromSelected}
                    toggleSelected={toggleSelected}
                    selected={state.selected}
                    categories={categories}
                />

                return filterRow([
                    categoryName,
                    price,
                    salePrice,
                    product.title,
                    product.description], row);
            })}
        </tbody>
    </table>
}

export default ProductsList;

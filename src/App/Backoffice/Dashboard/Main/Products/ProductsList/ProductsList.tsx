import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../../utilities/redux/store";
import ProductRow from "./ProductRow/ProductRow";
import { Product } from "../../../../../../utilities/constants/types";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { useDeleteProduct } from "../Products";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useFilterRow } from "../../../../../../utilities/hooks/admin/useFilterRow";

const ProductsList = React.memo(() => {
    const products = useSelector((state: Rootstate) => state.backoffice.products);
    const onDelete = useDeleteProduct();
    const filterRow = useFilterRow();

    const [state, setState] = React.useState({
        selected: null as Product[] | null,
    });

    const toggleSelected = React.useCallback(() => {
        setState(s => ({ ...s, selected: s.selected ? null : [] }));
    }, []);

    const addToSelected = React.useCallback((product: Product) => {
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

            if (state.selected?.length! < products?.length!) {
                state.selected = products;
            } else {
                state.selected = [];
            }
            
            return state
        });
    }, [products]);

    return <table className="products-list-container table table-striped table-hover align-middle">
        <thead>
            <tr>
                {state.selected && <th className="col-1">
                    <Checkbox
                        label="Tout"
                        checked={state.selected.length === products?.length}
                        onChange={handleSelectAll} />
                </th>}
                <th className="col-1"></th>
                <th className="col-2">Titre</th>
                <th className="col-2">Description</th>
                <th className="col-1">Prix</th>
                <th className="col-1">Créé le</th>
                <th className="col-2">Catégorie</th>
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
            {products?.map(product => {
                const row = <ProductRow
                    product={product}
                    key={product.id}
                    addToSelected={addToSelected}
                    removeFromSelected={removeFromSelected}
                    toggleSelected={toggleSelected}
                    selected={state.selected}
                />

                return filterRow([
                    product.category?.name || '',
                    product.price,
                    product.sale_price,
                    product.title,
                    product.description], row);
            })}
        </tbody>
    </table>
})

export default ProductsList;
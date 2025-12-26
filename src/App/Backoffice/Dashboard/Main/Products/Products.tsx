import React from "react";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import ProductsList from "./ProductsList/ProductsList";
import AddProduct from "./AddProduct/AddProduct";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import EditProduct from "./EditProduct/EditProduct";
import { Category, ProductColor, ProductDetail, ProductList, ProductVariant } from "../../../../../utilities/constants/types";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";
import TablePlaceholder from "../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import ScrollEnd from "../../../../../utilities/minitiatures/ScrollEnd/ScrollEnd";
import { getCategories, getMerchantProducts, getProduct } from "../../../../../utilities/api/actions";
import arrayUnique from "../../../../../utilities/helpers/arrayUnique";

const DEFAULT_EDIT = {
    current: null as ProductDetail | null,
    loading: false,
    open: (product: ProductList) => { product },
    setCurrent: (product: ProductDetail | null) => { product }
}

const DEFAULT_DELETE = {
    current: null as ProductList[] | null,
    setCurrent: (products: ProductList[] | null) => { products }
}

type VariantProduct = {
    id: number,
    slug?: string,
    title?: string,
    variants: ProductVariant[],
}

type ColorProduct = {
    id: number,
    colors: ProductColor[],
}

const DEFAULT_PRODUCT_VARIANT = {
    current: null as VariantProduct | null,
    setCurrent: (product: VariantProduct | null) => { product }
}

const DEFAULT_PRODUCT_COLOR = {
    current: null as ColorProduct | null,
    setCurrent: (product: ColorProduct | null) => { product }
}

const ProductsContext = React.createContext({
    edit: DEFAULT_EDIT,
    onDelete: DEFAULT_DELETE,
    variant: DEFAULT_PRODUCT_VARIANT,
    color: DEFAULT_PRODUCT_COLOR,
    products: null as ProductList[] | null,
    categories: null as Category[] | null,
    reloadProducts: () => { },
});

export const useEditProduct = () => {
    return React.useContext(ProductsContext).edit;
}

export const useDeleteProduct = () => {
    return React.useContext(ProductsContext).onDelete;
}

export const useVariant = () => {
    return React.useContext(ProductsContext).variant;
}

export const useColor = () => {
    return React.useContext(ProductsContext).color;
}

export const useProducts = () => {
    const { products, categories, reloadProducts } = React.useContext(ProductsContext);
    return { products, categories, reloadProducts };
}

const dataLimit = 20;

const Products = React.memo(() => {

    const [products, setProducts] = React.useState<ProductList[] | null>(null);
    const [categories, setCategories] = React.useState<Category[] | null>(null);

    const [state, setState] = React.useState({
        edit: DEFAULT_EDIT,
        onDelete: DEFAULT_DELETE,
        variant: DEFAULT_PRODUCT_VARIANT,
        color: DEFAULT_PRODUCT_COLOR,
    });

    const [query, setQuery] = React.useState({
        offset: 0,
        scrollEnd: true,
    });

    const reloadProducts = React.useCallback(() => {
        getMerchantProducts({ limit: dataLimit, offset: 0 })
            .then(response => {
                setProducts(response.data.products);
                const length = response.data.products.length;
                setQuery(q => ({ ...q, offset: length, scrollEnd: length >= dataLimit }));
            })
            .catch(() => {
                setProducts([]);
            });
    }, []);

    React.useEffect(() => {
        const normalizeCategories = (data: any): Category[] => {
            const hierarchy = data?.hierarchy ?? data;

            if (Array.isArray(hierarchy) && hierarchy.length > 0) {
                const first = hierarchy[0];
                if (first && typeof first === 'object' && 'category' in first) {
                    return hierarchy
                        .map((node: any) => node?.category)
                        .filter(Boolean);
                }
            }

            if (Array.isArray(data)) {
                return data.filter(Boolean);
            }

            return [];
        };

        getCategories()
            .then((response) => {
                setCategories(normalizeCategories(response.data));
            })
            .catch(() => setCategories([]));
    }, []);

    const edit = React.useMemo(() => {
        const setCurrent = (product: ProductDetail | null) => {
            setState(s => ({ ...s, edit: { ...s.edit, current: product, loading: false } }));
            if (!product) {
                setState(s => ({ ...s, variant: { ...s.variant, current: null } }));
                setState(s => ({ ...s, color: { ...s.color, current: null } }));
            }
        };

        const open = (product: ProductList) => {
            const placeholder: ProductDetail = {
                id: product.id,
                created_at: product.created_at,
                updated_at: product.updated_at,
                slug: product.slug,
                title: product.title,
                description: product.description,
                category_id: product.category_id,
                variant_groups: [],
                variants: [],
            };

            setState(s => ({ ...s, edit: { ...s.edit, current: placeholder, loading: true } }));
            setState(s => ({
                ...s,
                variant: { ...s.variant, current: { id: product.id, slug: product.slug, title: product.title, variants: [] } },
            }));
            setState(s => ({
                ...s,
                color: { ...s.color, current: { id: product.id, colors: [] } },
            }));

            getProduct(product.slug)
                .then((response) => {
                    const detail = response.data?.product as ProductDetail | undefined;
                    if (!detail) return;

                    const groupNameById = new Map<number, string>();
                    (detail.variant_groups || []).forEach(g => groupNameById.set(g.id, g.name));

                    const variants: ProductVariant[] = (detail.variants || []).map(v => {
                        const attributes = (v.variant_options || []).reduce((acc, opt) => {
                            const groupName = groupNameById.get(opt.variant_group_id) || String(opt.variant_group_id);
                            acc[groupName] = opt.value;
                            return acc;
                        }, {} as { [key: string]: string });

                        return {
                            id: v.id,
                            created_at: v.created_at,
                            updated_at: v.updated_at,
                            product_id: v.product_id,
                            sku: v.sku,
                            price: v.price,
                            special_price: v.special_price,
                            stock: v.stock,
                            inStock: v.stock,
                            image: v.image || '',
                            name: v.sku,
                            attributes: Object.keys(attributes).length ? attributes : null,
                        };
                    });

                    setState(s => ({ ...s, edit: { ...s.edit, current: detail, loading: false } }));
                    setState(s => ({
                        ...s,
                        variant: { ...s.variant, current: { id: detail.id, slug: detail.slug, title: detail.title, variants } },
                    }));

                    const detailWithColors = detail as unknown as { colors?: ProductColor[] };
                    if (detailWithColors.colors) {
                        setState(s => ({
                            ...s,
                            color: { ...s.color, current: { id: detail.id, colors: detailWithColors.colors || [] } },
                        }));
                    }
                })
                .catch(() => {
                    setState(s => ({ ...s, edit: { ...s.edit, loading: false } }));
                });
        };

        return {
            current: state.edit.current,
            loading: state.edit.loading,
            open,
            setCurrent
        }
    }, [state.edit.current, state.edit.loading]);

    const onDelete = React.useMemo(() => {
        const setCurrent = (products: ProductList[] | null) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, current: products } }));
        }

        return {
            current: state.onDelete.current,
            setCurrent,
        }
    }, [state.onDelete.current]);

    const variant = React.useMemo(() => {
        const setCurrent = (product: VariantProduct | null) => {
            setState(s => ({ ...s, variant: { ...s.variant, current: product } }));
        }

        return {
            current: state.variant.current,
            setCurrent,
        }
    }, [state.variant.current]);

    const color = React.useMemo(() => {
        const setCurrent = (product: ColorProduct | null) => {
            setState(s => ({ ...s, color: { ...s.color, current: product } }));
        }

        return {
            current: state.color.current,
            setCurrent,
        }
    }, [state.color.current]);

    React.useEffect(() => {
        reloadProducts();
    }, [reloadProducts]);

    const handleScrollEnd = React.useCallback(() => {
        if (!products) return;
        getMerchantProducts({ limit: dataLimit, offset: query.offset })
            .then(response => {
                const freshProducts: ProductList[] = response.data.products;

                if (freshProducts.length > 0) {
                    setProducts(prev => arrayUnique([...(prev || []), ...freshProducts], (p) => p.id));
                }

                setQuery(q => ({
                    ...q,
                    offset: q.offset + freshProducts.length,
                    scrollEnd: freshProducts.length >= dataLimit,
                }));
            })
    }, [products, query]);

    return <ProductsContext.Provider value={{ edit, onDelete, variant, color, products, categories, reloadProducts }}>
        <div className="products-container">
            <Fade show={Boolean(products && products.length > 0)}>
                <ProductsList products={products || []} categories={categories || []} />
            </Fade>
            <Fade show={Boolean(products && products.length === 0)}>
                <ProductsEmpty />
            </Fade>
            <ScrollEnd show={query.scrollEnd} whileInView={handleScrollEnd}>
                <TablePlaceholder />
            </ScrollEnd>
            <AddProduct />
            <DeleteProduct />
            <EditProduct />
        </div>
    </ProductsContext.Provider>
});

export default Products;

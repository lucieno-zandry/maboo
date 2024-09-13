import React from "react";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import ProductsList from "./ProductsList/ProductsList";
import AddProduct from "./AddProduct/AddProduct";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import EditProduct from "./EditProduct/EditProduct";
import { refreshCategories, setAdminProducts } from "../../../../../utilities/redux/backoffice/backofficeSlice";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../../../utilities/constants/types";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";
import TablePlaceholder from "../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import ProductVariant from "./ProductVariant/ProductVariant";
import ProductColor from "./ProductColor/ProductColor";
import ScrollEnd from "../../../../../utilities/minitiatures/ScrollEnd/ScrollEnd";
import { getMerchantProducts } from "../../../../../utilities/api/actions";
import arrayMerge from "../../../../../utilities/helpers/arrayMerge";

const DEFAULT_EDIT = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const DEFAULT_DELETE = {
    current: null as Product[] | null,
    setCurrent: (products: Product[] | null) => { products }
}

const DEFAULT_PRODUCT_VARIANT = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const DEFAULT_PRODUCT_COLOR = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const ProductsContext = React.createContext({
    edit: DEFAULT_EDIT,
    onDelete: DEFAULT_DELETE,
    variant: DEFAULT_PRODUCT_VARIANT,
    color: DEFAULT_PRODUCT_COLOR,
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

const dataLimit = 20;

const Products = React.memo(() => {

    const { categories, products } = useSelector((state: Rootstate) => state.backoffice);
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        edit: DEFAULT_EDIT,
        onDelete: DEFAULT_DELETE,
        variant: DEFAULT_PRODUCT_VARIANT,
        color: DEFAULT_PRODUCT_COLOR,
    });

    const [query, setQuery] = React.useState({
        offset: products ? products.length : 0,
        scrollEnd: true,
    });

    const edit = React.useMemo(() => {
        const setCurrent = (product: Product | null) => {
            setState(s => ({ ...s, edit: { ...s.edit, current: product } }));
        }

        return {
            current: state.edit.current,
            setCurrent
        }
    }, [state.edit.current]);

    const onDelete = React.useMemo(() => {
        const setCurrent = (products: Product[] | null) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, current: products } }));
        }

        return {
            current: state.onDelete.current,
            setCurrent,
        }
    }, [state.onDelete.current]);

    const variant = React.useMemo(() => {
        const setCurrent = (product: Product | null) => {
            setState(s => ({ ...s, variant: { ...s.variant, current: product } }));
        }

        return {
            current: state.variant.current,
            setCurrent,
        }
    }, [state.variant.current]);

    const color = React.useMemo(() => ({
        current: state.color.current,
        setCurrent: (product: Product | null) => {
            setState(s => ({ ...s, color: { ...s.color, current: product } }));
        }
    }), [state.color.current]);

    React.useEffect(() => {
        if (!categories) {
            dispatch(refreshCategories());
        }
    }, [categories, products]);

    const handleScrollEnd = React.useCallback(() => {
        const newQuery = { ...query };
        getMerchantProducts({ limit: dataLimit, offset: query.offset })
            .then(response => {
                const freshProducts: Product[] = response.data.products;

                if (freshProducts.length > 0) {
                    const newProducts = arrayMerge<Product>(products || [], freshProducts);
                    newQuery.offset = newProducts.length;
                    dispatch(setAdminProducts(newProducts));
                }

                if (freshProducts.length < dataLimit) {
                    newQuery.scrollEnd = false;
                }

                setQuery(newQuery);
            })
    }, [products, query]);

    return <ProductsContext.Provider value={{ edit, onDelete, variant, color }}>
        <div className="products-container">
            <Fade show={Boolean(products && products.length > 0)}>
                <ProductsList />
            </Fade>
            <Fade show={products?.length === 0}>
                <ProductsEmpty />
            </Fade>
            <ScrollEnd show={query.scrollEnd} whileInView={handleScrollEnd}>
                <TablePlaceholder />
            </ScrollEnd>
            <AddProduct />
            <DeleteProduct />
            <EditProduct />
            <ProductVariant />
            <ProductColor />
        </div>
    </ProductsContext.Provider>
});

export default Products;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rootstate } from "../../../utilities/redux/store";
import { setCategoryProducts } from "../../../utilities/redux/frontoffice/frontofficeSlice";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import generateArray from "../../../utilities/helpers/generateArray";
import Fade from "../../../utilities/minitiatures/Fade/Fade";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";
import ScrollEnd from "../../../utilities/minitiatures/ScrollEnd/ScrollEnd";
import { getCategoryProducts } from "../../../utilities/api/actions";
import arrayMerge from "../../../utilities/helpers/arrayMerge";
import { Product } from "../../../utilities/constants/types";

const randomArray = generateArray(10);
const dataLimit = 30;

const Category = React.memo(() => {
    const id = useParams().id;
    const selectorId = React.useMemo(() => `category-${id}`, [id]);
    const dispatch = useDispatch()
    const products = useSelector((state: Rootstate) => state.frontoffice.categoryProducts[selectorId]);

    const [state, setState] = React.useState({
        scrollEnd: true,
        offset: 0,
        lastId: selectorId,
    });

    React.useEffect(() => {
        if (state.lastId !== selectorId) {
            const offset = products?.length ? products.length : 0;
            setState(s => ({ ...s, scrollEnd: true, offset, lastId: selectorId }));
        }
    }, [selectorId, products, state]);

    const handleScrollEnd = React.useCallback(() => {
        if (id) {
            getCategoryProducts(parseInt(id), {
                offset: state.offset,
                limit: dataLimit,
            })
                .then(response => {
                    setState(state => {
                        const newState = { ...state };
                        const freshProducts: Product[] = response.data.products;

                        if (freshProducts && freshProducts.length > 0) {
                            const mergedProducts = arrayMerge<Product>(products || [], freshProducts);
                            newState.offset = mergedProducts.length;

                            if (freshProducts.length < dataLimit) {
                                newState.scrollEnd = false;
                            }

                            dispatch(setCategoryProducts({ products: mergedProducts, selectorId }))
                        } else {
                            newState.scrollEnd = false;
                        }

                        return newState;
                    })
                })
        }
    }, [products, selectorId, state.offset]);

    console.log('render');

    return <div className="category-container container">
        <Fade show={Boolean(products && products.length > 0)} className="d-flex flex-wrap gap-4 col-12">
            {products && products.length > 0 && products.map((product, key) => {
                return <HoverableProduct product={product} key={key} />
            })}
        </Fade>

        <ScrollEnd
            whileInView={handleScrollEnd}
            show={state.scrollEnd}
            className="d-flex flex-wrap gap-4 col-12">
            {randomArray.map((random, key) => {
                random;
                return <HoverableProductPlaceholder
                    index={key}
                    key={key} />
            })}
        </ScrollEnd>

        <Fade show={products?.length === 0}>
            <ProductsEmpty />
        </Fade>
    </div>
});

export default Category;
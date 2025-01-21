import React from "react";
import { useSearch } from "../Search";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import ScrollEnd from "../../../../utilities/minitiatures/ScrollEnd/ScrollEnd";
import generateArray from "../../../../utilities/helpers/generateArray";
import { search } from "../../../../utilities/api/actions";
import { useParams } from "react-router-dom";
import arrayMerge from "../../../../utilities/helpers/arrayMerge";
import { Product } from "../../../../utilities/constants/types";
import ProductsEmpty from "../../Category/ProductsEmpty/ProductsEmpty";

type Props = {
    isActive: boolean,
}

const dataLimit = 20;

const Products = React.memo((props: Props) => {
    const { isActive } = props;
    const { result, setResult } = useSearch();
    const { words } = useParams();

    const products = result.products;

    const [state, setState] = React.useState({
        scrollEnd: true,
        offset: products.length,
    });

    const handleScrollEnd = React.useCallback(() => {
        if (words) {
            const newState = { ...state };

            search(words, {
                limit: dataLimit,
                offset: state.offset,
                type: 'products',
            })
                .then(response => {
                    const freshProducts = response.data.products;
                    const mergedProducts = arrayMerge<Product>(products, freshProducts);

                    newState.offset = mergedProducts.length;

                    if (freshProducts.length < dataLimit) {
                        newState.scrollEnd = false;
                    }

                    setResult({ ...result, products: mergedProducts });
                    setState(newState);
                });
        }
    }, [words, result, products, state]);

    return <>
        <Fade className="products-result" show={isActive}>
            {products.map(product => {
                return <HoverableProduct product={product} key={product.id} />
            })}
        </Fade>
        {products.length === 0 && <ProductsEmpty />}
        <ScrollEnd
            show={state.scrollEnd}
            whileInView={handleScrollEnd}
            className="d-flex gap-3 flex-wrap">
            {generateArray(10).map((index, key) => {
                index;
                return <HoverableProductPlaceholder index={key} key={key} />
            })}
        </ScrollEnd>
    </>
});

export default Products;
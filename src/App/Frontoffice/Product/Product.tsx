import React from "react";
import { useParams } from "react-router-dom";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import Loading from "../../../utilities/minitiatures/Loading/Loading";
import Fade from "../../../utilities/minitiatures/Fade/Fade";
import { Product as ProductType } from "../../../utilities/constants/types";
import { getProduct, getProductsMock } from "../../../utilities/api/actions";

const Product = React.memo(() => {
    const slug = useParams().slug!;

    const [state, setState] = React.useState<{ product: ProductType | null; loading: boolean }>({
        product: null,
        loading: true,
    });

    React.useEffect(() => {
        let mounted = true;
        setState(s => ({ ...s, loading: true }));
        const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
        const promise = useMocks ? getProductsMock() : getProduct(slug);
        promise
            .then(response => {
                const data = response.data;
                const product = useMocks
                    ? (data.products as ProductType[]).find(p => p.slug === slug)
                    : (data?.product as ProductType | undefined);
                if (mounted) setState({ product: product ?? null, loading: false });
            })
            .catch(() => {
                if (mounted) setState({ product: null, loading: false });
            });
        return () => { mounted = false };
    }, [slug]);

    return (
        <Fade className="product-container container" show>
            {state.product && (
                <>
                    <LeftSide product={state.product} />
                    <RightSide product={state.product} />
                </>
            )}
            <Loading show={state.loading || !state.product} />
        </Fade>
    );
})

export default Product;

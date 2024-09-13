import React from "react";
import { Product } from "../../../../../utilities/constants/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { refreshFeaturedProducts } from "../../../../../utilities/redux/frontoffice/frontofficeSlice";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import DoublePrice from "../../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import { useNavigate } from "react-router-dom";
import appImage from "../../../../../utilities/helpers/appImage";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";

type Props = {
    products: Product[] | null,
    onClick: () => void,
}

const ProductSuggestions = React.memo((props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, onClick} = props;
    const navigate = useNavigate();

    const featuredProducts = useSelector((state: Rootstate) => state.frontoffice.featuredProducts);

    const suggestions = React.useMemo(() => products || featuredProducts?.slice(0, 2), [products, featuredProducts]);

    React.useEffect(() => {
        !featuredProducts && dispatch(refreshFeaturedProducts());
    }, [featuredProducts]);

    return <Fade
        className="product-suggestions flex-wrap"
        show={Boolean(suggestions?.length)}
        onClick={onClick}
        layout>

        <h5 className="product-suggestion-title col-12">Produits suggérés</h5>
        {suggestions?.map((product) => {
            return <div
                className="product-suggestion"
                key={product.id}
                onClick={() => navigate(`/product/${product.slug}`)}>
                <SquaredImage
                    image={appImage(product.images[0]?.name)} />
                <h6 className="product-title">{product.title}</h6>
                <DoublePrice
                    firstPrice={product.price}
                    secondPrice={product.sale_price || undefined} />
            </div>
        })}
    </Fade>
});

export default ProductSuggestions;
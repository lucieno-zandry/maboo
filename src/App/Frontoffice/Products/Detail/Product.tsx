import React from "react";
import { useParams } from "react-router-dom";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import Loading from "../../../../utilities/minitiatures/Loading/Loading";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import { Product as ProductUIType, ProductVariant as ProductUIVariant } from "../../../../utilities/constants/types";
import { getProduct } from "../../../../utilities/api/actions";
import { ProductDetail, VariantGroup } from "../../../../utilities/constants/types";

const Product = React.memo(() => {
    const slug = useParams().slug!;

    const [state, setState] = React.useState<{ product: ProductUIType | null; loading: boolean }>({
        product: null,
        loading: true,
    });

    React.useEffect(() => {
        let mounted = true;
        setState(s => ({ ...s, loading: true }));
        getProduct(slug)
            .then(response => {
                const detail = response?.data?.product as ProductDetail | undefined;
                if (!detail) throw new Error('No product');
                const product = mapDetailToUI(detail);
                if (mounted) setState({ product, loading: false });
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

function mapDetailToUI(detail: ProductDetail): ProductUIType {
    const groupNameById = new Map<number, string>();
    (detail.variant_groups || []).forEach((g: VariantGroup) => {
        groupNameById.set(g.id, g.name);
    });

    const variants: ProductUIVariant[] = (detail.variants || []).map(v => {
        const attrs: { [key: string]: string } = {};
        (v.variant_options || []).forEach(opt => {
            const name = groupNameById.get(opt.variant_group_id);
            if (name) attrs[name] = opt.value;
        });
        return {
            id: v.id,
            image: v.image || '',
            name: v.sku,
            price: v.price,
            product_id: v.product_id,
            created_at: v.created_at,
            updated_at: v.updated_at,
            inStock: v.stock,
            sku: v.sku,
            special_price: v.special_price,
            stock: v.stock,
            attributes: Object.keys(attrs).length ? attrs : null,
        };
    });

    const first = variants[0];
    return {
        id: detail.id,
        created_at: detail.created_at,
        updated_at: detail.updated_at,
        title: detail.title,
        description: detail.description,
        price: first?.price || 0,
        sale_price: first?.special_price || 0,
        category_id: detail.category_id,
        variants,
        colors: [],
        images: [],
        category: null,
        inStock: variants.reduce((sum, v) => sum + (v.stock || 0), 0),
        slug: detail.slug,
        merchant: {} as any,
    };
}

import React from "react";
import { useNavigate } from "react-router-dom";
import SmallText from "../../../../../utilities/minitiatures/SmallText/SmallText";
import CountButton from "../../../../../utilities/minitiatures/CountButton/CountButton";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import DoublePrice from "../../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import { addToCart } from "../../../../../utilities/api/customer/actions";
import ProductVariants from "./ProductVariants/ProductVariants";
import { ProductVariant } from "../../../../../utilities/constants/types";
import ColorSelector from "./Colors/ColorSelector";
import RelatedArticles from "./RelatedArticles/RelatedArticles";
import useToasts from "../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import useAuth from "../../../../../utilities/hooks/useAuth";
import links from "../../../../../utilities/helpers/links";
import VariantSelector from "./VariantSelector/VariantSelector";
import { articleDatas } from "../../../Articles/articlesData";

const relatedArticles = articleDatas.map(article => ({
  id: article.id,
  name: article.title,
  description: article.sections[0]?.subsections[0]?.paragraphs[0]?.content || '',
  imageUrl: article.images[0]?.url || ''
}));

type Props = { product: {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  sale_price: number;
  inStock: number;
  category?: { name: string } | null;
  merchant: any;
  colors?: any[];
  variants: ProductVariant[];
} };

const RightSide = React.memo((props: Props) => {
  const { product } = props;
  const toasts = useToasts();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const defaultVariant = React.useMemo(() => {
    if (product.variants.length > 0) {
      return product.variants[0];
    }
    return null;
  }, [product.variants]) as ProductVariant | null;

  const [state, setState] = React.useState({
    count: 1,
    loading: false,
    variant: defaultVariant,
    selectedColor: product.colors?.[0] || null,
  });

  const handleCountChange = React.useCallback((count: number) => {
    setState((s) => ({ ...s, count }));
  }, []);

  const handleColorChange = React.useCallback((color: any) => {
    setState((s) => ({ ...s, selectedColor: color }));
  }, []);

  const handleAddToCart = React.useCallback(() => {
    if (!auth) {
      const intended = { path: `/products/${product.slug}`, target: true };
      sessionStorage.setItem('intended', JSON.stringify(intended));
      navigate(links.loginPage);
      return;
    }

    const payload: any = {
      product_id: product.id,
      quantity: state.count,
    };

    if (state.selectedColor) payload.product_color_id = state.selectedColor.id;
    if (state.variant) payload.product_variant_id = state.variant.id;

    setState(s => ({ ...s, loading: true }));
    addToCart(payload)
      .then(() => {
        toasts.push({ title: "Ajouté au panier", content: "Votre panier a été mis à jour avec succès", type: "success" });
      })
      .catch(() => {
        toasts.push({ title: "Impossible d'ajouter au panier", content: "Une erreur s'est produite lors de l'ajout au panier", type: "danger" });
      })
      .finally(() => setState(s => ({ ...s, loading: false })));
  }, [auth, navigate, product.slug, product.id, state.count, state.selectedColor, state.variant, toasts.push]);

  const price = React.useMemo(() => {
    const others = (state.variant?.special_price ?? state.variant?.price) || product.sale_price;
    const current = others || product.price;
    if (state.count > 1) return current * state.count;
    return others || undefined;
  }, [state.count, state.variant, product.sale_price, product.price]);

  const maxCount = React.useMemo(() => {
    if (state.variant) return state.variant.stock ?? state.variant.inStock;
    return product.inStock;
  }, [state.variant, product.inStock]);

  const handleVariantChange = React.useCallback((variant: ProductVariant) => {
    const newState = { ...state };
    if (state.count > variant.inStock) newState.count = 1;
    newState.variant = variant;
    setState(newState);
  }, [state]);

  return (
    <Fade className="right-side-container" show>
      <div className="product-title">{product.title}</div>
      <div className="product-description">
        <SmallText maxLength={200} isExtendable>
          {product.description}
        </SmallText>
      </div>
      <DoublePrice firstPrice={product.price} secondPrice={price} />
      <div>
        <span>En stock: </span>
        {(state.variant?.stock ?? state.variant?.inStock) as number | undefined}
      </div>

      <div className="d-flex gap-3">
        <CountButton count={state.count} onChange={handleCountChange} max={maxCount} className="col-5" />
        <Button type="button" className="btn btn-outline-dark btn-sm col" onClick={handleAddToCart} options={{ loading: state.loading }} disabled={state.count > maxCount}>
          <i className="fa fa-cart-plus"></i> Ajouter au panier
        </Button>
      </div>

      {(!product.variants.some(v => v.attributes && Object.keys(v.attributes).length > 0)) && product.colors && product.colors.length > 0 && (
        <ColorSelector colors={product.colors} selectedColor={state.selectedColor} onChange={handleColorChange} />
      )}

      {(product.variants.some(v => v.attributes && Object.keys(v.attributes).length > 0)) ? (
        <VariantSelector variants={product.variants} active={state.variant} onChange={handleVariantChange} />
      ) : (
        <ProductVariants onChange={handleVariantChange} active={state.variant} variants={product.variants} />
      )}

      <RelatedArticles articles={relatedArticles} />
    </Fade>
  );
});

export default RightSide;

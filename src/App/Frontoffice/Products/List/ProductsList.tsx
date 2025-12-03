import React from "react";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import { ProductList } from "../../../../utilities/constants/types";
import { getProducts } from "../../../../utilities/api/actions";
import generateArray from "../../../../utilities/helpers/generateArray";

const Products = React.memo(() => {
  const [state, setState] = React.useState<{ products: ProductList[]; loading: boolean }>({
    products: [],
    loading: true,
  });

  React.useEffect(() => {
    let mounted = true;
    getProducts()
      .then(res => {
        const products: ProductList[] = res.data.products || [];
        if (mounted) setState(s => ({ ...s, products, loading: false }));
      })
      .catch(() => {
        if (mounted) setState(s => ({ ...s, products: [], loading: false }));
      });
    return () => { mounted = false };
  }, []);

  const list = React.useMemo(() => state.products, [state.products]);

  return (
    <Fade className="products-container container" show>
      <div className="products-grid">
        {list.map(p => (
          <HoverableProduct key={p.id} product={p as any} showPrice={false} />
        ))}
      </div>

      {state.loading && (
        <div className="products-grid">
          {generateArray(6).map((_, i) => (
            <HoverableProductPlaceholder index={i} key={i} />
          ))}
        </div>
      )}
    </Fade>
  );
});

export default Products;
import "../Products.scss";

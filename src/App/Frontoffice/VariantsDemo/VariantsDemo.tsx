import React from "react";
import Fade from "../../utilities/minitiatures/Fade/Fade";
import { Product } from "../../utilities/constants/types";
import { getProducts, getProductsMock, normalizeProducts } from "../../utilities/api/actions";

const VariantsDemo = React.memo(() => {
  const [state, setState] = React.useState<{ products: Product[]; loading: boolean }>({ products: [], loading: true });

  React.useEffect(() => {
    let mounted = true;
    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    const request = useMocks ? getProductsMock() : getProducts();
    request
      .then(res => {
        const raw = res.data.products || [];
        const products = normalizeProducts(raw);
        if (mounted) setState({ products, loading: false });
      })
      .catch(() => {
        if (mounted) setState({ products: [], loading: false });
      });
    return () => { mounted = false };
  }, []);

  return (
    <Fade className="container" show>
      <h3>Produits et variantes</h3>
      <div className="row g-3">
        {state.products.map(p => (
          <div className="col-12" key={p.id}>
            <div className="card p-3">
              <div className="fw-bold">{p.title}</div>
              <div className="text-muted">{p.slug}</div>
              <div>
                {(p.variants || []).map(v => (
                  <div key={v.id} className="d-flex flex-wrap gap-2 align-items-center">
                    <span>SKU: {v.sku}</span>
                    <span>Prix: {v.special_price ?? v.price}</span>
                    <span>Stock: {v.stock ?? v.inStock}</span>
                    {v.attributes && (
                      <span>{Object.entries(v.attributes).map(([k, val]) => `${k}:${val}`).join(', ')}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fade>
  );
});

export default VariantsDemo;

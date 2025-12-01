import React from "react";
import Fade from "../../../utilities/minitiatures/Fade/Fade";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import { Product } from "../../../utilities/constants/types";
import { getProducts, getProductsMock, normalizeProducts } from "../../../utilities/api/actions";
import generateArray from "../../../utilities/helpers/generateArray";

const Products = React.memo(() => {
  const [state, setState] = React.useState<{ products: Product[]; loading: boolean; filter: 'all' | 'bebe' | 'maman' }>({
    products: [],
    loading: true,
    filter: 'all',
  });

  React.useEffect(() => {
    let mounted = true;
    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    const request = useMocks ? getProductsMock() : getProducts();
    request
      .then(res => {
        const raw = res.data.products || [];
        const products = normalizeProducts(raw);
        if (mounted) setState(s => ({ ...s, products, loading: false }));
      })
      .catch(() => {
        getProductsMock()
          .then(res => {
            const raw = res.data.products || [];
            const products = normalizeProducts(raw);
            if (mounted) setState(s => ({ ...s, products, loading: false }));
          })
          .catch(() => {
            if (mounted) setState(s => ({ ...s, products: [], loading: false }));
          });
      });
    return () => { mounted = false };
  }, []);

  const list = React.useMemo(() => {
    switch (state.filter) {
      case 'bebe':
        return state.products.filter(p => p.category_id === 1);
      case 'maman':
        return state.products.filter(p => p.category_id === 2);
      default:
        return state.products;
    }
  }, [state.products, state.filter]);

  return (
    <Fade className="container" show>
      <div className="d-flex gap-2 mb-3">
        <button className={`btn btn-sm ${state.filter === 'all' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setState(s => ({ ...s, filter: 'all' }))}>Tous</button>
        <button className={`btn btn-sm ${state.filter === 'bebe' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setState(s => ({ ...s, filter: 'bebe' }))}>Bébé</button>
        <button className={`btn btn-sm ${state.filter === 'maman' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setState(s => ({ ...s, filter: 'maman' }))}>Maman</button>
      </div>

      <div className="d-flex gap-3 flex-wrap">
        {list.map(p => (
          <HoverableProduct key={p.id} product={p} />
        ))}
      </div>

      {state.loading && (
        <div className="d-flex gap-3 flex-wrap">
          {generateArray(6).map((_, i) => (
            <HoverableProductPlaceholder index={i} key={i} />
          ))}
        </div>
      )}
    </Fade>
  );
});

export default Products;

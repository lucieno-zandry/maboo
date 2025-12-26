import React from "react";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import { Category, ProductList } from "../../../../utilities/constants/types";
import { getCategories, getProducts } from "../../../../utilities/api/actions";
import generateArray from "../../../../utilities/helpers/generateArray";
import "../Products.scss";

function normalizeCategoriesForFilter(data: any): Category[] {
  const hierarchy = data?.hierarchy ?? data;

  if (Array.isArray(hierarchy) && hierarchy.length > 0) {
    const first = hierarchy[0];
    if (first && typeof first === 'object' && 'category' in first) {
      return hierarchy
        .map((node: any) => node?.category)
        .filter(Boolean);
    }
  }

  if (Array.isArray(data)) {
    return data.filter(Boolean);
  }

  return [];
}

const Products = React.memo(() => {
  const [state, setState] = React.useState<{
    products: ProductList[];
    categories: Category[];
    categoryId: number | 'all';
    loading: boolean;
  }>({
    products: [],
    categories: [],
    categoryId: 'all',
    loading: true,
  });

  React.useEffect(() => {
    let mounted = true;
    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        const products: ProductList[] = productsRes.data.products || [];
        const categories = normalizeCategoriesForFilter(categoriesRes.data);
        if (mounted) setState(s => ({ ...s, products, categories, loading: false }));
      })
      .catch(() => {
        if (mounted) setState(s => ({ ...s, products: [], categories: [], loading: false }));
      });
    return () => { mounted = false };
  }, []);

  const categories = React.useMemo(() => {
    const top = state.categories.filter(c => c.level === 0);
    return top.length > 0 ? top : state.categories;
  }, [state.categories]);

  const list = React.useMemo(() => {
    if (state.categoryId === 'all') return state.products;
    return state.products.filter(p => p.category_id === state.categoryId);
  }, [state.products, state.categoryId]);

  return (
    <Fade className="products-container container" show>
      <div className="products-filter">
        <button
          className={`btn ${state.categoryId === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setState(s => ({ ...s, categoryId: 'all' }))}
          type="button"
        >
          Toutes
        </button>

        {categories.map((c) => (
          <button
            className={`btn ${state.categoryId === c.id ? 'btn-primary' : 'btn-outline-primary'}`}
            key={c.id}
            onClick={() => setState(s => ({ ...s, categoryId: c.id }))}
            type="button"
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {list.map(p => (
          <HoverableProduct key={p.id} product={p} showPrice={false} />
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

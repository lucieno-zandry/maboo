import React from "react";
import { ProductVariant } from "../../../../../utilities/constants/types";

type Props = {
  variants: ProductVariant[];
  active: ProductVariant | null;
  onChange: (variant: ProductVariant) => void;
};

const VariantSelector = React.memo((props: Props) => {
  const { variants, active, onChange } = props;

  const keys = React.useMemo(() => {
    const set = new Set<string>();
    variants.forEach(v => {
      const attrs = v.attributes || {};
      Object.keys(attrs).forEach(k => set.add(k));
    });
    return Array.from(set);
  }, [variants]);

  const options = React.useMemo(() => {
    const map: { [k: string]: string[] } = {};
    keys.forEach(k => {
      const vals = Array.from(new Set(variants.map(v => (v.attributes || {})[k]).filter(Boolean))) as string[];
      map[k] = vals;
    });
    return map;
  }, [keys, variants]);

  const defaultSelected = React.useMemo(() => {
    if (active?.attributes) return { ...active.attributes };
    const v = variants[0];
    return { ...(v.attributes || {}) };
  }, [active, variants]);

  const [selected, setSelected] = React.useState<{ [k: string]: string }>(defaultSelected);

  React.useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  const resolve = React.useCallback((sel: { [k: string]: string }) => {
    const found = variants.find(v => {
      const attrs = v.attributes || {};
      return keys.every(k => attrs[k] === sel[k]);
    });
    if (found) onChange(found);
  }, [variants, keys, onChange]);

  const handleChange = React.useCallback((k: string, val: string) => {
    const next = { ...selected, [k]: val };
    setSelected(next);
    resolve(next);
  }, [selected, resolve]);

  if (keys.length === 0) return null;

  return (
    <div className="variant-selector">
      {keys.map(k => (
        <div className="variant-selector-group mb-3" key={k}>
          <div className="mb-1 text-muted">{k}</div>
          <div className="d-flex flex-wrap gap-2">
            {(options[k] || []).map(val => {
              const active = selected[k] === val;
              return (
                <button
                  key={val}
                  type="button"
                  className={`btn btn-sm ${active ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => handleChange(k, val)}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

export default VariantSelector;

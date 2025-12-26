import React from "react";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import { useEditProduct, useVariant, useProducts } from "../../Products";
import { ProductVariant } from "../../../../../../../utilities/constants/types";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { createProductVariant } from "../../../../../../../utilities/api/actions";
import VariantGenerator from "./VariantGenerator";
import {
    VariantGroupState,
    MatrixRowInput,
    buildMatrixRows,
    normalizeString,
    buildBaseSku,
    ATTRIBUTE_SUGGESTIONS,
    dedupeStrings,
    resolveSuggestionKey
} from "./VariantGeneratorUtils";
import { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import ImageInputDD from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";

type Payload = {
    name?: string,
    price?: number,
    image?: string,
    product_id?: number,
    inStock?: number,
    sku?: string,
    special_price?: number,
    stock?: number,
    attributes?: { [key: string]: string },
}

type VariantMode = 'single' | 'matrix';

const DEFAULT_IMAGE: Image = {
    imageUrl: '',
    imageData: null
}

const Number = '' as number | '';

const DEFAULT_STATE = {
    open: false,
    mode: 'single' as VariantMode,
    image: DEFAULT_IMAGE,
    price: Number,
    inStock: Number,
    special_price: Number,
    groups: [] as VariantGroupState[],
    groupTemplate: '',
    matrixRows: {} as Record<string, MatrixRowInput>,
    hideDisabled: true,
    loading: false,
    validationMessages: null as Payload | null
}

const AddVariant = React.memo(() => {
    const { current, setCurrent } = useVariant();
    const edit = useEditProduct();
    const { reloadProducts } = useProducts();
    const toasts = useToasts();

    const [state, setState] = React.useState({ ...DEFAULT_STATE });

    const activeGroups = React.useMemo(() => {
        return state.mode === 'single' ? state.groups.slice(0, 1) : state.groups;
    }, [state.groups, state.mode]);

    const matrixDescriptors = React.useMemo(() => buildMatrixRows(activeGroups), [activeGroups]);

    const baseSku = React.useMemo(() => {
        const fromSlug = normalizeString((edit.current as any)?.slug || (current as any)?.slug || '');
        const fromTitle = normalizeString((edit.current as any)?.title || (current as any)?.title || '');
        return buildBaseSku(fromSlug || fromTitle);
    }, [edit.current, current]);

    const baseTitle = React.useMemo(() => {
        return normalizeString((edit.current as any)?.title || '');
    }, [edit.current]);

    const descriptorsValid = React.useMemo(() => {
        if (!state.open) return false;
        if (!current) return false;
        
        // In matrix mode, we delegate validation to VariantGenerator visually, 
        // but here we need to check if we can submit.
        if (state.mode === 'matrix') {
             if (matrixDescriptors.length === 0) return false;
             
             let atLeastOneEnabled = false;
             const ok = matrixDescriptors.every(d => {
                 const row = state.matrixRows[d.key];
                 if (!row) return false; // Should not happen if sync is correct
                 if (row.disabled) return true; // Disabled rows don't block submit
                 atLeastOneEnabled = true;
                 
                 if (row.stock === '') return false;
                 if (!normalizeString(row.name)) return false;
                 // Image optional?
                 return true;
             });
             return ok && atLeastOneEnabled;
        }

        // Single mode validation
        if (state.mode === 'single') {
            const singleGroupName = normalizeString(activeGroups[0]?.name || '');
            if (!singleGroupName) return false;
            
            // For single mode, we use the same matrix logic for the table rows
             if (matrixDescriptors.length === 0) return false;
             return matrixDescriptors.every(d => {
                 const row = state.matrixRows[d.key];
                 if (!row) return false;
                 if (row.stock === '') return false;
                 if (!normalizeString(row.name)) return false;
                 return true;
             });
        }

        return false;
    }, [activeGroups, current, matrixDescriptors, state.matrixRows, state.mode, state.open]);

    const allowed = React.useMemo(() => {
        return descriptorsValid && !state.loading;
    }, [descriptorsValid, state.loading]);

    const toggleAddVariant = React.useCallback(() => {
        const existingCount = current?.variants?.length || 0;
        setState(s => {
            if (!s.open) {
                const nextMode: VariantMode = existingCount >= 1 ? 'matrix' : 'single';
                const nextGroups = s.groups.length ? s.groups : [{ name: '', values: [], valueInput: '' }];
                return { ...s, open: true, mode: nextMode, groups: nextGroups, validationMessages: null };
            }

            if (s.mode === 'single') {
                return {
                    ...s,
                    mode: 'matrix',
                    validationMessages: null,
                };
            }

            return DEFAULT_STATE;
        });
    }, [current?.variants?.length]);

    // Single mode handlers (kept local as they are specific to single mode UI)
    const addGroupTemplate = React.useCallback((templateName: string) => {
        const normalized = normalizeString(templateName);
        if (!normalized) return;

        setState(s => {
            const suggestionKey = resolveSuggestionKey(normalized);
            const values = (suggestionKey ? ATTRIBUTE_SUGGESTIONS[suggestionKey] : []).slice();
            if (s.mode === 'single') {
                return { ...s, groups: [{ name: normalized, values, valueInput: '' }], groupTemplate: '' };
            }
            return s; 
        });
    }, []);

    const setGroupName = React.useCallback((index: number, name: string) => {
        setState(s => ({
            ...s,
            groups: s.groups.map((g, i) => i === index ? { ...g, name } : g)
        }));
    }, []);

    const setGroupValueInput = React.useCallback((index: number, valueInput: string) => {
        setState(s => ({
            ...s,
            groups: s.groups.map((g, i) => i === index ? { ...g, valueInput } : g)
        }));
    }, []);

    const addGroupValue = React.useCallback((index: number) => {
        setState(s => {
            const g = s.groups[index];
            if (!g) return s;
            const nextValue = normalizeString(g.valueInput);
            if (!nextValue) return s;
            const values = dedupeStrings([...g.values, nextValue]);
            return {
                ...s,
                groups: s.groups.map((row, i) => i === index ? { ...row, values, valueInput: '' } : row)
            };
        });
    }, []);

    const removeGroupValue = React.useCallback((groupIndex: number, valueIndex: number) => {
        setState(s => ({
            ...s,
            groups: s.groups.map((g, i) => i === groupIndex ? { ...g, values: g.values.filter((_, vi) => vi !== valueIndex) } : g)
        }));
    }, []);

    // Matrix Row handlers for SINGLE mode (since VariantGenerator handles matrix mode rows)
    // Actually, we can reuse VariantGenerator's internal logic? No, VariantGenerator has its own handlers passed as props.
    // But we need handlers for SINGLE mode UI which is still custom here.
    const setMatrixRowText = React.useCallback((key: string, field: 'name' | 'sku', value: string) => {
        setState(s => {
            const currentRow = s.matrixRows[key];
            if (!currentRow) return s;
            return {
                ...s,
                matrixRows: {
                    ...s.matrixRows,
                    [key]: {
                        ...currentRow,
                        [field]: value,
                        nameTouched: field === 'name' ? true : currentRow.nameTouched,
                        skuTouched: field === 'sku' ? true : currentRow.skuTouched,
                    }
                }
            };
        });
    }, []);

    const setMatrixRowNumber = React.useCallback((key: string, field: 'price' | 'special_price' | 'stock', value: number | '') => {
        setState(s => {
            const currentRow = s.matrixRows[key];
            if (!currentRow) return s;
            return {
                ...s,
                matrixRows: {
                    ...s.matrixRows,
                    [key]: { ...currentRow, [field]: value }
                }
            };
        });
    }, []);

    const handleMatrixImageChange = React.useCallback((key: string, image: Image) => {
        setState(s => {
            const currentRow = s.matrixRows[key];
            if (!currentRow) return s;
            return {
                ...s,
                matrixRows: {
                    ...s.matrixRows,
                    [key]: { ...currentRow, image: image }
                }
            };
        });
    }, []);

    const handleMatrixImageRemove = React.useCallback((key: string) => {
        setState(s => {
            const currentRow = s.matrixRows[key];
            if (!currentRow) return s;
            return {
                ...s,
                matrixRows: {
                    ...s.matrixRows,
                    [key]: { ...currentRow, image: DEFAULT_IMAGE }
                }
            };
        });
    }, []);
    
    // Sync logic for Single Mode
    // We need to sync rows when descriptors change, similar to VariantGenerator
    // But since Single Mode and Matrix Mode share `state.matrixRows`, we can perhaps rely on VariantGenerator's logic 
    // IF we render it invisible? No.
    // We should implement sync logic for single mode too, or just duplicate it for now since Single Mode UI is separate.
    // However, the original code had a useEffect for this.
    // Let's restore the useEffect for syncing rows.
    
    // Helper for building SKU (needed for sync)
    const buildMatrixSku = React.useCallback((attributes: { [key: string]: string }) => {
        // Reuse logic from utils or duplicated?
        // Utils doesn't have `buildMatrixSku` that takes attributes and baseSku.
        // It has `skuToken`.
        const keys = Object.keys(attributes);
        // ... same logic as before ...
        const suffix = keys
             .map(k => (attributes[k] || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toUpperCase().split('-').filter(Boolean).slice(0, 2).join('-'))
             .filter(Boolean)
             .join('-');
         return `${baseSku}${suffix ? `-${suffix}` : ''}`;
    }, [baseSku]);

    React.useEffect(() => {
        if (!state.open) return;
        // Only run this sync if in Single mode OR if we are initializing?
        // VariantGenerator handles its own sync when mounted.
        // If we switch to Matrix mode, VariantGenerator takes over.
        // If we are in Single mode, we need this.
        if (state.mode !== 'single') return;

        setState(s => {
            const rows: Record<string, MatrixRowInput> = {};
            const baseTitle = normalizeString((edit.current as any)?.title || '');

            matrixDescriptors.forEach(d => {
                const existing = s.matrixRows[d.key];
                const defaultName = baseTitle ? `${baseTitle} - ${d.label}` : d.label;
                const defaultSku = buildMatrixSku(d.attributes);

                rows[d.key] = existing || {
                    name: defaultName,
                    sku: defaultSku,
                    price: s.price,
                    special_price: s.special_price,
                    stock: s.inStock,
                    image: s.image,
                    disabled: false,
                    nameTouched: false,
                    skuTouched: false,
                };

                if (existing) {
                     const nextName = existing.nameTouched ? existing.name : defaultName;
                     const nextSku = existing.skuTouched ? existing.sku : (existing.sku || defaultSku);
                     rows[d.key] = { ...existing, name: nextName, sku: nextSku };
                }
            });
            return { ...s, matrixRows: rows };
        });
    }, [matrixDescriptors, state.mode, state.open, edit.current, buildMatrixSku, state.price, state.special_price, state.inStock, state.image]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.open) return;
        if (!allowed || !current) return;

        setState(s => ({ ...s, loading: true, validationMessages: null }));

        const created: ProductVariant[] = [];
        const failures: { key: string }[] = [];

        matrixDescriptors
            .reduce((p, d) => {
                return p.then(() => {
                    const row = state.matrixRows[d.key];
                    if (!row) {
                        failures.push({ key: d.key });
                        return;
                    }

                    if (state.mode === 'matrix' && row.disabled) {
                        return;
                    }

                    const payload = {
                        name: row.name,
                        price: row.price === '' ? 0 : row.price,
                        inStock: row.stock === '' ? 0 : row.stock,
                        stock: row.stock === '' ? 0 : row.stock,
                        image: row.image?.imageData || null,
                        product_id: current.id,
                        special_price: row.special_price === '' ? undefined : row.special_price,
                        sku: row.sku ? row.sku : undefined,
                        attributes: d.attributes,
                    };

                    return createProductVariant(payload)
                        .then(response => {
                            const variant = response.data?.variant as ProductVariant;
                            if (variant) created.push(variant);
                        })
                        .catch(() => {
                            failures.push({ key: d.key });
                        });
                });
            }, Promise.resolve())
            .then(() => {
                if (created.length > 0) {
                    const newCurrent = { ...current, variants: [...current.variants, ...created] };
                    setCurrent(newCurrent);
                }

                if (failures.length === 0) {
                    toasts.push({
                        title: "Variants créés",
                        content: `${created.length} variant(s) ont été enregistrés`,
                        type: "success",
                    });
                } else {
                    toasts.push({
                        title: "Création partielle",
                        content: `${created.length} créé(s), ${failures.length} en échec`,
                        type: "danger",
                    });
                }

                reloadProducts();
                setState(DEFAULT_STATE);
            })
            .finally(() => {
                setState(s => ({ ...s, loading: false }));
            });
    }, [allowed, current, matrixDescriptors, reloadProducts, setCurrent, state.matrixRows, state.mode, state.open, toasts]);

    const enabledMatrixCount = React.useMemo(() => {
        if (state.mode !== 'matrix') return matrixDescriptors.length;
        return matrixDescriptors.reduce((acc, d) => {
            const row = state.matrixRows[d.key];
            if (!row || row.disabled) return acc;
            return acc + 1;
        }, 0);
    }, [matrixDescriptors, state.matrixRows, state.mode]);

    return <form className="add-variant-container product-variant-section" onSubmit={handleSubmit}>
        <div className="d-flex gap-2 align-items-center justify-content-between w-100 mb-3">
            <h4 className="product-variant-section-title m-0">Ajouter un variant</h4>
            <Button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={toggleAddVariant}
            >
                {state.open && state.mode === 'matrix' ? 'Fermer' : (state.open ? 'Tableau de combinaison' : 'ajouter un variant')}
            </Button>
        </div>

        {state.open && state.mode === 'single' && <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label m-0">Variant group</label>
                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: 260 }}
                        value={state.groupTemplate}
                        onChange={(e) => addGroupTemplate(e.target.value)}
                    >
                        <option value="">Préconfigurer</option>
                        {Object.keys(ATTRIBUTE_SUGGESTIONS).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>

                <datalist id="single-group-name-suggestions">
                    {Object.keys(ATTRIBUTE_SUGGESTIONS).map(key => <option key={key} value={key} />)}
                </datalist>

                <Input
                    type="text"
                    className="form-control"
                    placeholder="Nom (ex: Taille, Couleur)"
                    value={activeGroups[0]?.name || ''}
                    list="single-group-name-suggestions"
                    onChange={e => setGroupName(0, e.target.value)}
                />

                <div className="d-flex gap-2 align-items-center mt-2">
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Ajouter une valeur (ex: XL)"
                        value={activeGroups[0]?.valueInput || ''}
                        list="single-group-values-suggestions"
                        onChange={e => setGroupValueInput(0, e.target.value)}
                    />
                    <datalist id="single-group-values-suggestions">
                        {(ATTRIBUTE_SUGGESTIONS[activeGroups[0]?.name as keyof typeof ATTRIBUTE_SUGGESTIONS] || []).map(val => (
                            <option key={val} value={val} />
                        ))}
                    </datalist>
                    <Button type="button" className="btn btn-outline-secondary" onClick={() => addGroupValue(0)}>
                        Ajouter
                    </Button>
                </div>

                {(activeGroups[0]?.values?.length || 0) > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        {(activeGroups[0]?.values || []).map((v, vi) => (
                            <span className="badge bg-secondary" key={vi} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                {v}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light"
                                    style={{ lineHeight: 1, padding: '0 6px' }}
                                    onClick={() => removeGroupValue(0, vi)}>
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-3">
                <div className="fw-semibold mb-2">Variants</div>
                {matrixDescriptors.length === 0 ? (
                    <div className="text-muted">Ajoute au moins 1 valeur pour générer des variants.</div>
                ) : (
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th>{normalizeString(activeGroups[0]?.name || '') || 'Valeur'}</th>
                                <th>Image</th>
                                <th>Nom</th>
                                <th>SKU</th>
                                <th>Prix</th>
                                <th>Promo</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matrixDescriptors.map(d => {
                                const row = state.matrixRows[d.key];
                                return (
                                    <tr key={d.key}>
                                        <td style={{ width: 180 }}>{d.label}</td>
                                        <td style={{ width: 100 }}>
                                            <ImageInputDD
                                                addImage={(img) => handleMatrixImageChange(d.key, img)}
                                                removeImage={() => handleMatrixImageRemove(d.key)}
                                                id={`variant-image-${d.key}`}
                                                imageUrl={row?.image?.imageUrl}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                value={row?.name || ''}
                                                onChange={(e) => setMatrixRowText(d.key, 'name', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                value={row?.sku || ''}
                                                onChange={(e) => setMatrixRowText(d.key, 'sku', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <NumberInput
                                                onChange={(value: number | '') => setMatrixRowNumber(d.key, 'price', value)}
                                                value={(row?.price ?? '').toLocaleString()}
                                                placeholder="0"
                                            />
                                        </td>
                                        <td>
                                            <NumberInput
                                                onChange={(value: number | '') => setMatrixRowNumber(d.key, 'special_price', value)}
                                                value={(row?.special_price ?? '').toLocaleString()}
                                                placeholder=""
                                            />
                                        </td>
                                        <td>
                                            <NumberInput
                                                onChange={(value: number | '') => setMatrixRowNumber(d.key, 'stock', value)}
                                                value={(row?.stock ?? '').toLocaleString()}
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>}

        {state.open && state.mode === 'matrix' && <>
            <VariantGenerator
                groups={state.groups}
                onChangeGroups={(groups) => setState(s => ({ ...s, groups }))}
                matrixRows={state.matrixRows}
                onChangeMatrixRows={(rows) => setState(s => ({ ...s, matrixRows: rows }))}
                baseSku={baseSku}
                baseTitle={baseTitle}
                defaultPrice={state.price}
                defaultSpecialPrice={state.special_price}
                defaultStock={state.inStock}
                hideDisabled={state.hideDisabled}
                onToggleHideDisabled={() => setState(s => ({ ...s, hideDisabled: !s.hideDisabled }))}
            />
        </>}

        {state.open && <div className="add-product-variant-action">
            <Button
                type="submit"
                className="btn btn-secondary"
                disabled={!allowed}
                options={{ loading: state.loading }}>
                {state.mode === 'matrix'
                    ? `Créer ${enabledMatrixCount} variant(s)`
                    : `Créer ${matrixDescriptors.length} variant(s)`}
            </Button>
        </div>}
    </form>
});

export default AddVariant;

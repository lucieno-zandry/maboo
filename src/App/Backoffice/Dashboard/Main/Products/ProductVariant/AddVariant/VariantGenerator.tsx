import React from "react";
import ImageInputDD, { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import {
    VariantGroupState,
    MatrixRowInput,
    ATTRIBUTE_SUGGESTIONS,
    normalizeString,
    resolveSuggestionKey,
    dedupeStrings,
    buildMatrixRows,
    skuToken
} from "./VariantGeneratorUtils";

const DEFAULT_IMAGE: Image = {
    imageUrl: '',
    imageData: null
}

type Props = {
    groups: VariantGroupState[];
    onChangeGroups: (groups: VariantGroupState[]) => void;
    matrixRows: Record<string, MatrixRowInput>;
    onChangeMatrixRows: (rows: Record<string, MatrixRowInput>) => void;
    baseSku: string;
    baseTitle: string;
    defaultPrice: number | '';
    defaultSpecialPrice: number | '';
    defaultStock: number | '';
    hideDisabled: boolean;
    onToggleHideDisabled: () => void;
}

const VariantGenerator = React.memo((props: Props) => {
    const {
        groups,
        onChangeGroups,
        matrixRows,
        onChangeMatrixRows,
        baseSku,
        baseTitle,
        defaultPrice,
        defaultSpecialPrice,
        defaultStock,
        hideDisabled,
        onToggleHideDisabled
    } = props;

    const [groupTemplate, setGroupTemplate] = React.useState('');

    const matrixDescriptors = React.useMemo(() => buildMatrixRows(groups), [groups]);

    const buildMatrixSku = React.useCallback((attributes: { [key: string]: string }) => {
        const keys = Object.keys(attributes);
        const suffix = keys
            .map(k => skuToken(attributes[k] || '').split('-').filter(Boolean).slice(0, 2).join('-'))
            .filter(Boolean)
            .join('-');
        const out = `${baseSku}${suffix ? `-${suffix}` : ''}`;
        return out;
    }, [baseSku]);

    // Sync rows with descriptors
    React.useEffect(() => {
        const rows: Record<string, MatrixRowInput> = {};
        let changed = false;

        matrixDescriptors.forEach(d => {
            const existing = matrixRows[d.key];
            const defaultName = baseTitle ? `${baseTitle} - ${d.label}` : d.label;
            const defaultSku = buildMatrixSku(d.attributes);

            if (!existing) {
                rows[d.key] = {
                    name: defaultName,
                    sku: defaultSku,
                    price: defaultPrice,
                    special_price: defaultSpecialPrice,
                    stock: defaultStock,
                    image: DEFAULT_IMAGE,
                    disabled: false,
                    nameTouched: false,
                    skuTouched: false,
                };
                changed = true;
            } else {
                rows[d.key] = existing;
                // Optional: update name/sku if not touched? AddVariant logic:
                /*
                if (existing) {
                    rows[d.key] = {
                        ...existing,
                        name: existing.nameTouched ? existing.name : defaultName,
                        sku: existing.skuTouched ? existing.sku : (existing.sku || defaultSku),
                    };
                }
                */
               // We can keep it simple and just preserve existing. 
               // Or replicate the behavior to auto-update names if baseTitle changes.
               // Let's replicate strict behavior for now.
               const nextName = existing.nameTouched ? existing.name : defaultName;
               const nextSku = existing.skuTouched ? existing.sku : (existing.sku || defaultSku);
               
               if (nextName !== existing.name || nextSku !== existing.sku) {
                   rows[d.key] = { ...existing, name: nextName, sku: nextSku };
                   changed = true;
               }
            }
        });

        // Also check if any keys were removed (cleanup)
        const currentKeys = Object.keys(matrixRows);
        const newKeys = matrixDescriptors.map(d => d.key);
        const removed = currentKeys.some(k => !newKeys.includes(k));

        if (changed || removed || currentKeys.length !== newKeys.length) {
             // Only keep valid keys
             const finalRows: Record<string, MatrixRowInput> = {};
             newKeys.forEach(k => {
                 finalRows[k] = rows[k];
             });
             onChangeMatrixRows(finalRows);
        }
    }, [matrixDescriptors, baseTitle, buildMatrixSku, defaultPrice, defaultSpecialPrice, defaultStock]);
    // Note: added defaultPrice etc to dependency to auto-update new rows, but NOT existing rows unless we want to force update?
    // The original logic only used `s.price` etc when creating NEW rows. Existing rows were preserved.
    // My logic above: `rows[d.key] = existing || { ...defaults }`. So defaults only apply to new rows. Correct.

    const addGroup = React.useCallback(() => {
        onChangeGroups([...groups, { name: '', values: [], valueInput: '' }]);
    }, [groups, onChangeGroups]);

    const addGroupTemplate = React.useCallback((templateName: string) => {
        const normalized = normalizeString(templateName);
        if (!normalized) return;

        const exists = groups.some(g => normalizeString(g.name).toLowerCase() === normalized.toLowerCase());
        if (exists) {
            setGroupTemplate('');
            return;
        }

        const suggestionKey = resolveSuggestionKey(normalized);
        const values = (suggestionKey ? ATTRIBUTE_SUGGESTIONS[suggestionKey] : []).slice();
        
        onChangeGroups([...groups, { name: normalized, values, valueInput: '' }]);
        setGroupTemplate('');
    }, [groups, onChangeGroups]);

    const removeGroup = React.useCallback((index: number) => {
        onChangeGroups(groups.filter((_, i) => i !== index));
    }, [groups, onChangeGroups]);

    const setGroupName = React.useCallback((index: number, name: string) => {
        onChangeGroups(groups.map((g, i) => i === index ? { ...g, name } : g));
    }, [groups, onChangeGroups]);

    const setGroupValueInput = React.useCallback((index: number, valueInput: string) => {
        onChangeGroups(groups.map((g, i) => i === index ? { ...g, valueInput } : g));
    }, [groups, onChangeGroups]);

    const addGroupValue = React.useCallback((index: number) => {
        const g = groups[index];
        if (!g) return;
        const nextValue = normalizeString(g.valueInput);
        if (!nextValue) return;
        const values = dedupeStrings([...g.values, nextValue]);
        onChangeGroups(groups.map((row, i) => i === index ? { ...row, values, valueInput: '' } : row));
    }, [groups, onChangeGroups]);

    const removeGroupValue = React.useCallback((groupIndex: number, valueIndex: number) => {
        const g = groups[groupIndex];
        onChangeGroups(groups.map((row, i) => i === groupIndex ? { ...row, values: g.values.filter((_, vi) => vi !== valueIndex) } : row));
    }, [groups, onChangeGroups]);

    const applyGroupDefaults = React.useCallback((index: number) => {
        const g = groups[index];
        if (!g) return;
        const name = normalizeString(g.name);
        const suggestionKey = resolveSuggestionKey(name);
        const defaults = suggestionKey ? ATTRIBUTE_SUGGESTIONS[suggestionKey] : null;
        if (!defaults || defaults.length === 0) return;
        
        onChangeGroups(groups.map((row, i) => i === index ? { ...row, values: dedupeStrings([...row.values, ...defaults]) } : row));
    }, [groups, onChangeGroups]);

    const matrixGroupNames = React.useMemo(() => {
        const set = new Set<string>();
        const names: string[] = [];
        groups.forEach(g => {
            const n = normalizeString(g.name);
            if (!n) return;
            const values = dedupeStrings(g.values);
            if (values.length === 0) return;
            const key = n.toLowerCase();
            if (set.has(key)) return;
            set.add(key);
            names.push(n);
        });
        return names;
    }, [groups]);

    const visibleMatrixDescriptors = React.useMemo(() => {
        if (!hideDisabled) return matrixDescriptors;
        return matrixDescriptors.filter(d => {
            const row = matrixRows[d.key];
            return !row?.disabled;
        });
    }, [matrixDescriptors, hideDisabled, matrixRows]);

    const enabledMatrixCount = React.useMemo(() => {
        return matrixDescriptors.reduce((acc, d) => {
            const row = matrixRows[d.key];
            if (!row || row.disabled) return acc;
            return acc + 1;
        }, 0);
    }, [matrixDescriptors, matrixRows]);

    const setMatrixRowText = React.useCallback((key: string, field: 'name' | 'sku', value: string) => {
        const currentRow = matrixRows[key] || { name: '', sku: '', price: '', special_price: '', stock: '', image: DEFAULT_IMAGE };
        onChangeMatrixRows({
            ...matrixRows,
            [key]: {
                ...currentRow,
                [field]: value,
                nameTouched: field === 'name' ? true : currentRow.nameTouched,
                skuTouched: field === 'sku' ? true : currentRow.skuTouched,
            }
        });
    }, [matrixRows, onChangeMatrixRows]);

    const setMatrixRowNumber = React.useCallback((key: string, field: 'price' | 'special_price' | 'stock', value: number | '') => {
        const currentRow = matrixRows[key] || { name: '', sku: '', price: '', special_price: '', stock: '', image: DEFAULT_IMAGE };
        onChangeMatrixRows({
            ...matrixRows,
            [key]: { ...currentRow, [field]: value }
        });
    }, [matrixRows, onChangeMatrixRows]);

    const handleMatrixImageChange = React.useCallback((key: string, image: Image) => {
        const currentRow = matrixRows[key];
        if (!currentRow) return;
        onChangeMatrixRows({
            ...matrixRows,
            [key]: {
                ...currentRow,
                image: image
            }
        });
    }, [matrixRows, onChangeMatrixRows]);

    const handleMatrixImageRemove = React.useCallback((key: string) => {
        const currentRow = matrixRows[key];
        if (!currentRow) return;
        onChangeMatrixRows({
            ...matrixRows,
            [key]: {
                ...currentRow,
                image: DEFAULT_IMAGE
            }
        });
    }, [matrixRows, onChangeMatrixRows]);

    const toggleMatrixRowDisabled = React.useCallback((key: string) => {
        const currentRow = matrixRows[key];
        if (!currentRow) return;
        onChangeMatrixRows({
            ...matrixRows,
            [key]: {
                ...currentRow,
                disabled: !currentRow.disabled,
            }
        });
    }, [matrixRows, onChangeMatrixRows]);

    return <>
        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label">Groupes de variantes</label>
                <div className="d-flex gap-2 align-items-center">
                    <select
                        className="form-select form-select-sm"
                        style={{ minWidth: 220 }}
                        value={groupTemplate}
                        onChange={(e) => addGroupTemplate(e.target.value)}
                    >
                        <option value="">Ajouter un variant (préconfiguré)</option>
                        {Object.keys(ATTRIBUTE_SUGGESTIONS).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                    <Button type="button" className="btn btn-outline-secondary btn-sm" onClick={addGroup}>Ajouter un groupe vide</Button>
                </div>
            </div>

            <datalist id="group-name-suggestions">
                {Object.keys(ATTRIBUTE_SUGGESTIONS).map(key => <option key={key} value={key} />)}
            </datalist>

            <div className="d-flex flex-column gap-3">
                {groups.map((g, gi) => (
                    <div className="border rounded p-3" key={gi}>
                        <div className="d-flex gap-2 align-items-center mb-2">
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Nom (ex: Taille, Couleur)"
                                value={g.name}
                                list="group-name-suggestions"
                                onChange={e => setGroupName(gi, e.target.value)}
                            />
                            <Button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => applyGroupDefaults(gi)}
                            >
                                Préremplir
                            </Button>
                            <Button type="button" className="btn btn-outline-danger" onClick={() => removeGroup(gi)}>
                                Supprimer
                            </Button>
                        </div>

                        <div className="d-flex gap-2 align-items-center">
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Ajouter une valeur"
                                value={g.valueInput}
                                list={`group-values-${gi}`}
                                onChange={e => setGroupValueInput(gi, e.target.value)}
                            />
                            <datalist id={`group-values-${gi}`}>
                                {(ATTRIBUTE_SUGGESTIONS[g.name as keyof typeof ATTRIBUTE_SUGGESTIONS] || []).map(val => (
                                    <option key={val} value={val} />
                                ))}
                            </datalist>
                            <Button type="button" className="btn btn-outline-secondary" onClick={() => addGroupValue(gi)}>
                                Ajouter
                            </Button>
                        </div>

                        {g.values.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {g.values.map((v, vi) => (
                                    <span className="badge bg-secondary" key={vi} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                        {v}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light"
                                            style={{ lineHeight: 1, padding: '0 6px' }}
                                            onClick={() => removeGroupValue(gi, vi)}>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-3">
            <div className="fw-semibold mb-2">Combinaisons</div>
            {matrixDescriptors.length > 0 && (
                <div className="d-flex gap-3 align-items-center mb-2 flex-wrap">
                    <label className="d-flex gap-2 align-items-center m-0">
                        <input
                            type="checkbox"
                            checked={hideDisabled}
                            onChange={onToggleHideDisabled}
                        />
                        <span>Masquer les indisponibles</span>
                    </label>
                    <div className="text-muted">
                        {enabledMatrixCount} / {matrixDescriptors.length} disponible(s)
                    </div>
                </div>
            )}
            {matrixDescriptors.length === 0 ? (
                <div className="text-muted">Ajoute au moins 1 groupe avec des valeurs pour générer des variantes.</div>
            ) : (
                <table className="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            {matrixGroupNames.map((name) => (
                                <th key={name}>{name}</th>
                            ))}
                            <th>Dispo</th>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>SKU</th>
                            <th>Prix</th>
                            <th>Promo</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleMatrixDescriptors.map(d => {
                            const row = matrixRows[d.key];
                            const disabled = Boolean(row?.disabled);
                            return (
                                <tr key={d.key} className={disabled ? 'text-muted' : ''}>
                                    {matrixGroupNames.map((name) => (
                                        <td key={`${d.key}-${name}`}>{d.attributes[name] || ''}</td>
                                    ))}
                                    <td style={{ width: 90 }}>
                                        <Button
                                            type="button"
                                            className={`btn btn-sm ${disabled ? 'btn-outline-secondary' : 'btn-outline-danger'}`}
                                            onClick={() => toggleMatrixRowDisabled(d.key)}
                                        >
                                            {disabled ? 'Rétablir' : '×'}
                                        </Button>
                                    </td>
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
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={row?.sku || ''}
                                            onChange={(e) => setMatrixRowText(d.key, 'sku', e.target.value)}
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <NumberInput
                                            onChange={(value: number | '') => setMatrixRowNumber(d.key, 'price', value)}
                                            value={(row?.price ?? '').toLocaleString()}
                                            placeholder="0"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <NumberInput
                                            onChange={(value: number | '') => setMatrixRowNumber(d.key, 'special_price', value)}
                                            value={(row?.special_price ?? '').toLocaleString()}
                                            placeholder=""
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <NumberInput
                                            onChange={(value: number | '') => setMatrixRowNumber(d.key, 'stock', value)}
                                            value={(row?.stock ?? '').toLocaleString()}
                                            placeholder="0"
                                            disabled={disabled}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    </>;
});

export default VariantGenerator;

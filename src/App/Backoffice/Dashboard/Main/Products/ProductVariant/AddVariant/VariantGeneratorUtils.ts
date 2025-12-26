import { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";

export type VariantGroupState = {
    name: string,
    values: string[],
    valueInput: string,
}

export type MatrixRowDescriptor = {
    key: string,
    label: string,
    attributes: { [key: string]: string },
}

export type MatrixRowInput = {
    name: string,
    sku: string,
    price: number | '',
    special_price: number | '',
    stock: number | '',
    image: Image,
    disabled?: boolean,
    nameTouched?: boolean,
    skuTouched?: boolean,
}

export const ATTRIBUTE_SUGGESTIONS = {
    "Taille": ["XS", "S", "M", "L", "XL", "XXL"],
    "Taille enfant": ["2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "8 ans", "10 ans", "12 ans", "14 ans"],
    "Taille bébé": ["0-3 mois", "3-6 mois", "6-12 mois", "12-18 mois", "18-24 mois", "24-36 mois"],
    "Couleur": ["Blanc", "Noir", "Gris", "Beige", "Bleu", "Bleu marine", "Rouge", "Bordeaux", "Rose", "Vert", "Kaki", "Jaune", "Orange", "Violet", "Multicolore"],
    "Matière": ["Coton", "Coton bio", "Polyester", "Laine", "Soie", "Lin", "Viscose", "Denim"],
    "Pointure": ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    "Pointure bébé": ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
    "Pointure enfant": ["26", "27", "28", "29", "30", "31", "32", "33", "34", "35"]
};

export const normalizeString = (value: string) => value.trim();

export const dedupeStrings = (values: string[]) => {
    const set = new Set<string>();
    const out: string[] = [];
    values.forEach(v => {
        const s = normalizeString(v);
        if (!s) return;
        if (set.has(s.toLowerCase())) return;
        set.add(s.toLowerCase());
        out.push(s);
    });
    return out;
}

export const resolveSuggestionKey = (name: string): keyof typeof ATTRIBUTE_SUGGESTIONS | null => {
    const normalized = normalizeString(name).toLowerCase();
    const keys = Object.keys(ATTRIBUTE_SUGGESTIONS) as (keyof typeof ATTRIBUTE_SUGGESTIONS)[];
    const found = keys.find(k => k.toLowerCase() === normalized);
    return found || null;
}

export const buildMatrixRows = (groups: VariantGroupState[]): MatrixRowDescriptor[] => {
    const cleaned = groups
        .map(g => ({
            name: normalizeString(g.name),
            values: dedupeStrings(g.values),
        }))
        .filter(g => g.name && g.values.length > 0);

    if (cleaned.length === 0) return [];

    let combos: { [key: string]: string }[] = [{}];

    cleaned.forEach(group => {
        const next: { [key: string]: string }[] = [];
        combos.forEach(base => {
            group.values.forEach(val => {
                next.push({ ...base, [group.name]: val });
            });
        });
        combos = next;
    });

    return combos.map((attributes) => {
        const keys = cleaned.map(g => g.name);
        const key = keys.map(k => `${k}=${attributes[k]}`).join('|');
        const label = keys.map(k => attributes[k]).join(' / ');
        return { key, label, attributes };
    });
}

export const skuToken = (value: string) => {
    const cleaned = normalizeString(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toUpperCase();
    return cleaned;
}

export const buildBaseSku = (value: string) => {
    const normalized = skuToken(value);
    if (!normalized) return 'SKU';
    const parts = normalized.split('-').filter(Boolean);
    return parts.slice(0, 4).join('-') || 'SKU';
}

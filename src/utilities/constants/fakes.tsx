import { CartItem, Category, Order, OrderItem, Product, User } from "./types";

const isoString = new Date().toISOString();

export const fakeUser: User = {
    adress: '',
    email: 'unknown@user',
    email_verified_at: isoString,
    firstname: 'deleted',
    id: 0,
    image: '',
    name: 'user',
    phone_number: '',
    type: 'CUSTOMER',
    created_at: isoString,
    updated_at: isoString,
    validated_at: isoString
}

export const fakeCategory: Category = {
    id: 0,
    created_at: isoString,
    updated_at: isoString,
    image: "",
    name: 'Catégorie supprimée',
    level: 0,
    parent_id: 0,
}

export const fakeProduct: Product = {
    id: 0,
    category_id: 0,
    created_at: isoString,
    updated_at: isoString,
    description: "Ce produit n'existe plus",
    images: [],
    inStock: 0,
    price: 0,
    sale_price: 0,
    slug: 'product-deleted',
    title: 'Produit supprimé',
    category: fakeCategory,
    merchant: fakeUser,
    variants: [
        {
            id: 25,
            image: '',
            name: 'Variante A',
            price: 67,
            product_id: 2,
            created_at: isoString,
            updated_at: isoString,
            inStock: 276,
            sku: 'BBXI204HLS',
            special_price: null,
            stock: 276,
            attributes: { material: 'Cuir', color: 'Noir', inner_design: 'Classic' },
        },
        {
            id: 26,
            image: '',
            name: 'Variante B',
            price: 35,
            product_id: 2,
            created_at: isoString,
            updated_at: isoString,
            inStock: 229,
            sku: 'GT1ORYW2AC',
            special_price: null,
            stock: 229,
            attributes: { material: 'Tissu', color: 'Gris', inner_design: 'Premium' },
        },
        {
            id: 27,
            image: '',
            name: 'Variante C',
            price: 52,
            product_id: 2,
            created_at: isoString,
            updated_at: isoString,
            inStock: 423,
            sku: 'VK6M1BXCVD',
            special_price: null,
            stock: 423,
            attributes: { material: 'Cuir', color: 'Marron', inner_design: 'Premium' },
        },
        {
            id: 28,
            image: '',
            name: 'Variante D',
            price: 46,
            product_id: 2,
            created_at: isoString,
            updated_at: isoString,
            inStock: 386,
            sku: 'WGVCBB7J3B',
            special_price: null,
            stock: 386,
            attributes: { material: 'Tissu', color: 'Bleu', inner_design: 'Classic' },
        },
    ],
    colors: [],
}

export const mockProducts: Product[] = [
    {
        ...fakeProduct,
        id: 2,
        category_id: 1,
        slug: 'odio-harum-nisi-beatae-sapiente',
        title: 'Sac à langer Premium',
        description: 'Sac à langer multi-poches avec variantes matériau/couleur/design.',
        variants: [
            { id: 101, image: '', name: 'Cuir Noir Classic', price: 150000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'SAC-CL-NO-CL', special_price: 140000, stock: 20, attributes: { material: 'Cuir', color: 'Noir', inner_design: 'Classic' } },
            { id: 102, image: '', name: 'Cuir Marron Premium', price: 170000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 15, sku: 'SAC-CL-MA-PR', special_price: null, stock: 15, attributes: { material: 'Cuir', color: 'Marron', inner_design: 'Premium' } },
            { id: 103, image: '', name: 'Tissu Bleu Classic', price: 120000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 30, sku: 'SAC-TI-BL-CL', special_price: 110000, stock: 30, attributes: { material: 'Tissu', color: 'Bleu', inner_design: 'Classic' } },
        ],
    },
    {
        ...fakeProduct,
        id: 3,
        category_id: 1,
        slug: 'brassiere-coton-ml',
        title: 'Brassière Coton ML',
        description: 'Brassière en coton avec tailles et couleurs variées.',
        variants: [
            { id: 201, image: '', name: 'S Blanc', price: 20000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 50, sku: 'BRA-S-BL', special_price: null, stock: 50, attributes: { size: 'S', color: 'Blanc' } },
            { id: 202, image: '', name: 'M Rose', price: 22000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 30, sku: 'BRA-M-RO', special_price: 21000, stock: 30, attributes: { size: 'M', color: 'Rose' } },
            { id: 203, image: '', name: 'L Bleu', price: 23000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'BRA-L-BL', special_price: null, stock: 20, attributes: { size: 'L', color: 'Bleu' } },
        ],
    },
    {
        ...fakeProduct,
        id: 4,
        category_id: 1,
        slug: 'body-coton-mc',
        title: 'Body Coton MC',
        description: 'Body coton manches courtes avec options de motif/couleur.',
        variants: [
            { id: 301, image: '', name: 'Animaux Gris', price: 30000, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 40, sku: 'BDY-AN-GR', special_price: null, stock: 40, attributes: { motif: 'Animaux', color: 'Gris' } },
            { id: 302, image: '', name: 'Étoiles Blanc', price: 32000, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 35, sku: 'BDY-ET-BL', special_price: 31000, stock: 35, attributes: { motif: 'Étoiles', color: 'Blanc' } },
        ],
    },
    {
        ...fakeProduct,
        id: 5,
        category_id: 2,
        slug: 'sac-a-main-maman',
        title: 'Sac à main Maman',
        description: 'Sac à main avec variantes matériau/couleur.',
        variants: [
            { id: 401, image: '', name: 'Cuir Noir', price: 180000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 12, sku: 'SAM-CL-NO', special_price: null, stock: 12, attributes: { material: 'Cuir', color: 'Noir' } },
            { id: 402, image: '', name: 'Tissu Marron', price: 140000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 18, sku: 'SAM-TI-MA', special_price: 135000, stock: 18, attributes: { material: 'Tissu', color: 'Marron' } },
        ],
    },
    {
        ...fakeProduct,
        id: 6,
        category_id: 2,
        slug: 'ensemble-laine',
        title: 'Ensemble Laine',
        description: 'Ensemble en laine avec tailles et couleurs.',
        variants: [
            { id: 501, image: '', name: 'S Bleu', price: 60000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 25, sku: 'ENS-S-BL', special_price: null, stock: 25, attributes: { size: 'S', color: 'Bleu' } },
            { id: 502, image: '', name: 'M Rose', price: 65000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'ENS-M-RO', special_price: 63000, stock: 20, attributes: { size: 'M', color: 'Rose' } },
            { id: 503, image: '', name: 'L Gris', price: 70000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 15, sku: 'ENS-L-GR', special_price: null, stock: 15, attributes: { size: 'L', color: 'Gris' } },
        ],
    },
];

export const fakeCartItem: CartItem = {
    id: 0,
    created_at: isoString,
    product: fakeProduct,
    product_color_id: 0,
    product_variant_id: 0,
    product_id: 0,
    quantity: 0,
    subtotal: 0,
    updated_at: isoString,
    user_id: 0,
    product_variant: null,
}

export const fakeOrderItem: OrderItem = {
    id: 0,
    cart_item: fakeCartItem,
    cart_item_id: 0,
    order_id: '',
    created_at: isoString,
    updated_at: isoString,
}

export const fakeOrder: Order = {
    id: '',
    user_id: 0,
    order_items: [fakeOrderItem],
    total_price: 0,
    transaction_id: null,
    created_at: isoString,
    updated_at: isoString,
    transaction: null,
}

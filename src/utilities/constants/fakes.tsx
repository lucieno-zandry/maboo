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
        slug: 'odio-harum-nisi-beatae-sapiente',
        title: 'Prof.',
        description: 'Eos dolorem eligendi possimus et...',
    }
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

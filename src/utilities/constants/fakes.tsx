import { CartItem, Category, Order, OrderItem, Product, User } from "./types";

const isoString = new Date().toISOString();

const defaultMerchant: User = {
    adress: '',
    email: 'unknown@user',
    email_verified_at: isoString,
    firstname: 'deleted',
    id: 0,
    image: '',
    name: 'Ma boo',
    phone_number: '',
    type: 'CUSTOMER',
    created_at: isoString,
    updated_at: isoString,
    validated_at: isoString
}

const categoryBebe: Category = {
    id: 1,
    created_at: isoString,
    updated_at: isoString,
    image: "",
    name: 'Bébé',
    level: 0,
    parent_id: 0,
}

const categoryMaman: Category = {
    id: 2,
    created_at: isoString,
    updated_at: isoString,
    image: "",
    name: 'Maman',
    level: 0,
    parent_id: 0,
}

export const mockProducts: Product[] = [
    {
        id: 2,
        category_id: 1,
        slug: 'odio-harum-nisi-beatae-sapiente',
        title: 'Sac à langer Premium',
        description: 'Sac à langer multi-poches avec variantes matériau/couleur/design.',
        created_at: isoString,
        updated_at: isoString,
        images: [],
        inStock: 20,
        price: 0,
        sale_price: 0,
        category: categoryBebe,
        merchant: defaultMerchant,
        variants: [
            { id: 101, image: '', name: 'Cuir Noir Classic', price: 150000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'SAC-CL-NO-CL', special_price: 140000, stock: 20, attributes: { material: 'Cuir', color: 'Noir', inner_design: 'Classic' } },
            { id: 102, image: '', name: 'Cuir Marron Premium', price: 170000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 15, sku: 'SAC-CL-MA-PR', special_price: null, stock: 15, attributes: { material: 'Cuir', color: 'Marron', inner_design: 'Premium' } },
            { id: 103, image: '', name: 'Tissu Bleu Classic', price: 120000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 30, sku: 'SAC-TI-BL-CL', special_price: 110000, stock: 30, attributes: { material: 'Tissu', color: 'Bleu', inner_design: 'Classic' } },
            { id: 104, image: '', name: 'Cuir Noir Premium', price: 175000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 10, sku: 'SAC-CL-NO-PR', special_price: 165000, stock: 10, attributes: { material: 'Cuir', color: 'Noir', inner_design: 'Premium' } },
            { id: 105, image: '', name: 'Tissu Marron Classic', price: 125000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 22, sku: 'SAC-TI-MA-CL', special_price: null, stock: 22, attributes: { material: 'Tissu', color: 'Marron', inner_design: 'Classic' } },
            { id: 106, image: '', name: 'Tissu Noir Classic', price: 128000, product_id: 2, created_at: isoString, updated_at: isoString, inStock: 18, sku: 'SAC-TI-NO-CL', special_price: 120000, stock: 18, attributes: { material: 'Tissu', color: 'Noir', inner_design: 'Classic' } },
        ],
        colors: [],
    },
    {
        id: 3,
        category_id: 1,
        slug: 'brassiere-coton-ml',
        title: 'Brassière Coton ML',
        description: 'Brassière en coton avec tailles et couleurs variées.',
        created_at: isoString,
        updated_at: isoString,
        images: [],
        inStock: 50,
        price: 0,
        sale_price: 0,
        category: categoryBebe,
        merchant: defaultMerchant,
        variants: [
            { id: 201, image: '', name: 'S Blanc', price: 20000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 50, sku: 'BRA-S-BL', special_price: null, stock: 50, attributes: { size: 'S', color: 'Blanc' } },
            { id: 202, image: '', name: 'M Rose', price: 22000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 30, sku: 'BRA-M-RO', special_price: 21000, stock: 30, attributes: { size: 'M', color: 'Rose' } },
            { id: 203, image: '', name: 'L Bleu', price: 23000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'BRA-L-BL', special_price: null, stock: 20, attributes: { size: 'L', color: 'Bleu' } },
            { id: 204, image: '', name: 'XS Blanc', price: 19000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 25, sku: 'BRA-XS-BL', special_price: null, stock: 25, attributes: { size: 'XS', color: 'Blanc' } },
            { id: 205, image: '', name: 'XL Gris', price: 24000, product_id: 3, created_at: isoString, updated_at: isoString, inStock: 12, sku: 'BRA-XL-GR', special_price: 23500, stock: 12, attributes: { size: 'XL', color: 'Gris' } },
        ],
        colors: [],
    },
    {
        id: 4,
        category_id: 1,
        slug: 'body-coton-mc',
        title: 'Body Coton MC',
        description: 'Body coton manches courtes avec options de motif/couleur.',
        created_at: isoString,
        updated_at: isoString,
        images: [],
        inStock: 40,
        price: 0,
        sale_price: 0,
        category: categoryBebe,
        merchant: defaultMerchant,
        variants: [
            { id: 301, image: '', name: 'Animaux Gris', price: 30000, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 40, sku: 'BDY-AN-GR', special_price: null, stock: 40, attributes: { motif: 'Animaux', color: 'Gris' } },
            { id: 302, image: '', name: 'Étoiles Blanc', price: 32000, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 35, sku: 'BDY-ET-BL', special_price: 31000, stock: 35, attributes: { motif: 'Étoiles', color: 'Blanc' } },
            { id: 303, image: '', name: 'Rayures Bleu', price: 31000, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 28, sku: 'BDY-RA-BL', special_price: null, stock: 28, attributes: { motif: 'Rayures', color: 'Bleu' } },
            { id: 304, image: '', name: 'Animaux Blanc', price: 30500, product_id: 4, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'BDY-AN-BL', special_price: null, stock: 20, attributes: { motif: 'Animaux', color: 'Blanc' } },
        ],
        colors: [],
    },
    {
        id: 5,
        category_id: 2,
        slug: 'sac-a-main-maman',
        title: 'Sac à main Maman',
        description: 'Sac à main avec variantes matériau/couleur.',
        created_at: isoString,
        updated_at: isoString,
        images: [],
        inStock: 12,
        price: 0,
        sale_price: 0,
        category: categoryMaman,
        merchant: defaultMerchant,
        variants: [
            { id: 401, image: '', name: 'Cuir Noir', price: 180000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 12, sku: 'SAM-CL-NO', special_price: null, stock: 12, attributes: { material: 'Cuir', color: 'Noir' } },
            { id: 402, image: '', name: 'Tissu Marron', price: 140000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 18, sku: 'SAM-TI-MA', special_price: 135000, stock: 18, attributes: { material: 'Tissu', color: 'Marron' } },
            { id: 403, image: '', name: 'Cuir Marron', price: 185000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 8, sku: 'SAM-CL-MA', special_price: null, stock: 8, attributes: { material: 'Cuir', color: 'Marron' } },
            { id: 404, image: '', name: 'Tissu Noir', price: 138000, product_id: 5, created_at: isoString, updated_at: isoString, inStock: 16, sku: 'SAM-TI-NO', special_price: 130000, stock: 16, attributes: { material: 'Tissu', color: 'Noir' } },
        ],
        colors: [],
    },
    {
        id: 6,
        category_id: 2,
        slug: 'ensemble-laine',
        title: 'Ensemble Laine',
        description: 'Ensemble en laine avec tailles et couleurs.',
        created_at: isoString,
        updated_at: isoString,
        images: [],
        inStock: 25,
        price: 0,
        sale_price: 0,
        category: categoryMaman,
        merchant: defaultMerchant,
        variants: [
            { id: 501, image: '', name: 'S Bleu', price: 60000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 25, sku: 'ENS-S-BL', special_price: null, stock: 25, attributes: { size: 'S', color: 'Bleu' } },
            { id: 502, image: '', name: 'M Rose', price: 65000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 20, sku: 'ENS-M-RO', special_price: 63000, stock: 20, attributes: { size: 'M', color: 'Rose' } },
            { id: 503, image: '', name: 'L Gris', price: 70000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 15, sku: 'ENS-L-GR', special_price: null, stock: 15, attributes: { size: 'L', color: 'Gris' } },
            { id: 504, image: '', name: 'XL Bleu', price: 72000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 10, sku: 'ENS-XL-BL', special_price: 71000, stock: 10, attributes: { size: 'XL', color: 'Bleu' } },
            { id: 505, image: '', name: 'S Gris', price: 59000, product_id: 6, created_at: isoString, updated_at: isoString, inStock: 18, sku: 'ENS-S-GR', special_price: null, stock: 18, attributes: { size: 'S', color: 'Gris' } },
        ],
        colors: [],
    },
];

export const fakeCartItem: CartItem = {
    id: 0,
    created_at: isoString,
    product: mockProducts[0],
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

type ListProductVariant = {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  sku: string;
  price: number;
  special_price: number | null;
  stock: number;
  image: string | null;
};

type ListProduct = {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string;
  category_id: number;
  variants: ListProductVariant[];
};

export const mockListProducts: ListProduct[] = [
  {
    id: 1,
    created_at: "2025-12-01T09:00:00.000000Z",
    updated_at: "2025-12-01T09:00:00.000000Z",
    slug: "professional-laptop-15-inch",
    title: "Professional Laptop 15\"",
    description: "High-performance laptop perfect for developers and creative professionals. Features latest generation processor and dedicated graphics.",
    category_id: 1,
    variants: [
      {
        id: 1,
        created_at: "2025-12-01T10:00:00.000000Z",
        updated_at: "2025-12-01T10:00:00.000000Z",
        product_id: 1,
        sku: "LAPTOP-001",
        price: 999,
        special_price: 899,
        stock: 50,
        image: "https://example.com/laptop.jpg",
      },
      {
        id: 2,
        created_at: "2025-12-01T10:05:00.000000Z",
        updated_at: "2025-12-01T10:05:00.000000Z",
        product_id: 1,
        sku: "LAPTOP-002",
        price: 1299,
        special_price: null,
        stock: 25,
        image: null,
      },
    ],
  },
  {
    id: 2,
    created_at: "2025-12-01T09:30:00.000000Z",
    updated_at: "2025-12-01T09:30:00.000000Z",
    slug: "wireless-mouse-ergonomic",
    title: "Wireless Ergonomic Mouse",
    description: "Comfortable wireless mouse with ergonomic design. Perfect for long work sessions with adjustable DPI settings.",
    category_id: 2,
    variants: [
      {
        id: 3,
        created_at: "2025-12-01T10:15:00.000000Z",
        updated_at: "2025-12-01T10:15:00.000000Z",
        product_id: 2,
        sku: "MOUSE-BLK-001",
        price: 49,
        special_price: 39,
        stock: 150,
        image: "https://example.com/mouse-black.jpg",
      },
      {
        id: 4,
        created_at: "2025-12-01T10:20:00.000000Z",
        updated_at: "2025-12-01T10:20:00.000000Z",
        product_id: 2,
        sku: "MOUSE-WHT-001",
        price: 49,
        special_price: null,
        stock: 200,
        image: "https://example.com/mouse-white.jpg",
      },
    ],
  },
  {
    id: 3,
    created_at: "2025-12-01T08:00:00.000000Z",
    updated_at: "2025-12-01T11:00:00.000000Z",
    slug: "mechanical-keyboard-rgb",
    title: "RGB Mechanical Keyboard",
    description: "Premium mechanical keyboard with customizable RGB lighting. Cherry MX switches for the best typing experience.",
    category_id: 2,
    variants: [
      {
        id: 5,
        created_at: "2025-12-01T10:30:00.000000Z",
        updated_at: "2025-12-01T10:30:00.000000Z",
        product_id: 3,
        sku: "KB-RGB-RED",
        price: 149,
        special_price: null,
        stock: 75,
        image: "https://example.com/keyboard-red.jpg",
      },
      {
        id: 6,
        created_at: "2025-12-01T10:35:00.000000Z",
        updated_at: "2025-12-01T10:35:00.000000Z",
        product_id: 3,
        sku: "KB-RGB-BLU",
        price: 149,
        special_price: 129,
        stock: 60,
        image: "https://example.com/keyboard-blue.jpg",
      },
      {
        id: 7,
        created_at: "2025-12-01T10:40:00.000000Z",
        updated_at: "2025-12-01T10:40:00.000000Z",
        product_id: 3,
        sku: "KB-RGB-BRN",
        price: 149,
        special_price: null,
        stock: 45,
        image: null,
      },
    ],
  },
];

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

export const mockProductsOld: Product[] = [
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
    product: {
        id: 0,
        created_at: isoString,
        updated_at: isoString,
        title: '',
        description: '',
        price: 0,
        sale_price: 0,
        category_id: 0,
        variants: [],
        colors: [],
        images: [],
        category: null,
        inStock: 0,
        slug: '',
        merchant: defaultMerchant,
    },
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

export const mockProducts: Products = [
  {
    id: 1,
    created_at: "2024-01-15T10:30:00.000000Z",
    updated_at: "2024-01-15T10:30:00.000000Z",
    slug: "body-bebe-coton-bio-manches-longues",
    title: "Body Bébé Coton Bio Manches Longues",
    description: "Body doux et confortable en coton 100% bio, parfait pour les peaux sensibles. Col américain pour un habillage facile. Certifié OEKO-TEX.",
    category_id: 1,
    variants: [
      { id: 1, created_at: "2024-01-15T10:30:00.000000Z", updated_at: "2024-01-15T10:30:00.000000Z", product_id: 1, sku: "BODY-BIO-0-3M-BLANC", price: 12.90, special_price: null, stock: 45, image: "/images/body-blanc-0-3m.jpg" },
      { id: 2, created_at: "2024-01-15T10:30:00.000000Z", updated_at: "2024-01-15T10:30:00.000000Z", product_id: 1, sku: "BODY-BIO-3-6M-BLANC", price: 13.90, special_price: null, stock: 38, image: "/images/body-blanc-3-6m.jpg" },
      { id: 3, created_at: "2024-01-15T10:30:00.000000Z", updated_at: "2024-01-15T10:30:00.000000Z", product_id: 1, sku: "BODY-BIO-6-12M-BLANC", price: 14.90, special_price: null, stock: 52, image: "/images/body-blanc-6-12m.jpg" },
      { id: 4, created_at: "2024-01-15T10:30:00.000000Z", updated_at: "2024-01-15T10:30:00.000000Z", product_id: 1, sku: "BODY-BIO-0-3M-ROSE", price: 12.90, special_price: 10.90, stock: 30, image: "/images/body-rose-0-3m.jpg" },
    ],
  },
  {
    id: 2,
    created_at: "2024-01-16T14:20:00.000000Z",
    updated_at: "2024-01-16T14:20:00.000000Z",
    slug: "coussin-allaitement-ergonomique",
    title: "Coussin d'Allaitement Ergonomique",
    description: "Coussin d'allaitement évolutif et multifonction. Idéal pour l'allaitement, le biberon et comme coussin de grossesse. Housse amovible et lavable en machine.",
    category_id: 2,
    variants: [
      { id: 5, created_at: "2024-01-16T14:20:00.000000Z", updated_at: "2024-01-16T14:20:00.000000Z", product_id: 2, sku: "COUSSIN-ALLAIT-GRIS", price: 49.90, special_price: 39.90, stock: 15, image: "/images/coussin-gris.jpg" },
      { id: 6, created_at: "2024-01-16T14:20:00.000000Z", updated_at: "2024-01-16T14:20:00.000000Z", product_id: 2, sku: "COUSSIN-ALLAIT-BEIGE", price: 49.90, special_price: null, stock: 22, image: "/images/coussin-beige.jpg" },
      { id: 7, created_at: "2024-01-16T14:20:00.000000Z", updated_at: "2024-01-16T14:20:00.000000Z", product_id: 2, sku: "COUSSIN-ALLAIT-BLEU", price: 49.90, special_price: null, stock: 18, image: "/images/coussin-bleu.jpg" },
    ],
  },
  {
    id: 3,
    created_at: "2024-01-17T09:15:00.000000Z",
    updated_at: "2024-01-17T09:15:00.000000Z",
    slug: "gigoteuse-quatre-saisons-tog-2-5",
    title: "Gigoteuse Quatre Saisons TOG 2.5",
    description: "Turbulette confortable et sécurisante pour des nuits paisibles. Double zip pour faciliter le change. Matière respirante et hypoallergénique.",
    category_id: 1,
    variants: [
      { id: 8, created_at: "2024-01-17T09:15:00.000000Z", updated_at: "2024-01-17T09:15:00.000000Z", product_id: 3, sku: "GIGOTEUSE-0-6M-ETOILES", price: 34.90, special_price: null, stock: 28, image: "/images/gigoteuse-etoiles-0-6m.jpg" },
      { id: 9, created_at: "2024-01-17T09:15:00.000000Z", updated_at: "2024-01-17T09:15:00.000000Z", product_id: 3, sku: "GIGOTEUSE-6-18M-ETOILES", price: 37.90, special_price: null, stock: 35, image: "/images/gigoteuse-etoiles-6-18m.jpg" },
      { id: 10, created_at: "2024-01-17T09:15:00.000000Z", updated_at: "2024-01-17T09:15:00.000000Z", product_id: 3, sku: "GIGOTEUSE-18-36M-ETOILES", price: 39.90, special_price: null, stock: 20, image: "/images/gigoteuse-etoiles-18-36m.jpg" },
    ],
  },
  {
    id: 4,
    created_at: "2024-01-18T11:45:00.000000Z",
    updated_at: "2024-01-18T11:45:00.000000Z",
    slug: "poussette-3-roues-tout-terrain",
    title: "Poussette 3 Roues Tout-Terrain",
    description: "Poussette sportive avec suspension réglable et grandes roues gonflables. Pliage compact d'une main. Nacelle et siège auto compatibles (vendus séparément).",
    category_id: 3,
    variants: [
      { id: 11, created_at: "2024-01-18T11:45:00.000000Z", updated_at: "2024-01-18T11:45:00.000000Z", product_id: 4, sku: "POUSSETTE-3R-NOIR", price: 399.00, special_price: 349.00, stock: 8, image: "/images/poussette-noir.jpg" },
      { id: 12, created_at: "2024-01-18T11:45:00.000000Z", updated_at: "2024-01-18T11:45:00.000000Z", product_id: 4, sku: "POUSSETTE-3R-GRIS", price: 399.00, special_price: 349.00, stock: 5, image: "/images/poussette-gris.jpg" },
      { id: 13, created_at: "2024-01-18T11:45:00.000000Z", updated_at: "2024-01-18T11:45:00.000000Z", product_id: 4, sku: "POUSSETTE-3R-BLEU", price: 399.00, special_price: null, stock: 12, image: "/images/poussette-bleu.jpg" },
    ],
  },
  {
    id: 5,
    created_at: "2024-01-19T16:30:00.000000Z",
    updated_at: "2024-01-19T16:30:00.000000Z",
    slug: "bavoirs-bandana-lot-de-5",
    title: "Bavoirs Bandana - Lot de 5",
    description: "Set de 5 bavoirs bandana ultra-absorbants en coton double épaisseur. Design moderne et tendance. Boutons pression ajustables pour grandir avec bébé.",
    category_id: 1,
    variants: [
      { id: 14, created_at: "2024-01-19T16:30:00.000000Z", updated_at: "2024-01-19T16:30:00.000000Z", product_id: 5, sku: "BAVOIRS-LOT5-MIXTE", price: 19.90, special_price: null, stock: 67, image: "/images/bavoirs-mixte.jpg" },
      { id: 15, created_at: "2024-01-19T16:30:00.000000Z", updated_at: "2024-01-19T16:30:00.000000Z", product_id: 5, sku: "BAVOIRS-LOT5-FILLE", price: 19.90, special_price: 16.90, stock: 54, image: "/images/bavoirs-fille.jpg" },
      { id: 16, created_at: "2024-01-19T16:30:00.000000Z", updated_at: "2024-01-19T16:30:00.000000Z", product_id: 5, sku: "BAVOIRS-LOT5-GARCON", price: 19.90, special_price: 16.90, stock: 48, image: "/images/bavoirs-garcon.jpg" },
    ],
  },
  {
    id: 6,
    created_at: "2024-01-20T08:00:00.000000Z",
    updated_at: "2024-01-20T08:00:00.000000Z",
    slug: "tire-lait-electrique-double-pompage",
    title: "Tire-Lait Électrique Double Pompage",
    description: "Tire-lait électrique silencieux avec écran LCD et mémoire des réglages. 10 niveaux d'intensité. Batterie rechargeable pour une utilisation nomade. Pièces sans BPA.",
    category_id: 2,
    variants: [
      { id: 17, created_at: "2024-01-20T08:00:00.000000Z", updated_at: "2024-01-20T08:00:00.000000Z", product_id: 6, sku: "TIRE-LAIT-ELEC-DBL", price: 129.90, special_price: null, stock: 14, image: "/images/tire-lait-double.jpg" },
      { id: 18, created_at: "2024-01-20T08:00:00.000000Z", updated_at: "2024-01-20T08:00:00.000000Z", product_id: 6, sku: "TIRE-LAIT-ELEC-SIM", price: 89.90, special_price: 79.90, stock: 21, image: "/images/tire-lait-simple.jpg" },
    ],
  },
  {
    id: 7,
    created_at: "2024-01-21T13:20:00.000000Z",
    updated_at: "2024-01-21T13:20:00.000000Z",
    slug: "tapis-eveil-arches-amovibles",
    title: "Tapis d'Éveil avec Arches Amovibles",
    description: "Tapis d'activités moelleux avec arches et jouets suspendus. Stimule les sens de bébé avec miroir, hochets et textures variées. Surface rembourrée confortable.",
    category_id: 4,
    variants: [
      { id: 19, created_at: "2024-01-21T13:20:00.000000Z", updated_at: "2024-01-21T13:20:00.000000Z", product_id: 7, sku: "TAPIS-EVEIL-FORET", price: 59.90, special_price: null, stock: 25, image: "/images/tapis-foret.jpg" },
      { id: 20, created_at: "2024-01-21T13:20:00.000000Z", updated_at: "2024-01-21T13:20:00.000000Z", product_id: 7, sku: "TAPIS-EVEIL-OCEAN", price: 59.90, special_price: 49.90, stock: 18, image: "/images/tapis-ocean.jpg" },
      { id: 21, created_at: "2024-01-21T13:20:00.000000Z", updated_at: "2024-01-21T13:20:00.000000Z", product_id: 7, sku: "TAPIS-EVEIL-SAVANE", price: 59.90, special_price: null, stock: 32, image: "/images/tapis-savane.jpg" },
    ],
  },
  {
    id: 8,
    created_at: "2024-01-22T10:10:00.000000Z",
    updated_at: "2024-01-22T10:10:00.000000Z",
    slug: "baignoire-pliable-support-integre",
    title: "Baignoire Bébé Pliable avec Support",
    description: "Baignoire ergonomique avec réducteur nouveau-né intégré. Se plie pour un rangement gain de place. Bouchon de vidange et indicateur de température.",
    category_id: 3,
    variants: [
      { id: 22, created_at: "2024-01-22T10:10:00.000000Z", updated_at: "2024-01-22T10:10:00.000000Z", product_id: 8, sku: "BAIGNOIRE-PLI-GRIS", price: 54.90, special_price: null, stock: 19, image: "/images/baignoire-gris.jpg" },
      { id: 23, created_at: "2024-01-22T10:10:00.000000Z", updated_at: "2024-01-22T10:10:00.000000Z", product_id: 8, sku: "BAIGNOIRE-PLI-BLEU", price: 54.90, special_price: 44.90, stock: 16, image: "/images/baignoire-bleu.jpg" },
    ],
  },
  {
    id: 9,
    created_at: "2024-01-23T15:40:00.000000Z",
    updated_at: "2024-01-23T15:40:00.000000Z",
    slug: "chauffe-biberon-sterilisateur-2-en-1",
    title: "Chauffe-Biberon Stérilisateur 2-en-1",
    description: "Appareil multifonction pour chauffer le lait et stériliser biberons et tétines. Arrêt automatique et maintien au chaud. Compatible tous types de biberons.",
    category_id: 3,
    variants: [
      { id: 24, created_at: "2024-01-23T15:40:00.000000Z", updated_at: "2024-01-23T15:40:00.000000Z", product_id: 9, sku: "CHAUFFE-BIB-2EN1", price: 44.90, special_price: null, stock: 41, image: "/images/chauffe-biberon.jpg" },
    ],
  },
  {
    id: 10,
    created_at: "2024-01-24T12:25:00.000000Z",
    updated_at: "2024-01-24T12:25:00.000000Z",
    slug: "ensemble-5-bodies-manches-courtes",
    title: "Ensemble 5 Bodies Manches Courtes",
    description: "Pack économique de 5 bodies en coton doux. Pressions entre-jambes pour faciliter le change. Couleurs mixtes assorties. Lavage en machine à 40°C.",
    category_id: 1,
    variants: [
      { id: 25, created_at: "2024-01-24T12:25:00.000000Z", updated_at: "2024-01-24T12:25:00.000000Z", product_id: 10, sku: "PACK5-BODY-1M", price: 24.90, special_price: 19.90, stock: 88, image: "/images/pack-bodies-1m.jpg" },
      { id: 26, created_at: "2024-01-24T12:25:00.000000Z", updated_at: "2024-01-24T12:25:00.000000Z", product_id: 10, sku: "PACK5-BODY-3M", price: 24.90, special_price: 19.90, stock: 95, image: "/images/pack-bodies-3m.jpg" },
      { id: 27, created_at: "2024-01-24T12:25:00.000000Z", updated_at: "2024-01-24T12:25:00.000000Z", product_id: 10, sku: "PACK5-BODY-6M", price: 26.90, special_price: 21.90, stock: 72, image: "/images/pack-bodies-6m.jpg" },
      { id: 28, created_at: "2024-01-24T12:25:00.000000Z", updated_at: "2024-01-24T12:25:00.000000Z", product_id: 10, sku: "PACK5-BODY-12M", price: 26.90, special_price: 21.90, stock: 63, image: "/images/pack-bodies-12m.jpg" },
    ],
  },
];

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

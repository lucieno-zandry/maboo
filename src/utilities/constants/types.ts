export type User = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  adress: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  phone_number: string;
  image: string | null | File | Blob;
  validated_at: string | null;
  type: "ADMIN" | "CUSTOMER" | "SELLER" | "PROFESSIONNAL";
};

export type Category = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  parent_id: number;
  level: number;
};

export type CategoriesHierarchy = {
  category: Category;
  children: CategoriesHierarchy;
}[];

export type ProductImage = {
  id: number;
  name: string;
  product_id: number;
  created_at: string;
  updated_at: string;
};

export type ProductVariant = {
  id: number;
  image: string;
  name: string;
  price: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  inStock: number;
  sku?: string;
  special_price?: number | null;
  stock?: number;
  attributes?: { [key: string]: string } | null;
};

export type ProductColor = {
  id: number;
  code: string;
  name: string;
  product_id: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  price: number;
  sale_price: number;
  category_id: number;
  variants: ProductVariant[];
  colors: ProductColor[];
  images: ProductImage[];
  category: Category | null;
  inStock: number;
  slug: string;
  merchant: User;
};

// ----------------------------- Products List (Frontend /products) -----------------------------
export type ProductListVariant = {
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

export type ProductList = {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string;
  category_id: number;
  variants: ProductListVariant[];
};

export type Products = ProductList[];

export type CartItem = {
  id: number;
  product_id: number;
  product_color_id: number;
  product_variant_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  quantity: number;
  product: Product;
  subtotal: number;
  product_variant: ProductVariant | null;
};

export type OrderItem = {
  id: number;
  created_at: string;
  updated_at: string;
  order_id: string;
  cart_item_id: number;
  cart_item: CartItem;
};

export type Transaction = {
  id: number;
  transactionnable_id: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  method: string;
  status: string;
  type: string;
};

export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  total_price: number;
  transaction_id: number | null;
  user_id: number;
  order_items: OrderItem[];
  transaction: Transaction | null;
};

export type BackOfficeOrder = Order & { user: User };
export type BackOfficeOrderItem = OrderItem & { user: User };

export type NotificationData = {
  title: string,
  line: string,
  icon: string,
  action: string,
}

export type Notification = {
  id: string,
  type: string,
  notifiable_type: string,
  notifiable_id: number,
  data: string,
  read_at: string | null,
  created_at: string,
  updated_at: string,
}

export type UserType = 'customer' | 'admin' | 'seller' | 'professional';

export interface Article {
  id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  sections: Section[];
  images: Image[];
}

export interface Image {
  id: number;
  url: string;
  caption: string;
  order?: number;
}

export interface Paragraph {
  id: number;
  content: string;
}

export interface Subsection {
  id: number;
  title: string;
  order?: number;
  paragraphs: Paragraph[];
}

export interface Section {
  id: number;
  title: string;
  order?: number;
  subsections: Subsection[];
}

// ----------------------------- Détail Produit (Backend) -----------------------------
export interface VariantOptionWithPivot {
  id: number;
  created_at: string;
  updated_at: string;
  value: string;
  variant_group_id: number;
  pivot: {
    variant_id: number;
    variant_option_id: number;
  };
}

export interface VariantOption {
  id: number;
  created_at: string;
  updated_at: string;
  value: string;
  variant_group_id: number;
}

export interface VariantGroup {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  name: string;
  variant_options: VariantOption[];
}

export interface ProductVariantDetail {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  sku: string;
  price: number;
  special_price: number | null;
  stock: number;
  image: string | null;
  variant_options: VariantOptionWithPivot[];
}

export interface ProductDetail {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string;
  category_id: number;
  variant_groups: VariantGroup[];
  variants: ProductVariantDetail[];
}

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
  image: string | null;
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
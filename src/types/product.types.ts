// Variant Option avec Pivot
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

// Variant Option (pour les variant_options d'un variant_group)
export interface VariantOption {
  id: number;
  created_at: string;
  updated_at: string;
  value: string;
  variant_group_id: number;
}

// Variant Group
export interface VariantGroup {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  name: string;
  variant_options: VariantOption[];
}

// Product Variant (liste produits)
export interface ProductVariant {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  sku: string;
  price: number;
  special_price: number | null;
  stock: number;
  image: string | null;
}

// Product (liste produits)
export interface Product {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string;
  category_id: number;
  variants: ProductVariant[];
}

export type Products = Product[];

// Product Variant Detail (détail produit)
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

// Product Detail (détail produit)
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

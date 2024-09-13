import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  cancelledOrders,
  deliveredOrders,
  getCart,
  processingOrders,
} from "../../api/customer/actions";

import {
  getCategories,
  getCategoryProducts,
  getFeaturedProducts,
  getProduct,
} from "../../api/actions";

import {
  CartItem,
  CategoriesHierarchy,
  Order,
  OrderItem,
  Product,
} from "../../constants/types";

interface FrontOfficeState {
  categories: CategoriesHierarchy | null;
  featuredProducts: Product[] | null;
  categoryProducts: {
    [key: string]: Product[] | undefined;
  };
  products: {
    [key: string]: Product | undefined;
  };
  cart: CartItem[] | null;
  orders: {
    cancelled: Order[] | null;
    processing: OrderItem[] | null;
    delivered: OrderItem[] | null;
    order: {
      [key: string]: Order;
    };
  };
}

const initialState: FrontOfficeState = {
  categories: null,
  featuredProducts: null,
  categoryProducts: {},
  products: {},
  cart: null,
  orders: {
    cancelled: null,
    processing: null,
    delivered: null,
    order: {},
  },
};

const frontofficeSlice = createSlice({
  name: "frontoffice",
  initialState,
  reducers: {
    setCategoryProducts: (
      state,
      action: PayloadAction<{ products: Product[]; selectorId: string }>
    ) => {
      state.categoryProducts[action.payload.selectorId] =
        action.payload.products;
    },
    setCancelledOrders: (state, action: PayloadAction<Order[] | null>) => {
      state.orders.cancelled = action.payload;
    },
    setProcessingOrders: (state, action: PayloadAction<OrderItem[] | null>) => {
      state.orders.processing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        refreshCategories.fulfilled,
        (state, action: PayloadAction<CategoriesHierarchy>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        refreshFeaturedProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.featuredProducts = action.payload;
        }
      )
      .addCase(
        refreshCategoryProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ products: Product[]; category_id: number }>
        ) => {
          state.categoryProducts[`category-${action.payload.category_id}`] =
            action.payload.products;
        }
      )
      .addCase(
        refreshProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const product = action.payload;

          if (product) {
            state.products[product.slug] = product;
          }
        }
      )
      .addCase(
        refreshCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cart = action.payload;
        }
      )
      .addCase(
        refreshCancelledOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders.cancelled = action.payload;
        }
      )
      .addCase(
        refreshProcessingOrders.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.orders.processing = action.payload;
        }
      )
      .addCase(
        refreshDeliveredOrders.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.orders.delivered = action.payload;
        }
      );
  },
});


export const refreshDeliveredOrders = createAsyncThunk(
  "frontoffice/refreshDeliveredOrders",
  async () => {
    const response = await deliveredOrders();
    return response.data.order_items;
  }
);

export const refreshProcessingOrders = createAsyncThunk(
  "frontoffice/refreshProcessingOrders",
  async () => {
    const response = await processingOrders();
    return response.data.order_items;
  }
);

export const refreshCancelledOrders = createAsyncThunk(
  "frontoffice/refreshCancelledOrders",
  async () => {
    const response = await cancelledOrders();
    return response.data.orders;
  }
);

export const refreshCategories = createAsyncThunk(
  "frontoffice/refreshCategories",
  async () => {
    const response = await getCategories();
    return response.data?.hierarchy;
  }
);

export const refreshCategoryProducts = createAsyncThunk(
  "frontoffice/refreshCategoryProducts",
  async (category_id: number) => {
    const response = await getCategoryProducts(category_id);
    return {
      products: response.data?.products,
      category_id,
    };
  }
);

export const refreshFeaturedProducts = createAsyncThunk(
  "frontoffice/refreshFeaturedProducts",
  async () => {
    const response = await getFeaturedProducts();
    return response.data?.products;
  }
);

export const refreshProduct = createAsyncThunk(
  "frontoffice/refreshProduct",
  async (slug: string) => {
    const response = await getProduct(slug);
    return response.data?.product;
  }
);

export const refreshCart = createAsyncThunk(
  "frontoffice/refreshCart",
  async () => {
    const response = await getCart();
    return response.data?.cart;
  }
);

export const { setCategoryProducts } = frontofficeSlice.actions;
export default frontofficeSlice.reducer;

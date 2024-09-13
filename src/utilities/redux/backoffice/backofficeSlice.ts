import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BackOfficeOrder,
  BackOfficeOrderItem,
  Category,
  Product,
  User,
} from "../../constants/types";

import {
  getAdminRequests,
  getAllCategories,
  getSellerRequests,
  getUncheckedOrders,
} from "../../api/admin/actions";

import {
  getMerchantProducts,
  getDeliveredOrders,
  getProcessingOrders
} from "../../api/actions";

interface BackofficeState {
  categories: Category[] | null;
  products: Product[] | null;
  seller: {
    requests: User[] | null;
  };
  admin: {
    requests: User[] | null;
  };
  order: {
    processing: BackOfficeOrderItem[] | null;
    unchecked: BackOfficeOrder[] | null;
    delivered: BackOfficeOrderItem[] | null;
  };
}

const initialState: BackofficeState = {
  categories: null,
  products: null,
  seller: {
    requests: null,
  },
  admin: {
    requests: null,
  },
  order: {
    processing: null,
    unchecked: null,
    delivered: null,
  },
};

const backofficeSlice = createSlice({
  name: "backoffice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setAdminProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        refreshCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        refreshProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      )
      .addCase(
        refreshSellerRequests.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.seller.requests = action.payload;
        }
      )
      .addCase(
        refreshAdminRequests.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.admin.requests = action.payload;
        }
      )
      .addCase(
        refreshProcessingOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrderItem[]>) => {
          state.order.processing = action.payload;
        }
      )
      .addCase(
        refreshUncheckedOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrder[]>) => {
          state.order.unchecked = action.payload;
        }
      )
      .addCase(
        refreshDeliveredOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrderItem[]>) => {
          state.order.delivered = action.payload;
        }
      );
  },
});

export const refreshDeliveredOrders = createAsyncThunk(
  "refreshDeliveredOrders",
  async () => {
    const response = await getDeliveredOrders();
    return response.data.orders;
  }
);

export const refreshUncheckedOrders = createAsyncThunk(
  "backoffice/refreshUncheckedOrders",
  async () => {
    const response = await getUncheckedOrders();
    return response.data?.orders;
  }
);

export const refreshProcessingOrders = createAsyncThunk(
  "backoffice/refreshProcessingOrders",
  async () => {
    const response = await getProcessingOrders();
    return response.data?.orders;
  }
);

export const refreshCategories = createAsyncThunk(
  "backoffice/refreshCategories",
  async () => {
    const response = await getAllCategories();
    return response.data.categories;
  }
);

export const refreshProducts = createAsyncThunk(
  "backoffice/refreshProducts",
  async () => {
    const response = await getMerchantProducts();
    return response.data.products;
  }
);

export const refreshSellerRequests = createAsyncThunk(
  "backoffice/refreshSellerRequests",
  async () => {
    const response = await getSellerRequests();
    return response.data.sellers;
  }
);

export const refreshAdminRequests = createAsyncThunk(
  "backoffice/refreshAdminRequests",
  async () => {
    const response = await getAdminRequests();
    return response.data.admins;
  }
);

export const { setAdminProducts, setCategories} = backofficeSlice.actions;
export default backofficeSlice.reducer;

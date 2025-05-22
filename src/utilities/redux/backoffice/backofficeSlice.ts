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

// Import du nouveau service API pour les vendeurs
import {
  fetchSellers,
  addSeller as apiAddSeller,
  updateSeller as apiUpdateSeller,
  deleteSeller as apiDeleteSeller,
  deleteMultipleSellers as apiDeleteMultipleSellers
} from "../../services/sellerService";

interface BackofficeState {
  categories: Category[] | null;
  products: Product[] | null;
  sellers: User[] | null;
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
  sellers: null,
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
    setSellers: (state, action: PayloadAction<User[]>) => {
      state.sellers = action.payload;
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
        refreshSellers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.sellers = action.payload;
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

export const refreshSellers = createAsyncThunk(
  "backoffice/refreshSellers",
  async () => {
    try {
      // Utilisation du service API pour récupérer les vendeurs
      const sellers = await fetchSellers();
      return sellers;
    } catch (error) {
      console.error("Erreur lors du chargement des vendeurs:", error);
      // En cas d'échec, on retourne un tableau vide pour éviter les erreurs
      return [];
    }
  }
);

/**
 * Type pour les données du vendeur à ajouter
 * Exclut l'ID et permet d'utiliser File ou Blob pour l'image
 */
type SellerInput = Omit<User, 'id'>;

/**
 * Ajoute un nouveau vendeur et rafraîchit la liste
 */
export const addSeller = createAsyncThunk(
  "backoffice/addSeller",
  async (seller: SellerInput, { dispatch }) => {
    try {
      // Appel à l'API pour ajouter le vendeur
      const newSeller = await apiAddSeller(seller);

      // Rafraîchir la liste des vendeurs après l'ajout
      dispatch(refreshSellers());

      return newSeller;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un vendeur:", error);
      throw error;
    }
  }
);

/**
 * Met à jour un vendeur existant et rafraîchit la liste
 */
export const updateSeller = createAsyncThunk(
  "backoffice/updateSeller",
  async (seller: User, { dispatch }) => {
    try {
      // Appel à l'API pour mettre à jour le vendeur
      const updatedSeller = await apiUpdateSeller(seller);

      // Rafraîchir la liste des vendeurs après la mise à jour
      dispatch(refreshSellers());

      return updatedSeller;
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'un vendeur:", error);
      throw error;
    }
  }
);

/**
 * Supprime un vendeur et rafraîchit la liste
 */
export const deleteSingleSeller = createAsyncThunk(
  "backoffice/deleteSingleSeller",
  async (id: number, { dispatch }) => {
    try {
      // Appel à l'API pour supprimer le vendeur
      await apiDeleteSeller(id);

      // Rafraîchir la liste des vendeurs après la suppression
      dispatch(refreshSellers());

      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression d'un vendeur:", error);
      throw error;
    }
  }
);

/**
 * Supprime plusieurs vendeurs et rafraîchit la liste
 */
export const deleteMultipleSellers = createAsyncThunk(
  "backoffice/deleteMultipleSellers",
  async (ids: number[], { dispatch }) => {
    try {
      // Appel à l'API pour supprimer plusieurs vendeurs
      await apiDeleteMultipleSellers(ids);

      // Rafraîchir la liste des vendeurs après les suppressions
      dispatch(refreshSellers());

      return ids;
    } catch (error) {
      console.error("Erreur lors de la suppression multiple de vendeurs:", error);
      throw error;
    }
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

export const { setAdminProducts, setCategories, setSellers } = backofficeSlice.actions;
export default backofficeSlice.reducer;

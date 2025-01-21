import { EditProductData } from "../../App/Backoffice/Dashboard/Main/Products/EditProduct/EditProductBody/EditProductBody";
import { EditProductColorData } from "../../App/Backoffice/Dashboard/Main/Products/ProductColor/ColorsList/ColorItem/Edit/Edit";
import { EditProductVariantData } from "../../App/Backoffice/Dashboard/Main/Products/ProductVariant/VariantsList/VariantItem/Edit/Edit";
import links from "../helpers/links";
import QueryUrl from "../helpers/QueryUrl";
import toFormData from "../helpers/toFormData";
import userType from "../helpers/userType";
import api from "./api";

export const getAuth = () => {
    return api.get(links.getAuth);
}

export const signup = (payload: {
    email?: string,
    password?: string,
    name?: string,
    firstname?: string
}) => {
    return api.post(links.signup, payload);
}

export const login = (payload: {
    email?: string,
    password?: string,
}) => {
    return api.post(links.login, payload);
}

export const resetPassword = (payload: {
    password: string,
    password_confirmation: string,
    token: string
}) => {
    return api.post(`/${userType()}/auth/reset-password`, payload);
}

export const verifyEmailConformity = (email: string) => {
    return api.post('/auth/verify-email-conformity', { email });
}

export const makeEmailConfirmation = () => {
    return api.get('/auth/email/make_confirmation');
}

export const matchConfirmationCode = (code: string) => {
    return api.post('/auth/email/match_code', { code });
}

export const forgetPassword = (email: string) => {
    return api.post('/auth/forgotten-password', { email });
}

export const updateUser = (payload: {
    name?: string,
    firstname?: string,
    email?: string,
    image?: File,
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.image && (payload.image instanceof File)) {
        data = toFormData(payload);
    }

    return api.post('/user/update', data);
}

export const changePassword = (payload: {
    current_password?: string,
    password?: string,
    password_confirmation?: string,
}) => {
    return api.post('/user/change-password', payload);
}

export const createProduct = (payload: {
    title?: string,
    description?: string,
    price?: number,
    sale_price?: number,
    inStock?: number,
    category_id?: number,
    images?: File[],
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.images && payload.images.length > 0) {
        data = toFormData(payload);
    }

    return api.post('/product/create', data);
}

export const updateProduct = (payload: EditProductData) => {
    let data = payload as typeof payload | FormData;

    if (payload.images && payload.images.length > 0) {
        data = toFormData(payload);
    }

    return api.post('/product/update', data);
}

export const deleteProductImage = (id: number) => {
    return api.delete(`/product/image/delete/${id}`);
}

export const cancelProductUpdate = (id: number) => {
    return api.post('/product/cancel-update', { id });
}

export const deleteProduct = (ids: number[]) => {
    return api.post(`/product/delete`, { ids });
}

export const createProductVariant = (payload: {
    image: File,
    name: string,
    product_id: number,
    price?: number,
    inStock: number,
}) => {
    return api.post('/product/variant/create', toFormData(payload))
}

export const deleteProductVariants = (ids: number[]) => {
    return api.post('/product/variant/delete', { ids });
}

export const updateProductVariant = (id: number, payload: EditProductVariantData) => {
    let data = { ...payload } as EditProductVariantData | FormData;

    if (payload.image) {
        data = toFormData(payload);
    }

    return api.post(`/product/variant/update/${id}`, data);
}

export const createProductColor = (payload: {
    name: string,
    product_id: number,
    code?: string,
}) => {
    return api.post('/product/color/create', toFormData(payload))
}

export const deleteProductColors = (ids: number[]) => {
    return api.post('/product/color/delete', { ids });
}

export const updateProductColor = (id: number, payload: EditProductColorData) => {
    return api.post(`/product/color/update/${id}`, payload);
}

export const markOrderItemsAsDelivered = (orderItemIds: number[]) => {
    return api.post(`/order/status/update`, {
        status: 2,
        ids: orderItemIds,
    });
}

export const wstoken = () => {
    return api.get('/wstoken/get');
}

export const getCategories = () => {
    return api.get('/category/hierarchy');
}

export const getFeaturedProducts = () => {
    return api.get('/product/featured');
}

export const getCategoryProducts = (id: number, options?: {
    offset?: number,
    limit?: number,
}) => {
    const Url = new QueryUrl(`/category/${id}/products`);

    if (options?.offset) Url.addParam('offset', options?.offset);
    if (options?.limit) Url.addParam('limit', options?.limit);

    return api.get(Url.getString());
}

export const getProduct = (slug: string) => {
    return api.get(`/product/get/${slug}`);
}

export const getOrder = (id: string) => {
    return api.get(`/order/get/${id}`);
}

export const search = (keywords: string, options?: {
    limit?: number,
    offset?: number,
    type?: 'products' | 'sellers',
}) => {
    const Url = new QueryUrl(`/search/${keywords}`);

    if (options?.limit) Url.addParam('limit', options.limit);
    if (options?.offset) Url.addParam('offset', options.offset);
    if (options?.type) Url.addParam('type', options.type);

    return api.get(Url.getString());
}

export const allNotifications = () => {
    return api.get('/notification/all');
}

export const unreadNotifications = () => {
    return api.get('/notification/unread');
}

export const readNotification = (notification_id: string) => {
    return api.put(`/notification/read/${notification_id}`);
}

export const getWstoken = () => {
    return api.get('/wstoken/get');
}

export const salesTotal = () => {
    return api.get('/sales/total');
}

export const getProcessingOrders = () => {
    return api.get(`/order/processing`);
}

export const getDeliveredOrders = () => {
    return api.get(`/order/delivered`);
}

export const getMerchantProducts = (options?: {
    limit?: number,
    offset?: number,
}) => {
    const Url = new QueryUrl(`/${userType()}/product/get`);
    if (options?.offset) Url.addParam('offset', options.offset);
    if (options?.limit) Url.addParam('limit', options.limit);

    return api.get(Url.getString());
}
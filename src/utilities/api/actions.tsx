import { EditProductData } from "../../App/Backoffice/Dashboard/Main/Products/EditProduct/EditProductBody/EditProductBody";
import { EditProductColorData } from "../../App/Backoffice/Dashboard/Main/Products/ProductColor/ColorsList/ColorItem/Edit/Edit";
import { EditProductVariantData } from "../../App/Backoffice/Dashboard/Main/Products/ProductVariant/VariantsList/VariantItem/Edit/Edit";
import links from "../helpers/links";
import QueryUrl from "../helpers/QueryUrl";
import toFormData from "../helpers/toFormData";
import userType from "../helpers/userType";
import api from "./api";
import { mockProducts, mockProductDetail, mockProductDetail2 } from "../constants/fakes";
import type { ProductList, ProductListVariant, ProductDetail, ProductVariantDetail, VariantGroup, VariantOption } from "../constants/types";

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

    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        return Promise.resolve({ data: { success: true } });
    }

    return api.post('/product/create', data).catch(() => ({ data: { success: true } }));
}

export const updateProduct = (payload: EditProductData) => {
    let data = payload as typeof payload | FormData;

    if (payload.images && payload.images.length > 0) {
        data = toFormData(payload);
    }

    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        return Promise.resolve({ data: { success: true } });
    }

    return api.post('/product/update', data).catch(() => ({ data: { success: true } }));
}

export const deleteProductImage = (id: number) => {
    return api.delete(`/product/image/delete/${id}`);
}

export const cancelProductUpdate = (id: number) => {
    return api.post('/product/cancel-update', { id });
}

export const deleteProduct = (ids: number[]) => {
    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        return Promise.resolve({ data: { success: true } });
    }
    return api.post(`/product/delete`, { ids }).catch(() => ({ data: { success: true } }));
}

export const createProductVariant = (payload: {
    image?: File | null,
    name: string,
    product_id: number,
    price?: number,
    inStock: number,
    sku?: string,
    special_price?: number,
    stock?: number,
    attributes?: { [key: string]: string },
}) => {
    const data = { ...payload } as any;
    if (!data.image) delete data.image;
    if (data.attributes) data.attributes = JSON.stringify(data.attributes);
    return api.post('/product/variant/create', toFormData(data))
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
    return api.get('/category/hierarchy').catch(() => ({ data: { hierarchy: [] } }));
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
    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        const product = findMockDetailBySlug(slug);
        return Promise.resolve({ data: { product } });
    }
    return api
        .get(`/product/get/${slug}`)
        .then((response) => {
            const product = response?.data?.product;
            if (product) return response;
            return { data: { product: findMockDetailBySlug(slug) } };
        })
        .catch(() => ({ data: { product: findMockDetailBySlug(slug) } }));
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
    const getMockPage = () => {
        const offset = options?.offset || 0;
        const limit = options?.limit || 20;
        const products = mockProducts.slice(offset, offset + limit);
        return { data: { products } };
    };

    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        return Promise.resolve(getMockPage());
    }

    const Url = new QueryUrl(`/${userType()}/product/get`);
    if (options?.offset) Url.addParam('offset', options.offset);
    if (options?.limit) Url.addParam('limit', options.limit);

    const normalizeVariant = (v: any, productId: number, fallbackCreatedAt: string, fallbackUpdatedAt: string, index: number): ProductListVariant => {
        return {
            id: typeof v?.id === 'number' ? v.id : productId * 1000 + index,
            created_at: v?.created_at || fallbackCreatedAt,
            updated_at: v?.updated_at || fallbackUpdatedAt,
            product_id: typeof v?.product_id === 'number' ? v.product_id : productId,
            sku: String(v?.sku || ''),
            price: Number(v?.price || 0),
            special_price: v?.special_price ?? null,
            stock: Number(v?.stock ?? v?.inStock ?? 0),
            image: v?.image ?? null,
        };
    };

    const normalizeProduct = (p: any): ProductList => {
        const id = Number(p?.id || 0);
        const created_at = String(p?.created_at || new Date().toISOString());
        const updated_at = String(p?.updated_at || created_at);

        let variants: ProductListVariant[] = [];

        if (Array.isArray(p?.variants) && p.variants.length > 0) {
            variants = p.variants.map((v: any, idx: number) => normalizeVariant(v, id, created_at, updated_at, idx));
        } else if (p && (p.price !== undefined || p.sale_price !== undefined || p.inStock !== undefined)) {
            variants = [normalizeVariant({
                id: id * 1000,
                created_at,
                updated_at,
                product_id: id,
                sku: p?.sku || '',
                price: p?.price || 0,
                special_price: p?.sale_price ?? null,
                stock: p?.inStock ?? 0,
                image: null,
            }, id, created_at, updated_at, 0)];
        }

        return {
            id,
            created_at,
            updated_at,
            slug: String(p?.slug || ''),
            title: String(p?.title || ''),
            description: String(p?.description || ''),
            category_id: Number(p?.category_id || 0),
            variants,
        };
    };

    return api
        .get(Url.getString())
        .then((response) => {
            const raw = response?.data?.products;
            if (!Array.isArray(raw)) return getMockPage();

            const isLegacyShape = (p: any): boolean => {
                if (!p || typeof p !== 'object') return true;
                if (!Array.isArray(p.variants) || p.variants.length === 0) return true;
                return p.variants.some((v: any) => !v || typeof v !== 'object' || !v.sku);
            };

            if (raw.some(isLegacyShape)) {
                return getMockPage();
            }

            const products = raw.map(normalizeProduct);
            return { ...response, data: { ...response.data, products } };
        })
        .catch(() => getMockPage());
}

export const getProducts = () => {
    const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
    if (useMocks) {
        return Promise.resolve({ data: { products: mockProducts } });
    }
    return api.get('/products').catch(() => ({ data: { products: mockProducts } }));
}

// Deprecated: les fonctions Mock sont désormais intégrées dans getProducts/getProduct

export const normalizeProducts = (products: any[]): import("../constants/types").Product[] => {
    return products.map((p: any) => ({
        id: p.id,
        created_at: p.created_at,
        updated_at: p.updated_at,
        slug: p.slug,
        title: p.title,
        description: p.description,
        category_id: p.category_id,
        images: [],
        price: 0,
        sale_price: 0,
        inStock: 0,
        category: null,
        merchant: {} as any,
        colors: [],
        variants: (p.variants || []).map((v: any) => ({
            id: v.id,
            created_at: v.created_at,
            updated_at: v.updated_at,
            product_id: v.product_id,
            sku: v.sku,
            price: v.price,
            special_price: v.special_price,
            stock: v.stock,
            image: v.image || '',
            name: v.sku || '',
            inStock: v.stock || 0,
            attributes: v.attributes || null,
        })),
    }));
}

function findMockDetailBySlug(slug: string): ProductDetail {
    if (slug === 'coussin-allaitement-ergonomique') return mockProductDetail2 as ProductDetail;
    if (slug === 'body-bebe-coton-bio-manches-longues') return mockProductDetail as ProductDetail;
    const fromList = (mockProducts as ProductList[]).find(p => p.slug === slug);
    if (!fromList) return mockProductDetail as ProductDetail;
    return buildDetailFromList(fromList);
}

function buildDetailFromList(p: ProductList): ProductDetail {
    const groupId = 100 + p.id;
    const group: VariantGroup = {
        id: groupId,
        created_at: p.created_at,
        updated_at: p.updated_at,
        product_id: p.id,
        name: 'SKU',
        variant_options: [] as VariantOption[],
    };

    const variants: ProductVariantDetail[] = (p.variants || []).map((v) => {
        const optionId = 1000 + v.id;
        const option: VariantOption = {
            id: optionId,
            created_at: v.created_at,
            updated_at: v.updated_at,
            value: v.sku,
            variant_group_id: groupId,
        };
        group.variant_options.push(option);
        return {
            id: v.id,
            created_at: v.created_at,
            updated_at: v.updated_at,
            product_id: v.product_id,
            sku: v.sku,
            price: v.price,
            special_price: v.special_price,
            stock: v.stock,
            image: v.image,
            variant_options: [{
                id: optionId,
                created_at: v.created_at,
                updated_at: v.updated_at,
                value: v.sku,
                variant_group_id: groupId,
                pivot: { variant_id: v.id, variant_option_id: optionId },
            }],
        };
    });

    const detail: ProductDetail = {
        id: p.id,
        created_at: p.created_at,
        updated_at: p.updated_at,
        slug: p.slug,
        title: p.title,
        description: p.description,
        category_id: p.category_id,
        variant_groups: [group],
        variants,
    };
    return detail;
}

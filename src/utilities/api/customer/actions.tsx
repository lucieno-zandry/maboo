import links from "../../helpers/links";
import api from "../api";

export const getCart = () => {
    return api.get('/cart/get');
}

export const addToCart = (payload: {
    product_id: number,
    quantity: number,
    product_variant_id?: number,
    product_color_id?: number,
}) => {
    return api.post(links.addToCart, payload);
}

export const deleteCartItems = (ids: number[]) => {
    return api.post('/cart/delete', { ids });
}

export const updateCartItem = (id: number, payload: {
    quantity?: number,
}) => {
    return api.put(`/cart/update/${id}`, payload);
}

export const makeOrder = (cart_item_ids: number[]) => {
    return api.post('/customer/order/make', { cart_item_ids });
}

export const initOrderTransaction = (payload: {
    order_id: string,
    method: 'ORANGEMONEY' | 'AIRTELMONEY' | 'MVOLA'
}) => {
    return api.post('/transaction/order/make', payload);
}

export const deleteOrder = (order_id: string) => {
    return api.delete(`/customer/order/delete/${order_id}`)
}

export const cancelledOrders = () => {
    return api.get('/customer/order/cancelled');
}

export const processingOrders = () => {
    return api.get('/customer/order/processing');
}

export const deliveredOrders = () => {
    return api.get('/customer/order/delivered');
}
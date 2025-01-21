import React from "react";
import Input from "../../../../../utilities/minitiatures/Input/Input";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import Price from "../../../../../utilities/minitiatures/Price/Price";
import { useOrder, usePaymentMethod } from "../Order";
import { initOrderTransaction } from "../../../../../utilities/api/customer/actions";
import useToasts from "../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import usePagePreloader from "../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";

const OrderSummary = React.memo(() => {
    const order = useOrder()!;
    const paymentMethod = usePaymentMethod();
    const toasts = useToasts();
    const pagePreloader = usePagePreloader();

    const paymentTax = React.useMemo(() => 0, []);

    const total = React.useMemo(() => (order.total_price + paymentTax), [order.total_price, paymentTax]);

    const handleOrder = React.useCallback(() => {
        pagePreloader.enable();
        initOrderTransaction({
            order_id: order.id,
            method: paymentMethod.current,
        })
            .then(response => {
                if (response.data?.payment_url) {
                    location.href = response.data.payment_url;
                }
            })
            .catch(() => {
                toasts.push({
                    title: "Une erreur s'est produite",
                    content: "Impossible d'obtenir le lien de paiement, veuillez réessayer plus tard",
                    type: "danger"
                });
            })
            .finally(() => {
                pagePreloader.disable();
            });
    }, [toasts, pagePreloader]);

    return <div className="order-summary-container">
        <div>
            <Input type="text" placeholder="Coupon" />
        </div>
        <div className="order-details">
            <div className="order-detail-item">
                <h6 className="">Sous-total</h6>
                <Price amount={order.total_price} />
            </div>
            <div className="order-detail-item">
                <h6 className="">Taxes de paiement</h6>
                <Price amount={paymentTax} />
            </div>
        </div>
        <div className="order-total">
            <h6>Total</h6>
            <Price amount={total} />
        </div>
        <Button
            type="button"
            className="btn btn-primary"
            onClick={handleOrder}>
            Payer
        </Button>
    </div>
})

export default OrderSummary;
import React from "react";
import Items from "../Items/Items";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import OrderSummary from "./OrderSummary/OrderSummary";
import Loading from "../../../../utilities/minitiatures/Loading/Loading";
import { useParams } from "react-router-dom";
import { getOrder } from "../../../../utilities/api/actions";
import * as Types from "../../../../utilities/constants/types";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import { useRedirect } from "../../../../utilities/hooks/useRedirect";

export const ORANGEMONEY = "ORANGEMONEY";
export const MVOLA = "MVOLA";
export const AIRTELMONEY = "AIRTELMONEY";

type PaymentMethod = typeof ORANGEMONEY | typeof MVOLA | typeof AIRTELMONEY;

const OrderContext = React.createContext({
    paymentMethod: {
        setCurrent: (method: PaymentMethod) => { method },
        current: ORANGEMONEY as PaymentMethod
    },
    order: null as Types.Order | null,
});

export const usePaymentMethod = () => {
    return React.useContext(OrderContext).paymentMethod;
}

export const useOrder = () => {
    return React.useContext(OrderContext).order;
}

const Order = React.memo(() => {
    const redirect = useRedirect(true);
    const orderId = useParams().id;

    const [state, setState] = React.useState({
        paymentMethod: {
            current: ORANGEMONEY as PaymentMethod,
        },
        order: null as Types.Order | null,
    });

    const paymentMethod = React.useMemo(() => ({
        current: state.paymentMethod.current,
        setCurrent: (method: PaymentMethod) => {
            setState(s => ({ ...s, paymentMethod: { ...s.paymentMethod, current: method } }));
        }
    }), [state.paymentMethod.current]);

    const getOrderInfo = React.useCallback(() => {
        if (orderId) {
            getOrder(orderId)
                .then((response) => {
                    const order = response.data.order as Types.Order;

                    if (order.transaction?.status === "SUCCESS") {
                        redirect();
                    } else {
                        setState(s => ({ ...s, order }));
                    }
                })
                .catch(() => {
                    redirect();
                })
        } else {
            redirect();
        }
    }, [orderId]);

    React.useEffect(() => {
        if (!state.order) {
            getOrderInfo();
        }
    }, [state.order, getOrderInfo]);

    return <OrderContext.Provider value={{ paymentMethod, order: state.order }}>
        <Loading show={!state.order} />
        <Fade className="order-container container" show={Boolean(state.order)}>
            <div className="col-8">
                <PaymentMethod />
                {state.order &&
                    <Items
                        order={state.order}
                        className="order-section"/>}
            </div>
            <div className="col-3">
                <OrderSummary />
            </div>
        </Fade>
    </OrderContext.Provider>
})

export default Order;
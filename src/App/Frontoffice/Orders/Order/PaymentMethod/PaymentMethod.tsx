import React from "react";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import mvola from '../../../../../assets/icons/Mvola.png';
import orangeMoney from '../../../../../assets/icons/orange-money.jpeg';
import airtelMoney from '../../../../../assets/icons/airtel-money.png';
import { AIRTELMONEY, MVOLA, ORANGEMONEY, usePaymentMethod } from "../Order";

const PaymentMethod = React.memo(() => {
    const { setCurrent, current } = usePaymentMethod();

    return <div className="payment-method-container order-section">
        <h5 className="order-section-title">Méthode de paiement</h5>
        <form className="payment-method-form">
            <label className={`${current === ORANGEMONEY && 'active'}`}>
                <input
                    type="radio"
                    name="payment-method"
                    value={ORANGEMONEY}
                    onChange={() => setCurrent(ORANGEMONEY)}
                    checked={current === ORANGEMONEY} />

                <SquaredImage image={orangeMoney} />
                <div className="">Orange Money</div>
            </label>
            <label className={`${current === MVOLA && 'active'}`}>
                <input
                    type="radio"
                    name="payment-method"
                    value={MVOLA}
                    onChange={() => setCurrent(MVOLA)}
                    checked={current === MVOLA} />
                    
                <SquaredImage image={mvola} />
                <div className="">Mvola</div>
            </label>
            <label className={`${current === AIRTELMONEY && 'active'}`}>
                <input
                    type="radio"
                    name="payment-method"
                    value={AIRTELMONEY}
                    onChange={() => setCurrent(AIRTELMONEY)}
                    checked={current === AIRTELMONEY} />

                <SquaredImage image={airtelMoney} />
                <div className="">Airtel Money</div>
            </label>
        </form>
    </div>
});

export default PaymentMethod;
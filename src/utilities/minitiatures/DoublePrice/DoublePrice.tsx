import React from "react";
import Price from "../Price/Price";

type Props = {
    firstPrice: number,
    secondPrice?: number,
    className?: string,
}

const DoublePrice = React.memo((props: Props) => {
    const { firstPrice, secondPrice, className = '' } = props;

    return <>
        {secondPrice ? <div className={`d-flex gap-2 ${className}`}>
            <Price amount={firstPrice} className="product-price" dashed />
            <Price amount={secondPrice} className="product-price" />
        </div> :
            <Price amount={firstPrice} className={`product-price ${className}`} />}
    </>
})

export default DoublePrice;
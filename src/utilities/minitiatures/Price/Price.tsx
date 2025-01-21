import React from "react";

type Props = {
    amount: number,
    className?: string,
    dashed?: boolean,
}

const Price = React.memo((props: Props) => {
    const {amount, className = '', dashed} = props;
    return <span className={`price-container ${dashed && 'dashed'}   ${className}`}>
        {amount.toLocaleString('fr-Fr')} <small>Ariary</small>
    </span>
})

export default Price;
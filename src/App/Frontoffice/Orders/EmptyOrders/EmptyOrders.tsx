import React from "react";
import emptyOrders from './empty-orders.png';
import Fade from "../../../../utilities/minitiatures/Fade/Fade";

type Props = {
    show: boolean,
    className?: string,
}

const EmptyOrders = React.memo((props: Props) => {
    const { className = '', ...fadeProps } = props;

    return <Fade className={`orders-empty-container ${className}`} {...fadeProps}>
        <img src={emptyOrders} />
        <h6 className="display-6">Aucune commande trouvée !</h6>
    </Fade>
});

export default EmptyOrders;
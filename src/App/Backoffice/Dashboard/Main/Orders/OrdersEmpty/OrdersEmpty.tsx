import React from "react";
import emptyBox from './empty-box.png';
import Fade from "../../../../../../utilities/minitiatures/Fade/Fade";

type Props = {
    show: boolean,
}

const OrdersEmpty = React.memo((props: Props) => {

    return <Fade className="page-empty-container" show={props.show}>
        <img src={emptyBox} />
        <div className="display-6">
            Aucune commande trouvée
        </div>
    </Fade>
});

export default OrdersEmpty;
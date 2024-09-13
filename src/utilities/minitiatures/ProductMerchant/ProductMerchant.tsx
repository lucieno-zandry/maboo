import React from "react";
import { User } from "../../constants/types";
import { Link } from "react-router-dom";
import RoundedImage from "../RoundedImage/RoundedImage";
import appImage from "../../helpers/appImage";
import maboo from "../../../assets/icons/maboo.png";

type Props = {
    merchant: User,
    className?: string,
    showImage?:boolean,
}

const ProductMerchant = React.memo((props: Props) => {
    const { merchant, className = '', showImage = true} = props;
    const elementClassName = React.useMemo(() => `d-flex align-items-center gap-2 ${className}`, [className]);

    if (merchant.type === 'SELLER') {
        return <Link to={`/seller/${merchant.id}`} className={elementClassName}>
            {showImage && <RoundedImage image={appImage(merchant.image)} />}  
            {merchant.name} {merchant.firstname}
        </Link>
    } else {
        return <div className={elementClassName}>
            {showImage && <RoundedImage image={maboo} />}
             Ma boo <i className="fa fa-check-circle text-primary"></i>
        </div>
    }
})

export default ProductMerchant;
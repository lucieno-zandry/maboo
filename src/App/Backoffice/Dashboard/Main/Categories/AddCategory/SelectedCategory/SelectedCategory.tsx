import React from "react";
import { Category } from "../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import appImage from "../../../../../../../utilities/helpers/appImage";

type Props = {
    category: Category | null,
}

const SelectedCategory = React.memo((props: Props) => {
    const { category } = props;

    return <div className="selected-category-container">
        {category ? <>
            <Checkbox label={''} defaultChecked disabled />
            <RoundedImage image={appImage(category?.image)} />
            <div>{category?.name}</div>
        </> : <>
            <i className="fa fa-xmark-circle"></i>
            <div>Non défini</div>
        </>}
    </div>
})

export default SelectedCategory;
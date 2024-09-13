import React from "react";
import { ProductVariant } from "../../../../../../../../utilities/constants/types";
import Edit from "./Edit/Edit";
import Default from "./Default/Default";

type Props = {
    variant: ProductVariant,
}

export type PartialsProps = {
    variant: ProductVariant,
    toggleEditMode: () => void,
}

const VariantItem = React.memo((props: Props) => {

    const { variant } = props;

    const [state, setState] = React.useState({
        editMode: false,
    });

    const toggleEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editMode: !s.editMode }));
    }, []);

    return <tr className="variant-item">
        {state.editMode ?
            <Edit
                variant={variant}
                toggleEditMode={toggleEditMode} /> :

            <Default
                variant={variant}
                toggleEditMode={toggleEditMode}
            />}
    </tr>
});

export default VariantItem;
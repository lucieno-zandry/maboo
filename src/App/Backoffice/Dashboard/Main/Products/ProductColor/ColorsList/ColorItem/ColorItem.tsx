import React from "react";
import { ProductColor } from "../../../../../../../../utilities/constants/types";
import Edit from "./Edit/Edit";
import Default from "./Default/Default";

type Props = {
    color: ProductColor,
}

export type PartialsProps = {
    color: ProductColor,
    toggleEditMode: () => void,
}

const ColorItem = React.memo((props: Props) => {

    const { color } = props;

    const [state, setState] = React.useState({
        editMode: false,
    });

    const toggleEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editMode: !s.editMode }));
    }, []);

    return <tr className="color-item">
        {state.editMode ?
            <Edit
                color={color}
                toggleEditMode={toggleEditMode} /> :

            <Default
                color={color}
                toggleEditMode={toggleEditMode}
            />}
    </tr>
});

export default ColorItem;
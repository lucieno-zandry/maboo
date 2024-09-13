import React from "react";
import { PartialsProps } from "../ColorItem";
import { useDeleteProductColor } from "../../../ProductColor";
import { Dropdown } from "react-bootstrap";
import ColorBubble from "../../../../../../../../../utilities/minitiatures/ColorBubble/ColorBubble";

const Default = React.memo((props: PartialsProps) => {
    const { color, toggleEditMode } = props;
    const deleteProductColors = useDeleteProductColor();

    return <>
        <td>
            <ColorBubble color={color.code} />
        </td>
        <td className="color-item-name">
            {color.name}
        </td>
        <td>
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={toggleEditMode}>
                        <i className="fa fa-pencil"></i> Modifier
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-danger"
                        onClick={() => deleteProductColors.setCurrents([color])}>
                        supprimer
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </>
})

export default Default;
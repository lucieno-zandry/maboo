import React from "react";
import { User } from "../../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import appImage from "../../../../../../../../utilities/helpers/appImage";
import { Dropdown } from "react-bootstrap";
import Checkbox from "../../../../../../../../utilities/minitiatures/Checkbox/Checkbox";

type Props = {
    seller: User,
    addToSelection: Function,
    removeFromSelection: Function,
    validate: Function,
    selected: User[] | null,
}

const SellerRequestRow = (props: Props) => {
    const { seller, addToSelection, removeFromSelection, selected, validate } = props;

    const handleSelection = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            addToSelection(seller);
        } else {
            removeFromSelection(seller.id);
        }
    }, [seller]);

    return <tr>
        {selected &&
            <td>
                <Checkbox
                    label=""
                    checked={selected.some(request => request.id === seller.id)}
                    onChange={handleSelection}
                />
            </td>}
        <td>
            <RoundedImage image={appImage(seller.image) || undefined} />
        </td>
        <td>{seller.name}</td>
        <td>{seller.firstname}</td>
        <td >{seller.email}</td>
        <td >{new Date(seller.created_at).toLocaleDateString()}</td>
        <td className="text-align-center">
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => validate(seller)}>
                        <i className="fa fa-check-circle"></i> Valider
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
}

export default SellerRequestRow;
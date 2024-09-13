import React from "react";
import { User } from "../../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import appImage from "../../../../../../../../utilities/helpers/appImage";
import { Dropdown } from "react-bootstrap";
import Checkbox from "../../../../../../../../utilities/minitiatures/Checkbox/Checkbox";

type Props = {
    admin: User,
    addToSelection: Function,
    removeFromSelection: Function,
    validate: Function,
    selected: User[] | null,
}

const AdminRequestRow = (props: Props) => {
    const { admin, addToSelection, removeFromSelection, selected, validate } = props;

    const handleSelection = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            addToSelection(admin);
        } else {
            removeFromSelection(admin.id);
        }
    }, [admin]);

    return <tr>
        {selected &&
            <td>
                <Checkbox
                    label=""
                    checked={selected.some(request => request.id === admin.id)}
                    onChange={handleSelection}
                />
            </td>}
        <td>
            <RoundedImage image={appImage(admin.image) || undefined} />
        </td>
        <td>{admin.name}</td>
        <td>{admin.firstname}</td>
        <td >{admin.email}</td>
        <td >{new Date(admin.created_at).toLocaleDateString()}</td>
        <td className="text-align-center">
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => validate(admin)}>
                        <i className="fa fa-check-circle"></i> Valider
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
}

export default AdminRequestRow;
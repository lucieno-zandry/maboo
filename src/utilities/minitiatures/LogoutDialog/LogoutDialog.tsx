import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../utilities/minitiatures/Button/Button";
import useAuth from "../../../utilities/hooks/useAuth";
import userType from "../../helpers/userType";

type Props = {
    show: boolean,
    toggle: () => void;
}

const LogoutDialog = React.memo((props: Props) => {
    const { show, toggle } = props;
    const { setAuth} = useAuth();

    const handleLogout = React.useCallback(() => {
        localStorage.removeItem(`${userType()}Token`);
        setAuth(false)
        toggle();
    }, [toggle]);

    return <Modal show={show} onHide={toggle} centered className="logout-dialog-container">
        <Modal.Header>
            <Modal.Title>
                <h5 className="logout-dialog-title">
                    Déconnexion
                </h5>
                <p className="text-muted m-0">Vous aurez besoin de vous reconnecter sur cet appareil.</p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button
                type="button"
                className="btn btn-sm"
                onClick={toggle}>annuler</Button>
            <Button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleLogout}>
                <i className="fa fa-power-off"></i> Se déconnecter
            </Button>
        </Modal.Footer>
    </Modal>
})

export default LogoutDialog;
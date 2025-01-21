import React from "react";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { Modal } from "react-bootstrap";
import AddProductBody from "./AddProductBody/AddProductBody";

const AddProduct = React.memo(() => {
    const [state, setState] = React.useState({
        show: false,
    });

    const setShow = React.useCallback((show: boolean) => {
        setState(s => ({ ...s, show }));
    }, []);

    return <div className="add-product-container">
        <Button
            type="button"
            className="btn btn-secondary add-product"
            onClick={() => setShow(true)}><i className="fa fa-plus"></i> Ajouter
        </Button>

        <Modal show={state.show} onHide={() => setShow(false)} size="xl" centered>
            <AddProductBody setShow={setShow} />
        </Modal>
    </div>
})

export default AddProduct;
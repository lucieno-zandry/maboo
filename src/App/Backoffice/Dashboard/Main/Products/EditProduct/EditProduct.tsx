import React from "react";
import { useEditProduct } from "../Products";
import { Modal } from "react-bootstrap";
import EditProductBody from "./EditProductBody/EditProductBody";

const EditProduct = React.memo(() => {
    const edit = useEditProduct();

    return <Modal
        show={Boolean(edit.current)}
        className="edit-product-container"
        centered size="xl"
        onHide={() => edit.setCurrent(null)}>
        <EditProductBody />
    </Modal>
})

export default EditProduct;
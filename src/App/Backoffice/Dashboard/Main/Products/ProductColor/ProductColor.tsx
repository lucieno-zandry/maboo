import React from "react";
import { Modal } from "react-bootstrap";
import { useColor } from "../Products";
import * as Types from "../../../../../../utilities/constants/types";
import ColorsList from "./ColorsList/ColorsList";
import AddColor from "./AddColor/AddColor";
import DeleteColorsDialogue from "./DeleteColorsDialogue/DeleteColorsDialogue";

const ProductColorContext = React.createContext({
    onDelete: {
        currents: [] as Types.ProductColor[],
        setCurrents: (currents: Types.ProductColor[]) => { currents }
    }
})

export const useDeleteProductColor = () => {
    return React.useContext(ProductColorContext).onDelete;
}

const ProductColor = React.memo(() => {
    const color = useColor();

    const [state, setState] = React.useState({
        onDelete: {
            currents: [] as Types.ProductColor[],
        }
    });

    const onDelete = React.useMemo(() => ({
        currents: state.onDelete.currents,
        setCurrents: (productColors: Types.ProductColor[]) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, currents: productColors } }))
        }
    }), [state.onDelete.currents]);

    return <ProductColorContext.Provider value={{ onDelete }}>
        <Modal
            show={Boolean(color.current)}
            onHide={() => color.setCurrent(null)}
            size="xl">
            <Modal.Body>
                <ColorsList />
                <AddColor />
            </Modal.Body>
        </Modal>
        <DeleteColorsDialogue />
    </ProductColorContext.Provider>
});

export default ProductColor;
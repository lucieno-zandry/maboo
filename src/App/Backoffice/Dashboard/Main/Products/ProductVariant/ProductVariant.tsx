import React from "react";
import { Modal } from "react-bootstrap";
import { useVariant } from "../Products";
import VariantsList from "./VariantsList/VariantsList";
import AddVariant from "./AddVariant/AddVariant";
import * as Types from "../../../../../../utilities/constants/types";
import DeleteVariantsDialogue from "./DeleteVariantsDialogue/DeleteVariantsDialogue";

const ProductVariantContext = React.createContext({
    onDelete: {
        currents: [] as Types.ProductVariant[],
        setCurrents: (currents: Types.ProductVariant[]) => { currents }
    }
})

export const useDeleteProductVariant = () => {
    return React.useContext(ProductVariantContext).onDelete;
}

type ProductVariantProviderProps = {
    children: React.ReactNode,
}

export const ProductVariantProvider = React.memo((props: ProductVariantProviderProps) => {
    const { children } = props;

    const [state, setState] = React.useState({
        onDelete: {
            currents: [] as Types.ProductVariant[],
        }
    });

    const onDelete = React.useMemo(() => ({
        currents: state.onDelete.currents,
        setCurrents: (productVariants: Types.ProductVariant[]) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, currents: productVariants } }))
        }
    }), [state.onDelete.currents]);

    return <ProductVariantContext.Provider value={{ onDelete }}>
        {children}
    </ProductVariantContext.Provider>
});

const ProductVariant = React.memo(() => {
    const variant = useVariant();

    return <ProductVariantProvider>
        <Modal
            show={Boolean(variant.current)}
            onHide={() => variant.setCurrent(null)}
            size="xl">
            <Modal.Body>
                <VariantsList />
                <AddVariant />
            </Modal.Body>
        </Modal>
        <DeleteVariantsDialogue />
    </ProductVariantProvider>
});

export default ProductVariant;

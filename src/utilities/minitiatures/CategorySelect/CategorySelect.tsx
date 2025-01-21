import React from "react";
import { Modal } from "react-bootstrap";
import { Category } from "../../constants/types";
import randomString from "../../helpers/randomString";
import RoundedImage from "../RoundedImage/RoundedImage";
import appImage from "../../helpers/appImage";
import getParentCategory from "../../helpers/getParentCategory";
import Button from "../Button/Button";
import { GlobalsContext } from "../../globals/GlobalsProvider";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import CategoriesEmpty from "../../../App/Backoffice/Dashboard/Main/Categories/CategoriesEmpty/CategoriesEmpty";

type OnFinish = (selected: Category | null) => void;

export const defaultCategorySelect = {
    open: (onFinish: OnFinish, defaultCheckedId?: number | null, exceptIds?: number[] | null) => {
        onFinish;
        defaultCheckedId;
        exceptIds;
    },
}

const DEFAULTSTATE = {
    show: false,
    onFinish: (selected: Category | null) => { selected },
    exceptIds: null as number[] | null,
    defaultCheckedId: null as number | null,
    selected: null as Category | null,
}

const CategorySelect = React.memo(() => {
    const { categorySelectRef } = React.useContext(GlobalsContext);
    const [state, setState] = React.useState(DEFAULTSTATE);

    const { categories } = useSelector((state: Rootstate) => state.backoffice);

    const { show, defaultCheckedId, exceptIds, onFinish, selected } = state;

    const open = React.useCallback((onFinish: OnFinish, defaultCheckedId?: number | null, exceptIds?: number[] | null) => {
        setState(s => ({
            ...s,
            show: true,
            onFinish,
            defaultCheckedId: defaultCheckedId || null,
            exceptIds: exceptIds || null
        }));
    }, []);

    const handleChange = React.useCallback((category: Category | null) => {
        setState(s => ({ ...s, selected: category }));
    }, []);

    const handleFinish = React.useCallback(() => {
        onFinish(selected);
        setState(() => DEFAULTSTATE);
    }, [selected, onFinish]);

    React.useEffect(() => {
        categorySelectRef.current = {
            open
        }
    }, [open]);

    return <Modal show={show} onHide={handleFinish} centered size="lg" className="category-select-container nth-modal">
        <Modal.Header closeButton>
            <Modal.Title>Séléctionner une catégorie</Modal.Title>
        </Modal.Header>
        {(categories && categories.length > 0) &&
            <Modal.Body as='ul'>
                <li>
                    <input type="radio" name="category" id="not-assigned" onChange={() => handleChange(null)} defaultChecked={!defaultCheckedId} />
                    <label htmlFor="not-assigned" className="category-select-label" >
                        <div> Non assignée</div>
                    </label>
                </li>
                {categories.map((category, key) => {
                    if (!exceptIds?.includes(category.id)) {
                        const htmlId = randomString();

                        return <li key={key}>
                            <input type="radio" onChange={() => handleChange(category)} id={htmlId} name="category" defaultChecked={defaultCheckedId === category.id} />
                            <label htmlFor={htmlId} className="category-select-label" >
                                <RoundedImage image={appImage(category.image)} />
                                <div> {category.name}</div>
                                <div><small>parent: </small> {getParentCategory(category, categories)?.name || 'non défini'}</div>
                            </label>
                        </li>
                    }
                })}
            </Modal.Body>
        }
        {categories && categories.length === 0 && <Modal.Body>
            <CategoriesEmpty />
        </Modal.Body>}
        <Modal.Footer>
            <Button
                type="button"
                className="btn btn-primary"
                onClick={handleFinish}>
                <i className="fa fa-check"></i> Séléctionner
            </Button>
        </Modal.Footer>
    </Modal>
});

export default CategorySelect;
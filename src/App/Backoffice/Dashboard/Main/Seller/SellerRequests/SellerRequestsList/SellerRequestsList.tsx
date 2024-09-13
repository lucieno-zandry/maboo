import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import SellerRequestRow from "./SellerRequestRow/SellerRequestRow";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import { User } from "../../../../../../../utilities/constants/types";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { validateUser } from "../../../../../../../utilities/api/admin/actions";
import usePagePreloader from "../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { refreshSellerRequests } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useFilterRow } from "../../../../../../../utilities/hooks/admin/useFilterRow";

const SellerRequestsList = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.backoffice.seller);
    const pagePreloader = usePagePreloader();
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();
    const filterRow = useFilterRow();

    const [state, setState] = React.useState({
        selected: null as User[] | null,
        loading: false,
    });

    const toggleSelection = React.useCallback(() => {
        setState(s => ({ ...s, selected: s.selected ? null : [] }));
    }, []);

    const addToSelection = React.useCallback((seller: User) => {
        setState(s => {
            const state = { ...s };
            if (state.selected) {
                state.selected.push(seller);
            }
            return state;
        })
    }, []);

    const removeFromSelection = React.useCallback((id: number) => {
        setState(s => {
            const state = { ...s };
            if (state.selected) {
                state.selected = state.selected.filter(seller => seller.id !== id);
            }
            return state;
        })
    }, []);

    const handleSelectAll = React.useCallback(() => {
        setState(s => {
            const state = { ...s };
            if ((state.selected && requests) && (state.selected.length < requests.length)) {
                state.selected = requests;
            } else {
                state.selected = [];
            }
            return state;
        });
    }, []);

    const validate = React.useCallback((seller?: User) => {
        let ids = [] as number[];

        if (state.selected) {
            ids = state.selected.map(seller => seller.id);
        } else if (seller) {
            ids = [seller.id];
        }

        if (ids.length > 0) {
            setState(s => ({ ...s, loading: true }));
            pagePreloader.enable();
            const newState = { ...state };

            validateUser(ids)
                .then(() => {
                    toggleSelection();
                    dispatch(refreshSellerRequests());
                    newState.selected = null;

                    toasts.push({
                        title: "Vendeurs validés!",
                        content: "La liste de demandes des vendeurs en attente a été mise à jour",
                        type: "success"
                    });
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de valider les vendeurs!",
                        content: "Une erreur est sourvenue lors de la validation des vendeurs, veuillez réessayer plus tard.",
                        type: "danger",
                    });
                })
                .finally(() => {
                    pagePreloader.disable();

                    newState.loading = false;
                    setState(newState);
                });
        }
    }, [toasts.push, pagePreloader, state]);

    return <table className="seller-requests-list-container table table-striped table-hover">
        <thead>
            <tr>
                {state.selected &&
                    <th className="col-1">
                        <Checkbox
                            label="Tout"
                            checked={state.selected.length === requests?.length}
                            onChange={handleSelectAll} />
                    </th>}
                <th></th>
                <th>Nom</th>
                <th>Prénom(s)</th>
                <th>Email</th>
                <th>Depuis</th>
                <th>
                    {state.selected ?
                        <Button
                            className="btn btn-primary"
                            onClick={() => validate()}
                            disabled={!Boolean(state.selected)}
                            options={{ loading: state.loading }}>
                            <i className="fa fa-check-circle"></i> valider
                        </Button> :

                        <Button className="btn btn-outline-dark btn-sm"
                            onClick={toggleSelection}>
                            Séléctionner
                        </Button>}
                </th>
            </tr>
        </thead>
        <tbody>
            {requests?.map(seller => {
                const row = <SellerRequestRow
                    key={seller.id}
                    seller={seller}
                    addToSelection={addToSelection}
                    removeFromSelection={removeFromSelection}
                    selected={state.selected}
                    validate={validate} />

                return filterRow([
                    seller.name,
                    seller.phone_number,
                    seller.email,
                    seller.firstname,
                    seller.adress,
                ], row);
            })}
        </tbody>
    </table>
});

export default SellerRequestsList;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import AdminRequestRow from "./AdminRequestRow/AdminRequestRow";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import { User } from "../../../../../../../utilities/constants/types";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { validateUser } from "../../../../../../../utilities/api/admin/actions";
import usePagePreloader from "../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { refreshAdminRequests } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useFilterRow } from "../../../../../../../utilities/hooks/admin/useFilterRow";

const AdminRequestsList = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.backoffice.admin);
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

    const addToSelection = React.useCallback((admin: User) => {
        setState(s => {
            const state = { ...s };
            if (state.selected) {
                state.selected.push(admin);
            }
            return state;
        })
    }, []);

    const removeFromSelection = React.useCallback((id: number) => {
        setState(s => {
            const state = { ...s };
            if (state.selected) {
                state.selected = state.selected.filter(admin => admin.id !== id);
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

    const validate = React.useCallback((admin?: User) => {
        let ids = [] as number[];

        if (state.selected) {
            ids = state.selected.map(admin => admin.id);
        } else if (admin) {
            ids = [admin.id];
        }

        if (ids.length > 0) {
            setState(s => ({ ...s, loading: true }));
            pagePreloader.enable();
            const newState = { ...state };

            validateUser(ids)
                .then(() => {
                    toggleSelection();
                    dispatch(refreshAdminRequests());
                    newState.selected = null;

                    toasts.push({
                        title: "Administrateurs validés!",
                        content: "La liste de demandes des administrateurs en attente a été mise à jour",
                        type: "success"
                    });
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de valider les administrateurs!",
                        content: "Une erreur est sourvenue lors de la validation des administrateurs, veuillez réessayer plus tard.",
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

    return <table className="admin-requests-list-container table table-striped table-hover">
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
            {requests?.map(admin => {
                const row = <AdminRequestRow
                    key={admin.id}
                    admin={admin}
                    addToSelection={addToSelection}
                    removeFromSelection={removeFromSelection}
                    selected={state.selected}
                    validate={validate} />

                return filterRow([
                    admin.email,
                    admin.firstname,
                    admin.name,
                    admin.adress,
                    admin.phone_number,
                ], row);
            })}
        </tbody>
    </table>
});

export default AdminRequestsList;
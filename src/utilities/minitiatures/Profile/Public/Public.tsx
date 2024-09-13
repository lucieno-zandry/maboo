import React from "react";
import FormFloating from "../../FormFloating/FormFloating";
import { User } from "../../../constants/types";
import handleInputBlur from "../../../helpers/handleInputBlur";
import getFormData from "../../../helpers/getFormData";
import getValidationMessages from "../../../helpers/getValidationMessages";
import Button from "../../Button/Button";
import { updateUser } from "../../../api/actions";
import { AxiosError } from "axios";
import changedDataOnly from "../../../helpers/changedDataOnly";
import truthyEntriesOnly from "../../../helpers/truthyEntriesOnly";
import useToasts from "../../Toast/hooks/useToasts";
import Fade from "../../Fade/Fade";
import useAuth from "../../../hooks/useAuth";
import useRefreshAuth from "../../../hooks/useRefreshAuth";

type PublicData = {
    email?: string,
    name?: string,
    firstname?: string,
}

const Public = React.memo(() => {
    const user = useAuth().auth as User;
    const refreshAuth = useRefreshAuth();

    const toasts = useToasts();

    const [state, setState] = React.useState({
        validationMessages: null as null | PublicData,
        loading: false,
        hasChanges: false,
    });

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e) as PublicData;
        const validationMessages = getValidationMessages<PublicData>(formData);
        const changedData = changedDataOnly(formData, user);

        setState(s => ({
            ...s, loading: !Boolean(validationMessages) && Boolean(changedData),
            validationMessages
        }));

        if (!validationMessages && changedData) {
            const newState = { ...state };
            updateUser(changedData)
                .then(() => {
                    newState.hasChanges = false;
                    refreshAuth();

                    toasts.push({
                        title: "Modifications réussies!",
                        content: "Vos informations ont été mises à jours avec succès.",
                        type: "success"
                    });
                })
                .catch((error: AxiosError) => {
                    const { errors } = error.response?.data as { errors: null };
                    if (errors) {
                        newState.validationMessages = errors;
                    }
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                });
        } else if (!changedData) {
            setState(s => ({ ...s, hasChanges: false }));
        }
    }, [state, user, toasts.push]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof User;
        const { value } = e.target;

        const callback = (validationMessages: PublicData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages, hasChanges: true }));
        }

        if (value !== user[name]) {
            handleInputBlur(e, callback);
        }
    }, [user, state.validationMessages]);

    return <form className="public-container" onSubmit={handleSubmit}>
        <FormFloating
            type="text"
            name="name"
            id="name"
            placeholder="nom"
            defaultValue={user.name}
            label={<><i className="fa fa-user-tie"></i> Nom</>}
            options={{
                error: state.validationMessages?.name,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            type="text"
            name="firstname"
            id="firstname"
            placeholder="nom"
            defaultValue={user.firstname}
            label={<><i className="fa fa-user"></i> Prénom</>}
            options={{
                error: state.validationMessages?.firstname,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            type="email"
            name="email"
            id="email"
            placeholder="email"
            defaultValue={user.email}
            label={<><i className="fa fa-envelope"></i> Email</>}
            options={{
                error: state.validationMessages?.email,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <Fade
            className="d-flex justify-content-end col-12"
            show={state.hasChanges}>
            <Button
                type="submit"
                className="btn btn-secondary"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                <i className="fa fa-check"></i> Enregistrer
            </Button>
        </Fade>
    </form>
});

export default Public;
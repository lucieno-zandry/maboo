import React from "react";
import FormFloating from "../../../../utilities/minitiatures/FormFloating/FormFloating";
import { User } from "../../../../utilities/constants/types";
import handleInputBlur from "../../../../utilities/helpers/handleInputBlur";
import getFormData from "../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../utilities/helpers/getValidationMessages";
import Button from "../../../../utilities/minitiatures/Button/Button";
import { changePassword } from "../../../../utilities/api/actions";
import { AxiosError } from "axios";
import changedDataOnly from "../../../../utilities/helpers/changedDataOnly";
import truthyEntriesOnly from "../../../../utilities/helpers/truthyEntriesOnly";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import useAuth from "../../../../utilities/hooks/useAuth";
import useRefreshAuth from "../../../../utilities/hooks/useRefreshAuth";

type ConnectionData = {
    current_password?: string,
    password?: string,
    password_confirmation?: string
}

const Connection = React.memo(() => {
    const user = useAuth().auth as User;
    const refreshAuth = useRefreshAuth();

    const toasts = useToasts();

    const [state, setState] = React.useState({
        validationMessages: null as null | ConnectionData,
        loading: false,
        hasChanges: false,
    });

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e) as ConnectionData;
        const validationMessages = getValidationMessages<ConnectionData>(formData);
        const changedData = changedDataOnly(formData, user);

        setState(s => ({
            ...s, loading: !Boolean(validationMessages) && Boolean(changedData),
            validationMessages
        }));

        if (!validationMessages && changedData) {
            const newState = { ...state };
            changePassword(changedData)
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

        const callback = (validationMessages: ConnectionData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages, hasChanges: true }));
        }

        if (value !== user[name]) {
            handleInputBlur(e, callback);
        }
    }, [user, state.validationMessages]);

    return <form className="connection-container" onSubmit={handleSubmit}>
        <FormFloating
            type="password"
            name="current_password"
            id="current_password"
            placeholder="nom"
            defaultValue={user.name}
            label={<><i className="fa fa-user-lock"></i> Mot de passe actuel</>}
            options={{
                error: state.validationMessages?.current_password,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            type="password"
            name="password"
            id="password"
            placeholder="nom"
            label={<><i className="fa fa-lock"></i> Nouveau mot de passe</>}
            options={{
                error: state.validationMessages?.password,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="password_confirmation"
            label={<><i className="fa-light fa-lock"></i> <i className="fa-light fa-lock"></i> Confirmation</>}
            options={{
                error: state.validationMessages?.password_confirmation,
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

export default Connection;
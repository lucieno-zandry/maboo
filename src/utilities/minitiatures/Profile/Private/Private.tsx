import React from "react";
import FormFloating from "../../../../utilities/minitiatures/FormFloating/FormFloating";
import { User } from "../../../../utilities/constants/types";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import Button from "../../../../utilities/minitiatures/Button/Button";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import getFormData from "../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../utilities/helpers/getValidationMessages";
import changedDataOnly from "../../../../utilities/helpers/changedDataOnly";
import { updateUser } from "../../../../utilities/api/actions";
import { AxiosError } from "axios";
import truthyEntriesOnly from "../../../../utilities/helpers/truthyEntriesOnly";
import handleInputBlur from "../../../../utilities/helpers/handleInputBlur";
import PhoneNumberInput from "../../../../utilities/minitiatures/PhoneNumberInput/PhoneNumberInput";
import phoneNumberData from "../../../../utilities/helpers/phoneNumberData";
import useRefreshAuth from "../../../../utilities/hooks/useRefreshAuth";
import useAuth from "../../../../utilities/hooks/useAuth";

type PrivateData = {
    adress?: string,
    phone_number?: string,
}

const Private = React.memo(() => {
    const user = useAuth().auth as User;
    const refreshAuth = useRefreshAuth();
    const toasts = useToasts();

    const [state, setState] = React.useState({
        validationMessages: null as null | PrivateData,
        loading: false,
        hasChanges: false,
        phone_number: ''
    });

    const phoneNumberDatas = React.useMemo(() => phoneNumberData(user.phone_number), [user.phone_number]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e) as PrivateData;
        formData.phone_number = state.phone_number;

        const validationMessages = getValidationMessages<PrivateData>(formData);
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

        const callback = (validationMessages: PrivateData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages, hasChanges: true }));
        }

        if (value !== user[name]) {
            handleInputBlur(e, callback);
        }
    }, [user, state.validationMessages]);

    const handlePhoneNumberChange = React.useCallback((phoneNumber: string) => {
        setState(s => {
            let validationMessages = s.validationMessages;
            
            if (!validationMessages || Object.keys(validationMessages).length === 0) {
                validationMessages = null;
            } else {
                validationMessages?.phone_number && delete validationMessages.phone_number;
            }

            return {
                ...s,
                phone_number: phoneNumber,
                hasChanges: true,
                validationMessages
            }
        })
    }, []);

    return <form className="private-container" onSubmit={handleSubmit}>
        <PhoneNumberInput
            className="col-5"
            onChange={handlePhoneNumberChange}
            options={{ error: state.validationMessages?.phone_number }}
            defaultCountry={phoneNumberDatas.country}
            defaultValue={phoneNumberDatas.phoneNumber}
        />

        <FormFloating
            type="text"
            name="adress"
            id="adress"
            placeholder="nom"
            label={<><i className="fa fa-home"></i> Adresse</>}
            defaultValue={user.adress}
            options={{
                className: 'col-5  ',
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

export default Private;
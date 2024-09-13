import React from "react";
import useToasts from "../Toast/hooks/useToasts";
import getFormData from "../../helpers/getFormData";
import getValidationMessages from "../../helpers/getValidationMessages";
import { forgetPassword } from "../../api/actions";
import { AxiosError } from "axios";
import { Carousel } from "react-bootstrap";
import FormFloating from "../FormFloating/FormFloating";
import Button from "../Button/Button";
import handleInputBlur from "../../helpers/handleInputBlur";
import ResendEmailCountdown from "../ResendEmailCountdown/ResendEmailCountdown";
import truthyEntriesOnly from "../../helpers/truthyEntriesOnly";

type PasswordForgottenData = {
    email?: string
}

function sentMessage(email: string) {
    return `Un email a été envoyé à ${email}, veuillez consulter votre boîte de réception.`;
}

const PasswordForgotten = () => {
    const [state, setState] = React.useState({
        email: '',
        validationMessages: null as PasswordForgottenData | null,
        loading: false,
        activeStep: 0,
    });

    const toast = useToasts();

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = getFormData(e);
        const validationMessages = getValidationMessages<PasswordForgottenData>(formData);
        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));

        if (!validationMessages) {
            const newState = { ...state };

            forgetPassword(formData.email)
                .then(() => {
                    newState.email = formData.email;
                    newState.activeStep = 1;
                })
                .catch((error: AxiosError<any, any>) => {
                    if (error.response?.data.errors) {
                        newState.validationMessages = error.response.data.errors;
                    }
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                });
        }
    }, []);

    const resendEmail = React.useCallback(() => {
        forgetPassword(state.email)
            .then(() => {
                toast.push({
                    title: 'Requête envoyée!',
                    content: sentMessage(state.email),
                    type: "success"
                });
            })
            .catch(() => {
                toast.push({
                    title: 'Ma Boo a rencontré une erreur!',
                    content: `Une erreur s'est produite, veuillez réessayer plus tard`,
                    type: "danger"
                });
            });
    }, [state.email, toast.push]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: PasswordForgottenData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    return <Carousel
        activeIndex={state.activeStep}
        controls={false}
        indicators={false}>
        <Carousel.Item>
            <form className="password-forgotten-container" onSubmit={handleSubmit}>
                <p>Votre adresse email est requise pour réinitialiser votre mot de passe</p>
                <FormFloating
                    placeholder="email"
                    name='email'
                    onBlur={handleBlur}
                    options={{ error: state.validationMessages?.email }}
                    id="email"
                    label={<><i className="fa fa-envelope"></i> email</>}
                />
                <Button
                    type="submit"
                    className="btn btn-secondary"
                    options={{ loading: state.loading }}>Réinitialiser</Button>
            </form>
        </Carousel.Item>
        <Carousel.Item>
            <div className="password-forgotten-container text-align-center">
                <h5 className="display-6">Lien de réinitialisation de mot de passe envoyée.</h5>
                <p className="col-10  ">{sentMessage(state.email)}</p>
                <ResendEmailCountdown initConfirmation={resendEmail} />
            </div>
        </Carousel.Item>
    </Carousel>
}

export default PasswordForgotten;
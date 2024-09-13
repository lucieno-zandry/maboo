import React from "react";
import { makeEmailConfirmation, matchConfirmationCode } from "../../api/actions";
import { AxiosError } from "axios";
import CodeInput from "../CodeInput/CodeInput";
import ResendEmailCountdown from "../ResendEmailCountdown/ResendEmailCountdown";
import usePagePreloader from "../PagePreloader/hooks/usePagePreloader";
import useToasts from "../Toast/hooks/useToasts";
import useAuth from "../../hooks/useAuth";
import useRefreshAuth from "../../hooks/useRefreshAuth";

const Confirmation = () => {
    const user = useAuth().auth;
    const pagePreloader = usePagePreloader();
    const toasts = useToasts();
    const refreshAuth = useRefreshAuth();

    const [state, setState] = React.useState({
        error: ''
    });

    const sendEmail = React.useCallback(() => {
        makeEmailConfirmation()
            .catch(() => {
                toasts.push({
                    title: "Email non envoyé",
                    content: "Une erreur s'est produite lors de la tentative d'envoi d'email, veuillez réessayer plus tard",
                    type: "danger"
                });
            });
    }, [toasts.push]);

    React.useEffect(() => {
        if (user && !user.email_verified_at) sendEmail();
    }, [user, sendEmail]);

    const handleComplete = React.useCallback((code: string) => {
        pagePreloader.enable();
        matchConfirmationCode(code)
            .then(response => {
                if (response.data?.matched) {
                    refreshAuth();
                }
            })
            .catch((error: AxiosError<any, any>) => {
                const codeError = error.response?.data?.errors?.code || '';

                if (codeError) {
                    setState(s => ({ ...s, error: codeError }));
                }
            }).finally(() => {
                pagePreloader.disable();
            })
    }, []);

    if (user && !user.email_verified_at) {
        return <form className="confirmation-container">
            <label htmlFor="code-input-0">
                <h3 className="display-6 mb-1">Veuillez Confirmer votre email</h3>
                <p className="confirmation-message">
                    Nous avons envoyé un email à <span className="user-email  ">{user.email}</span>,
                    Veuillez consulter votre boite de réception.
                </p>
            </label>

            <CodeInput
                onComplete={handleComplete}
                length={6}
                error={state.error}
            />

            <ResendEmailCountdown initConfirmation={sendEmail} />
        </form>
    }
}

export default Confirmation;
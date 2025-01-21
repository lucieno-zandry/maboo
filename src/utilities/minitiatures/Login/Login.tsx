import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import FormFloating from "../FormFloating/FormFloating";
import getFormData from "../../helpers/getFormData";
import getValidationMessages from "../../helpers/getValidationMessages";
import storeToken from "../../helpers/storeToken";
import Button from "../Button/Button";
import handleInputBlur from "../../helpers/handleInputBlur";
import { AxiosError } from "axios";
import truthyEntriesOnly from "../../helpers/truthyEntriesOnly";
import useAuth from "../../hooks/useAuth";
import { login } from "../../api/actions";
import userType from "../../helpers/userType";
import links from "../../helpers/links";

type LoginData = {
    email?: string,
    password?: string,
};

const Login = React.memo(() => {
    const { setAuth } = useAuth();

    const [state, setState] = React.useState({
        validationMessages: null as null | LoginData,
        loading: false,
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: LoginData = getFormData(e);
        const validationMessages = getValidationMessages<LoginData>(formData);

        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));
        if (!validationMessages) {
            const newState = { ...state };
            login(formData)
                .then(response => {
                    const { token, user } = response.data;
                    storeToken(userType(), token);
                    setAuth(user);
                })
                .catch((error: AxiosError<{ errors: LoginData }, any>) => {
                    newState.validationMessages = error.response?.data.errors || null;
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                })
        }
    }, [state]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: LoginData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    return <form className="login-container" onSubmit={handleSubmit}>
        <FormFloating
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            label={<><i className="fa fa-envelope"></i> Email</>}
            options={{ error: state.validationMessages?.email }}
            onBlur={handleBlur}
            required />

        <FormFloating
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            label={<><i className="fa fa-lock"></i> Mot de passe</>}
            options={{ error: state.validationMessages?.password }}
            onBlur={handleBlur}
            required />

        <div className="actions">
            <Link to={links.signupPage} type="button"
                className="other-button btn">
                Je n'ai pas de compte
            </Link>
            <Button
                type="submit"
                className="btn main-button"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                Se connecter
            </Button>
        </div>

        <Link
            to={links.forgottenPassword}>Mot de passe oublié ?
        </Link>
    </form>
});

export default Login;
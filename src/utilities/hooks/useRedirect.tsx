import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import links from "../helpers/links";

type SessionIntended = { target: null | boolean, path: string }
const { authPage, emailConfirmation, loginPage, validationPage } = links;

const notApplicablePaths = [
    loginPage,
    authPage,
    emailConfirmation,
    validationPage,
];

function setSessionIntended(pathname: string, target: boolean) {
    const intended = {
        path: pathname,
        target
    }

    sessionStorage.setItem('intended', JSON.stringify(intended));
}

function getSessionIntended(): SessionIntended | null {
    const existingIntended: null | string = sessionStorage.getItem('intended');
    const sessionIntended: SessionIntended = existingIntended && JSON.parse(existingIntended);

    return sessionIntended;
}

export function useRedirect(target: boolean): Function {
    const location = useLocation();
    const navigate = useNavigate();

    const user = useAuth().auth;
    const sessionIntended = getSessionIntended();
    const shouldValidate: boolean = React.useMemo(() => Boolean(user && user.type !== "CUSTOMER"), [user]);

    const goToIntended = React.useCallback((path: string) => {
        sessionStorage.removeItem('intended');
        navigate(path);
    }, [navigate]);

    const redirect = useCallback(() => {
        if (sessionIntended?.target === !!user) {
            goToIntended(sessionIntended.path);
        } else {
            target ? navigate(loginPage) : navigate(authPage);
        }
    }, [sessionIntended, navigate, target, goToIntended]);

    useEffect(() => {
        if (!!user !== target && !notApplicablePaths.includes(location.pathname)) {
            setSessionIntended(location.pathname, target);
        }
    }, [target, location.pathname]);

    useEffect(() => {
        if (user) {
            if (user.email_verified_at === null) {
                if (location.pathname !== emailConfirmation) {
                    navigate(emailConfirmation);
                }
            } else if (shouldValidate && user.validated_at === null) {
                if (location.pathname !== validationPage) {
                    navigate(validationPage);
                }
            } else {
                if (location.pathname === emailConfirmation || location.pathname === validationPage) {
                    redirect();
                }
            }
        }

        if (!!user !== target) {
            redirect();
        }
    }, [user, location.pathname, target, redirect]);

    return redirect;
}
import React, { PropsWithChildren } from "react";
import { User } from "../constants/types";
import { AxiosResponse } from "axios";
import { getAuth } from "../api/actions";
import usePagePreloader from "../minitiatures/PagePreloader/hooks/usePagePreloader";

type Auth = null | false | User;

const DEFAULT_AUTH = null as Auth;
const DEFAULT_SET_AUTH = function (auth: false | User): void { auth };

const DEFAULT_VALUE = {
    auth: DEFAULT_AUTH,
    setAuth: DEFAULT_SET_AUTH,
}

const AuthContext = React.createContext(DEFAULT_VALUE);

const AuthProvider = React.memo((props: PropsWithChildren) => {
    const [auth, setAuth] = React.useState(DEFAULT_AUTH);
    const { children } = props;
    const pagePreloader = usePagePreloader();

    React.useEffect(() => {
        if (auth === null) {
            getAuth()
                .then((response: AxiosResponse) => {
                    setAuth(response.data.user);
                })
                .catch(() => {
                    setAuth(false);
                })
                .finally(() => {
                    pagePreloader.disable();
                });
        }
    }, [auth]);

    const value = React.useMemo(() => ({
        auth,
        setAuth
    }), [auth, setAuth]);

    return <AuthContext.Provider value={value}>
        {auth !== null && children}
    </AuthContext.Provider>
})

export { AuthProvider };

export default function () {
    return React.useContext(AuthContext)
}
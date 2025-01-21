import { getAuth } from "../api/actions";
import useAuth from "./useAuth";

export default function () {
    const { setAuth } = useAuth();

    return () => {
        getAuth()
            .then(response => {
                const { user } = response.data;
                setAuth(user);
            })
            .catch(() => {
                setAuth(false);
            })
    }
}
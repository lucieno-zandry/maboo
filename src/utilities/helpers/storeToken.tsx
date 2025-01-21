import { UserType } from "../constants/types";

const storeToken = (user: UserType, token: string) => {
    const tokenName = user.toLowerCase() + 'Token';
    localStorage.setItem(tokenName, token);
}

export default storeToken;
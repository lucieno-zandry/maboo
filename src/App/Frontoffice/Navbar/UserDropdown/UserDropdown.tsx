import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SmallText from "../../../../utilities/minitiatures/SmallText/SmallText";
import appImage from "../../../../utilities/helpers/appImage";
import { useLogout } from "../Navbar";
import Button from "../../../../utilities/minitiatures/Button/Button";
import useAuth from "../../../../utilities/hooks/useAuth";

const UserDropdown = React.memo(() => {
    const user = useAuth().auth;
    const logout = useLogout();

    const userProfile = React.useMemo(() => {
        if (user) {
            return <>
                {user.image ?
                    <img className="user-profile-image" src={appImage(user.image)} /> :
                    <span className="user-profile">
                        {user.name.charAt(0)}
                    </span>} <SmallText maxLength={6} isExtendable={false}>
                    {user.name}
                </SmallText>
            </>
        }
    }, [user]);

    const account = React.useMemo(() => <><i className="fa fa-user"></i> Compte</>, []);

    const authActions = React.useMemo(() => <>
        <Dropdown.Item as={Link} to={'/user/profile'}>
            <i className="fa fa-user"></i> Profil</Dropdown.Item>

        <Dropdown.Item as={Link} to={'/orders/list'}>
            <i className="fa-solid fa-cart-flatbed-boxes"></i> Commandes</Dropdown.Item>

        <Dropdown.Item
            as={Button}
            onClick={logout.toggle}
            type="button">
            <i className="fa fa-power-off"></i> Se déconnecter
        </Dropdown.Item>
    </>, [logout.toggle]);

    const guestActions = React.useMemo(() => <>
        <Dropdown.Item as={Link} to={'/auth/login'}>Se connecter</Dropdown.Item>
        <Dropdown.Item as={Link} to={'/auth/signup'}>S'inscrire</Dropdown.Item>
    </>, []);

    return <Dropdown className="user-dropdown">
        <Dropdown.Toggle variant="btn" className="btn-sm">
            {user ? userProfile : account}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {user ? authActions : guestActions}
        </Dropdown.Menu>
    </Dropdown>
})

export default UserDropdown;
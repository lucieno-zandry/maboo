import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SmallText from "../../../../../utilities/minitiatures/SmallText/SmallText";
import appImage from "../../../../../utilities/helpers/appImage";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import { useLogout } from "../Navbar";
import useAuth from "../../../../../utilities/hooks/useAuth";
import userType from "../../../../../utilities/helpers/userType";

const Actions = React.memo(() => {
    const logout = useLogout();

    return <>
        <Dropdown.Item as={Link} to={`/${userType()}/dashboard/user/profile`}>Profil</Dropdown.Item>
        <Dropdown.Item as={Button} onClick={logout.toggle}>
            <i className="fa fa-power-off"></i> Se déconnecter
        </Dropdown.Item>
    </>
});


const UserDropdown = React.memo(() => {
    const user = useAuth().auth;

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

    return <Dropdown className="user-dropdown">
        <Dropdown.Toggle variant="btn" className="btn-sm">
            {userProfile}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Actions />
        </Dropdown.Menu>
    </Dropdown>
})

export default UserDropdown;
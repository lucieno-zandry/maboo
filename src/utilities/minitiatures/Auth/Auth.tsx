import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../../../assets/icons/maboo.png';
import frontoffice from "./frontoffice.jpg";
import backoffice from "./backoffice.jpg";
import userType from "../../helpers/userType";

const options = [
    {
        value: 'customer',
        text: 'Client'
    },
    {
        value: 'seller',
        text: 'Vendeur'
    },
    {
        value: 'admin',
        text: 'Administrateur'
    },
]

const Auth = React.memo(() => {
    const dynamicLocation = useLocation();

    const leftSideImage = React.useMemo(() => {
        switch (userType()) {
            case 'customer':
                return frontoffice;

            default:
                return backoffice;
        }
    }, []);

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback((e) => {
        const { value } = e.target;
        const prefix = value === 'customer' ? '' : value;
        location.pathname = `${prefix}/auth/login`;
    }, []);

    const navigationShouldDisplay = React.useMemo(() => dynamicLocation.pathname.includes('login') || dynamicLocation.pathname.includes('signup'), [dynamicLocation.pathname])

    return <div className="auth-container">
        <div className="left-side p-3" style={{ backgroundImage: `url(${leftSideImage})` }}>
            <Link to={'/'}>
                <img
                    className="logo"
                    src={logo}
                    width={150}
                    height={75} />
            </Link>
        </div>
        <div className="right-side">
            <div className="dynamic gap-4">
                {navigationShouldDisplay &&
                    <div className="d-flex col-9 align-items-center">
                        <label htmlFor="select-user-type" className="col">
                            S'identifier en tant que :
                        </label>
                        <select
                            id="select-user-type"
                            className="form-select col"
                            defaultValue={userType()}
                            onChange={handleChange}>
                            {options.map((option, key) => {
                                const { value, text } = option;
                                return <option value={value} key={key}>{text}</option>
                            })}
                        </select>
                    </div>}
                <Outlet />
            </div>
        </div>
    </div>
});

export default Auth;
import React from "react";
import UserDropdown from "./UserDropdown/UserDropdown";
import NavItems from "./NavItems/NavItems";
import Search from "./Search/Search";
import { Link } from "react-router-dom";
import CartButton from "./Cart/CartButton";
import Notification from "../../../utilities/minitiatures/Notification/Notification";
import LogoutDialog from "../../../utilities/minitiatures/LogoutDialog/LogoutDialog";

const NavbarContext = React.createContext({
    logout: {
        show: false,
        toggle: () => { }
    }
})

export const useLogout = () => {
    return React.useContext(NavbarContext).logout;
}

const Navbar = React.memo(() => {
    const [state, setState] = React.useState({
        logout: {
            show: false,
        }
    });

    const logout = React.useMemo(() => ({
        show: state.logout.show,
        toggle: () => {
            setState(s => ({ ...s, logout: { ...s.logout, show: !s.logout.show } }));
        }
    }), [state.logout.show]);

    return <NavbarContext.Provider value={{ logout }}>
        <nav
            className="navbar navbar-expand-sm navbar-container navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Maboo</Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <NavItems />
                    <Search />
                    <Notification />
                    <CartButton />
                    <UserDropdown />
                    <LogoutDialog {...logout} />
                </div>
            </div>
        </nav>
    </NavbarContext.Provider>
})

export default Navbar;
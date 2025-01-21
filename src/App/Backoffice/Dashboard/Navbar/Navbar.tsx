import React from "react";
import UserDropdown from "./UserDropdown/UserDropdown";
import Search from "./Search/Search";
import Notification from "../../../../utilities/minitiatures/Notification/Notification";
import LogoutDialog from "../../../../utilities/minitiatures/LogoutDialog/LogoutDialog";

const NavbarContext = React.createContext({
    logout: {
        show: false,
        toggle: function () { }
    }
});

export const useLogout = () => {
    return React.useContext(NavbarContext).logout;
}

const Navbar = React.memo(() => {
    const [state, setState] = React.useState({
        logout: {
            show: false,
        }
    });

    const logout = React.useMemo(() => {
        return {
            show: state.logout.show,
            toggle: () => {
                setState(s => ({ ...s, logout: { ...s.logout, show: !s.logout.show } }))
            }
        }
    }, [state.logout.show]);

    return <NavbarContext.Provider value={{ logout }}>
        <nav className="navbar-container">
            <Search />
            <Notification />
            <UserDropdown />
            <LogoutDialog {...logout} />
        </nav>
    </NavbarContext.Provider>
})

export default Navbar;
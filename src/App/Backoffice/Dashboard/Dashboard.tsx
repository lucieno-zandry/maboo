import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

const DashboardContext = React.createContext({
    search: {
        keys: '',
        research: (chars: string) => { chars }
    }
})

export const useSearch = () => {
    return React.useContext(DashboardContext).search;
}

const Dashboard = React.memo(() => {
    const [state, setState] = React.useState({
        search: {
            keys: '',
        }
    });

    const search = React.useMemo(() => ({
        keys: state.search.keys,
        research: (chars: string) => {
            setState(s => ({ ...s, search: { ...s.search, keys: chars } }));
        }
    }), [state.search.keys]);

    return <DashboardContext.Provider value={{ search }}>
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </div>
    </DashboardContext.Provider>
});

export default Dashboard;
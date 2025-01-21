import React from "react";
import logo from '../../../../assets/icons/maboo.png';
import ListOfPages from "./ListOfPages/ListOfPages";
import AccordionActions from "./AccordionActions/AccordionActions";

const Sidebar = React.memo(() => {
    return <aside className="sidebar-container">
        <div className="logo-container">
            <img
                src={logo} />
        </div>

        <div className="sidebar-actions">
            <ListOfPages />
            <AccordionActions />
        </div>
    </aside>
});

export default Sidebar;
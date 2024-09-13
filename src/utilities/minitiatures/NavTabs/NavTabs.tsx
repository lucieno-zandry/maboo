import React from "react";

type Props = {
    className?: string,
    children: React.JSX.Element[],
    active: string,
    setActive: Function,
}

const Context: React.Context<{
    active: string,
    setActive: any,
}> = React.createContext({
    active: '',
    setActive: function (active: string) { active },
});

export const useNavTabs = () => {
    return React.useContext(Context);
}

const NavTabs = React.memo((props: Props) => {
    const { className = '', children, active, setActive } = props;

    return <Context.Provider value={{ active, setActive }}>
        <ul className={`nav nav-tabs ${className}`}>
            {children}
        </ul>
    </Context.Provider>
});


export default NavTabs;
import React from "react";
import { useNavTabs } from "../NavTabs";
import Button from "../../Button/Button";

type NavTabProps = {
    eventKey: string,
    children: React.JSX.Element | string,
    className?: string,
}

export const NavTab = React.memo((props: NavTabProps) => {
    const { eventKey, children, className = '' } = props;
    const { active, setActive } = useNavTabs();

    return <li className={`nav-item ${className}`}>
        <Button
            className={`nav-link ${eventKey === active && 'active'}`}
            type="button"
            onClick={() => setActive(eventKey)}>
            {children}
        </Button>
    </li>
});

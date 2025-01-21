import NavTabs from "../../../../utilities/minitiatures/NavTabs/NavTabs";
import { NavTab } from "../../../../utilities/minitiatures/NavTabs/NavTab/NavTab";
import React from "react";
import Cancelled from "../Cancelled/Cancelled";
import Processing from "../Processing/Processing";
import Delivered from "../Delivered/Delivered";
import QueryUrl from "../../../../utilities/helpers/QueryUrl";

const CANCELLED = 'CANCELLED';
const PROCESSING = 'PROCESSING';
const DELIVERED = 'DELIVERED';

type Tabs = typeof CANCELLED | typeof PROCESSING | typeof DELIVERED;

const getDefaultActive = (): string => {
    const Url = new QueryUrl(location.href);
    const active = Url.get('active');
    return active || CANCELLED;
}

const List = React.memo(() => {
    const [state, setState] = React.useState({
        active: getDefaultActive() as Tabs,
    });

    const setActive = React.useCallback((active: Tabs) => {
        setState(s => ({ ...s, active }))
    }, []);

    const ActiveComponent = React.useMemo(() => {
        switch (state.active) {
            case PROCESSING:
                return Processing;

            case DELIVERED:
                return Delivered;

            default:
                return Cancelled;
        }
    }, [state.active]);

    return <div className="orders-list">
        <NavTabs active={state.active} setActive={setActive}>
            <NavTab eventKey={CANCELLED}>Annulée(s)</NavTab>
            <NavTab eventKey={PROCESSING}>En cours</NavTab>
            <NavTab eventKey={DELIVERED}>Livrée(s)</NavTab>
        </NavTabs>

        <ActiveComponent />
    </div>
});

export default List;
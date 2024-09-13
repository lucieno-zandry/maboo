import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import Fade from "../../../../../../utilities/minitiatures/Fade/Fade";
import SellerRequestsList from "./SellerRequestsList/SellerRequestsList";
import TablePlaceholder from "../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import { refreshSellerRequests } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import RequestsEmpty from "./RequestsEmpty/RequestsEmpty";

const SellerRequests = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.backoffice.seller);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!requests) {
            dispatch(refreshSellerRequests());
        }
    }, [requests]);

    return <div className="seller-requests-container">
        <Fade show={Boolean(requests?.length)}>
            <SellerRequestsList />
        </Fade>

        <Fade show={!requests}>
            <TablePlaceholder />
        </Fade>

        <Fade
            show={requests?.length === 0}>
            <RequestsEmpty />
        </Fade>
    </div >
});

export default SellerRequests;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import Fade from "../../../../../../utilities/minitiatures/Fade/Fade";
import AdminRequestsList from "./AdminRequestsList/AdminRequestsList";
import TablePlaceholder from "../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import { refreshAdminRequests } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import RequestsEmpty from "./RequestsEmpty/RequestsEmpty";

const AdminRequests = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.backoffice.admin);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!requests) {
            dispatch(refreshAdminRequests());
        }
    }, [requests]);

    return <div className="admin-requests-container">
        <Fade show={Boolean(requests?.length)}>
            <AdminRequestsList />
        </Fade>

        <Fade show={!requests}>
            <TablePlaceholder />
        </Fade>

        <Fade show={requests?.length === 0}>
            <RequestsEmpty />
        </Fade>
    </div >
});

export default AdminRequests;
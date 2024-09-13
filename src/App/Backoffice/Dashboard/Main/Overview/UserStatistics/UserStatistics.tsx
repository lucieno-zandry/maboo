import React from "react";
import { usersCount } from "../../../../../../utilities/api/admin/actions";
import toFormatedString from "../../../../../../utilities/helpers/toFormatedString";

const UserStatistics = React.memo(() => {
    const [state, setState] = React.useState({
        count: null as null | number,
    });

    React.useEffect(() => {
        if (state.count === null) {
            usersCount()
                .then(response => {
                    setState(s => ({ ...s, count: response.data.count }));
                })
        }
    }, [state.count]);

    return <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Utilisateurs</h5>
                <p>Nombre total: {
                    state.count === null ?
                        <span className="spinner-border"></span> :
                        <span className="display-6 text-success">{toFormatedString(state.count) }</span>
                }</p>
                <p>Actifs: <span className="display-6 text-success">0</span></p>
            </div>
        </div>
});

export default UserStatistics;

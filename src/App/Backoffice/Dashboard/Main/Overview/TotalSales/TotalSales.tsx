import React from "react";
import { salesTotal } from "../../../../../../utilities/api/actions";
import Price from "../../../../../../utilities/minitiatures/Price/Price";

const TotalSales = React.memo(() => {
    const [total, setTotal] = React.useState(null as null | number);

    React.useEffect(() => {
        if (total === null) {
            salesTotal()
                .then(response => {
                    setTotal(response.data.total);
                })
        }
    }, [total]);
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Toutes les ventes</h5>
                {total !== null &&
                    <p className="card-text display-4 text-success text-align-center">
                        <Price amount={total} />
                    </p>}

                {total === null &&
                    <div className="d-flex justify-content-center my-3">
                        <span className="spinner-border"></span>
                    </div>}
            </div>
        </div>
    );
});

export default TotalSales;

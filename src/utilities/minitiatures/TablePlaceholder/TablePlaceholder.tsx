import React from "react";
import generateArray from "../../helpers/generateArray";

const TablePlaceholder = React.memo(() => {
    return generateArray(4).map((value, key) => {
        value;
        return <div className="categories-placeholder placeholder-glow gap-5 d-flex mb-5" key={key}>
            <div className="placeholder"></div>
            <div className="placeholder col"></div>
        </div>
    })
})

export default TablePlaceholder;
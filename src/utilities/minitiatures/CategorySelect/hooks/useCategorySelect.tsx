import React from "react";
import { GlobalsContext } from "../../../globals/GlobalsProvider";

export default function () {
    const { categorySelectRef } = React.useContext(GlobalsContext);
    return categorySelectRef.current;
}
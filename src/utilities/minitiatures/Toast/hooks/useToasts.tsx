import React from "react";
import { GlobalsContext } from "../../../globals/GlobalsProvider";

const useToasts = () => {
    const { toastRef } = React.useContext(GlobalsContext);
    return toastRef?.current;
}

export default useToasts;
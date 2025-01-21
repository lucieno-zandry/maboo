import React from "react";
import { GlobalsContext } from "../../../globals/GlobalsProvider";

const usePagePreloader = () => {
    const { pagePreloaderRef } = React.useContext(GlobalsContext);
    return pagePreloaderRef.current;
}

export default usePagePreloader;
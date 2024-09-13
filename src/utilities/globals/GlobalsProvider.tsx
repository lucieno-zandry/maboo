import React from "react";
import Toasts, { defaultToast } from "../minitiatures/Toast/Toasts";
import PagePreloader, { defaultPreloader } from "../minitiatures/PagePreloader/PagePreloader";
import CategorySelect, { defaultCategorySelect } from "../minitiatures/CategorySelect/CategorySelect";

type GlobalsProps = {
    children: React.JSX.Element
};

export const GlobalsContext = React.createContext({
    toastRef: { current: defaultToast },
    pagePreloaderRef: { current: defaultPreloader },
    categorySelectRef: { current: defaultCategorySelect },
});

const GlobalsProvider = React.memo((props: GlobalsProps) => {
    const toastRef = React.useRef(defaultToast);
    const pagePreloaderRef = React.useRef(defaultPreloader);
    const categorySelectRef = React.useRef(defaultCategorySelect);

    const ContextValue = React.useMemo(() => ({
        toastRef,
        pagePreloaderRef,
        categorySelectRef,
    }), [toastRef, pagePreloaderRef, categorySelectRef]);

    return <GlobalsContext.Provider value={ContextValue}>
        <Toasts />
        <PagePreloader />
        <CategorySelect />
        {props.children}
    </GlobalsContext.Provider>
})

export default GlobalsProvider;
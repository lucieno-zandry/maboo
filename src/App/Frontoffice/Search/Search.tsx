import React from "react";
import { useParams } from "react-router-dom";
import { search } from "../../../utilities/api/actions";
import { Product, User } from "../../../utilities/constants/types";
import NavTabs from "../../../utilities/minitiatures/NavTabs/NavTabs";
import { NavTab } from "../../../utilities/minitiatures/NavTabs/NavTab/NavTab";
import Products from "./Products/Products";
import Loading from "../../../utilities/minitiatures/Loading/Loading";
import Fade from "../../../utilities/minitiatures/Fade/Fade";

type ActiveTabs = 'PRODUCT' | 'SELLER';

const defaultResult = {
    products: [] as Product[],
    sellers: [] as User[],
}

const SearchContext: React.Context<{ result: typeof defaultResult, setResult: any }> = React.createContext({
    result: defaultResult,
    setResult: function () { },
});

const dataLimit = 30;
const defaultActive = 'PRODUCT';

let prevKeyWords = '';

export const useSearch = () => {
    return React.useContext(SearchContext);
}

const reset = () => {
    if (prevKeyWords) prevKeyWords = '';
}

const Search = React.memo(() => {
    const words: string | undefined = useParams().words;

    const [state, setState] = React.useState({
        result: defaultResult,
        active: defaultActive,
        loading: true,
    });

    const { active, loading, result } = state;

    const setResult = React.useCallback((result: typeof defaultResult) => {
        setState(s => ({ ...s, result }))
    }, []);

    const setActive = React.useCallback((active: ActiveTabs) => {
        setState(s => ({ ...s, active }))
    }, []);

    React.useEffect(reset, []);

    React.useEffect(() => {
        if (words && words !== prevKeyWords) {
            if (!state.loading) setState(s => ({ ...s, loading: true }));

            search(words, { limit: dataLimit })
                .then(response => {
                    const matches = response.data;
                    setState(s => ({ ...s, loading: false, result: matches }));
                    prevKeyWords = words;
                });
        }
    }, [words, state.loading, prevKeyWords]);

    
    return <SearchContext.Provider value={{ result, setResult }}>
        <Loading show={loading} />
        <Fade className="search-page-container container" show={!loading}>
            <NavTabs active={active} setActive={setActive} className="search-tabs">
                <NavTab eventKey="PRODUCT">Produits</NavTab>
                <NavTab eventKey="SELLER">Vendeurs</NavTab>
            </NavTabs>

            <Products isActive={active === 'PRODUCT'} />
        </Fade>
    </SearchContext.Provider>
});

export default Search;
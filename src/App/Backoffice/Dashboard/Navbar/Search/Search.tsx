import React from "react";
import FormFloating from "../../../../../utilities/minitiatures/FormFloating/FormFloating";
import { useSearch } from "../../Dashboard";

const Search = React.memo(() => {
    const search = useSearch();

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        search.research(value);
    }, [search.research]);

    return <FormFloating
        id="search-bar"
        placeholder="rechercher"
        label={<><i className="fa fa-magnifying-glass"></i> rechercher...</>}
        value={search.keys}
        onChange={handleChange} />
});

export default Search;
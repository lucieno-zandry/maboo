import React from "react";
import { Link } from "react-router-dom";

type Props = {
    keywords: string,
}

const SearchFor = React.memo((props: Props) => {
    const { keywords } = props;

    return <Link className="search-for" to={`/search/${keywords}`}>
        Rechercher "<span className="search-for-keywords">{keywords}</span>"
    </Link>
})

export default SearchFor;
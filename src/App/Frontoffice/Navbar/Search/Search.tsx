import React from "react";
import Input from "../../../../utilities/minitiatures/Input/Input";
import ProductSuggestions from "./ProductSuggestions/ProductSuggestions";
import { Product, User } from "../../../../utilities/constants/types";
import { search } from "../../../../utilities/api/actions";
import StringSuggestions from "./StringSuggestions/StringSuggestions";
import SearchFor from "./SearchFor/SearchFor";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import { useNavigate } from "react-router-dom";
import Button from "../../../../utilities/minitiatures/Button/Button";

type Target = EventTarget & { children: ({ value?: string } & Element)[] };

const Search = React.memo(() => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        show: false,
        keywords: '',
        products: null as Product[] | null,
        sellers: null as User[] | null,
    });

    const inputRef: React.LegacyRef<HTMLInputElement> = React.createRef();

    const show = React.useCallback(() => setState(s => ({ ...s, show: true })), []);
    const hide = React.useCallback(() => setState(s => ({ ...s, show: false })), []);
    const toggleShow = React.useCallback(() => state.show ? hide() : show(), [state.show]);

    const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if(value) search(value)
            .then(response => {
                const { products, sellers } = response.data;
                setState(s => ({ ...s, products, sellers, keywords: value }))
            })
    }, []);


    const noResults = React.useMemo(() => Boolean(
        (state.products && state.products.length === 0) && (state.sellers && state.sellers.length === 0)
    ), [state.products, state.sellers]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();
        const { children } = e.target as Target;
        if (children.length > 0) {
            for (const child of children) {
                const name = child.getAttribute('name');
                const value = child.value;

                if (name === 'search-input' && value) {
                    hide();
                    navigate(`/search/${value}`);
                    return;
                }
            }
        }
    }, []);

    React.useEffect(() => {
        if (inputRef.current && state.show) {
            inputRef.current.focus();
        }
    }, [inputRef, state.show]);

    return <div className="search-container">
        <Button
            type="button"
            className="btn"
            onClick={toggleShow}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
        <Fade className="search-body" show={state.show} onBlur={hide} >
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="rechercher ici..."
                    onChange={handleSearch}
                    name="search-input"
                    ref={inputRef}/>
            </form>

            <Fade show={noResults}>
                <SearchFor
                    keywords={state.keywords} />
            </Fade>

            <StringSuggestions
                products={state.products}
                sellers={state.sellers}
                keywords={state.keywords}
                show={!noResults}
                onClick={hide}/>

            <ProductSuggestions
                products={state.products}
                onClick={hide}/>
        </Fade>
    </div>
});

export default Search;
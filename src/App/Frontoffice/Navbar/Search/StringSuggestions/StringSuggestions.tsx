import React from "react";
import { Product, User } from "../../../../../utilities/constants/types";
import { Link } from "react-router-dom";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";

type Props = {
    products: Product[] | null,
    sellers: User[] | null,
    keywords: string,
    show: boolean,
    onClick: () => void,
}

const StringSuggestions = React.memo((props: Props) => {
    const { products, sellers, keywords, show, onClick} = props;

    const format = React.useCallback((text: string) => {
        const formated = text.toLowerCase().replace(keywords.toLowerCase(), `<strong>${keywords}</strong>`);
        return formated;
    }, [keywords]);

    return <Fade
        className="string-suggestions"
        show={show}
        onClick={onClick}>
        {products?.map(product => {
            return <Link to={`/search/${product.title}`} key={product.id} dangerouslySetInnerHTML={{ __html: format(product.title) }} />
        })}
        {sellers?.map(seller => {
            const text = `${seller.name} ${seller.firstname}`;
            return <Link to={`/search/${text}`} key={seller.id} dangerouslySetInnerHTML={{ __html: format(text) }} />
        })}
    </Fade>
})

export default StringSuggestions;
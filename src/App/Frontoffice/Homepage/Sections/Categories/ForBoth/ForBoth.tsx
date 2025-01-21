import React from "react";

const ForBoth = React.memo(() => {
    return <article className="category-item for-both rounded">
        <div className="linear-gradient">
            <div className="category-information">
                <h6 className="category-title">
                    Pour vous deux
                </h6>
                <p>
                    Un petit être tendre, plein de curiosité et de douceur.
                </p>
                <button className="btn btn-outline-light btn-sm">Voir les produits</button>
            </div>
        </div>
    </article>
});

export default ForBoth;
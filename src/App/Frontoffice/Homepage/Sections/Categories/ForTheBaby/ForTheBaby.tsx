import React from "react";

const ForTheBaby = React.memo(() => {
    return <article className="category-item for-the-baby rounded">
        <div className="linear-gradient">
            <div className="category-information">
                <h6 className="category-title">
                    Pour le Bébé
                </h6>
                <p>
                    Un petit être tendre, plein de curiosité et de douceur.
                </p>
                <button className="btn btn-outline-light btn-sm">Voir les produits</button>
            </div>
        </div>
    </article>
});

export default ForTheBaby;
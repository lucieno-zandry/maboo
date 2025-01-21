import React from "react";

const ForTheMother = React.memo(() => {
    return <article className="category-item for-the-mother rounded">
        <div className="linear-gradient">
            <div className="category-information">
                <h6 className="category-title">
                    Pour la maman
                </h6>
                <p>
                    Force silencieuse, créatrice de liens, nourricière bienveillante
                </p>
                <button className="btn btn-outline-light btn-sm">Voir les produits</button>
            </div>
        </div>
    </article>
});

export default ForTheMother;
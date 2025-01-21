import React from "react";
import { addToCart } from "./actions";
import useToasts from "../../minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshCart } from "../../redux/frontoffice/frontofficeSlice";
import { AppDispatch } from "../../redux/store";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import links from "../../helpers/links";
import useAuth from "../../hooks/useAuth";

export type Payload = {
    product_id: number,
    quantity: number,
    product_variant_id?: number,
}

type UseAddToCartProps = {
    payload: Payload,
    onInit?: Function,
    onSuccess?: Function,
    onError?: Function,
    onFinally?: Function,
    product_slug: string,
}

export const useAddToCart = () => {
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleUnauthorized = React.useCallback((slug: string) => {
        const intended = {
            path: `/product/${slug}`,
            target: true,
        }

        sessionStorage.setItem('intended', JSON.stringify(intended));
        navigate(links.loginPage);
    }, []);

    const handleAddToCart = React.useCallback((options: UseAddToCartProps) => {
        const { onError, onFinally, onInit, onSuccess, payload, product_slug } = options;

        if (auth) {
            onInit && onInit();
            addToCart(payload)
                .then((response) => {
                    toasts.push({
                        title: "Ajouté au panier",
                        content: "Votre panier a été mis à jour avec succès",
                        type: "success",
                    })

                    dispatch(refreshCart());
                    onSuccess && onSuccess(response);
                })
                .catch((error: AxiosError) => {
                    let message = "";

                    switch (error.response?.status) {
                        case 403:
                            message = "Les vendeurs et les administrateurs ne peuvent pas ajouter des produits au panier.";
                            break;

                        case 401:
                            message = "Authentification requise pour exécuter cette action";
                            handleUnauthorized(product_slug)
                            break;

                        default:
                            message = "Une erreur s'est produite lors de l'ajout au panier, veuillez réessayer plus tard.";
                            break;
                    }

                    toasts.push({
                        title: "Impossible d'ajouter au panier",
                        content: message,
                        type: "danger"
                    })

                    onError && onError(error);
                })
                .finally(() => {
                    onFinally && onFinally();
                })
        } else {
            handleUnauthorized(product_slug);
        }
    }, [toasts.push, auth]);

    return handleAddToCart;
}
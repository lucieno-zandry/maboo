import React from "react";
import { Modal } from "react-bootstrap";
import Title from "../../../../../../../utilities/minitiatures/Title/Title";
// import ButtonPrimary from "../../../../../../../utilities/minitiatures/Button/ButtonPrimary/ButtonPrimary";
import { useEditSeller } from "../SellersContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { updateSeller } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import "./EditSeller.scss";

/**
 * Composant pour l'édition d'un vendeur/professionnel existant
 * Affiche un formulaire modal pré-rempli avec les informations du vendeur
 */
const EditSeller = React.memo(() => {
    const { current, setCurrent } = useEditSeller();
    const dispatch = useDispatch<AppDispatch>();

    // États pour les champs du formulaire
    const [formData, setFormData] = React.useState({
        name: "",
        firstname: "",
        email: "",
        phone_number: "",
        adress: "",
        // Pas de mot de passe lors de l'édition
    });

    // État pour l'image du vendeur
    const [image, setImage] = React.useState<File | null>(null);

    // État pour l'URL de l'image actuelle
    const [currentImageUrl, setCurrentImageUrl] = React.useState<string | null>(null);

    // Gestion des erreurs de validation
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    // Pré-remplir le formulaire lorsqu'un vendeur est sélectionné pour l'édition
    React.useEffect(() => {
        if (current) {
            setFormData({
                name: current.name || "",
                firstname: current.firstname || "",
                email: current.email || "",
                phone_number: current.phone_number || "",
                adress: current.adress || "",
            });

            // Réinitialiser l'image
            setImage(null);

            // Stocker l'URL de l'image actuelle si elle existe
            if (current.image) {
                // Si c'est une chaîne de caractères, on peut l'utiliser comme URL
                if (typeof current.image === 'string') {
                    setCurrentImageUrl(current.image);
                } else {
                    // Si c'est un File ou un Blob, on ne peut pas l'utiliser directement
                    setCurrentImageUrl(null);
                }
            } else {
                setCurrentImageUrl(null);
            }
        }
    }, [current]);

    // Fermeture du modal
    const handleClose = React.useCallback(() => {
        setCurrent(null);
        setErrors({});
        setImage(null);
        setCurrentImageUrl(null);
    }, [setCurrent]);

    // Mise à jour des champs du formulaire
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur lors de la modification
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);

    // Gestion du téléchargement d'image
    const handleImageChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);

            // Effacer l'erreur d'image si elle existe
            if (errors.image) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        }
    }, [errors]);

    // Validation du formulaire
    const validateForm = React.useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        }

        if (!formData.firstname.trim()) {
            newErrors.firstname = "Le prénom est requis";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide";
        }

        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "Le numéro de téléphone est requis";
        }

        if (!formData.adress.trim()) {
            newErrors.adress = "L'adresse est requise";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Soumission du formulaire
    const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !current) {
            return;
        }

        try {
            // Préparation des données du vendeur pour l'API
            const sellerData = {
                ...current,
                name: formData.name,
                firstname: formData.firstname,
                email: formData.email,
                phone_number: formData.phone_number,
                adress: formData.adress,
                // Conserver les autres propriétés du vendeur
                updated_at: new Date().toISOString(), // Sera écrasé par l'API
                // Utiliser la nouvelle image si elle existe, sinon conserver l'ancienne
                image: image || current.image
            };

            // Appel à l'action Redux pour mettre à jour le vendeur
            await dispatch(updateSeller(sellerData)).unwrap();

            // Fermer le modal
            handleClose();

            // Afficher un message de succès
            alert("Vendeur mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du vendeur:", error);
            alert("Erreur lors de la mise à jour du vendeur. Veuillez réessayer.");
        }
    }, [formData, validateForm, current, dispatch, handleClose, image]);

    // Vérifier si un vendeur est sélectionné pour l'édition
    if (!current) return null;

    return (
        <Modal show={Boolean(current)} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Title text="Modifier le professionnel" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="edit-seller-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="edit-name">Nom</label>
                            <input
                                type="text"
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? "error" : ""}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-firstname">Prénom</label>
                            <input
                                type="text"
                                id="edit-firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className={errors.firstname ? "error" : ""}
                            />
                            {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-email">Email</label>
                            <input
                                type="email"
                                id="edit-email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-phone_number">Téléphone</label>
                            <input
                                type="tel"
                                id="edit-phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={errors.phone_number ? "error" : ""}
                            />
                            {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-adress">Adresse</label>
                            <textarea
                                id="edit-adress"
                                name="adress"
                                value={formData.adress}
                                onChange={handleChange}
                                className={errors.adress ? "error" : ""}
                            />
                            {errors.adress && <span className="error-message">{errors.adress}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-image">Photo de profil</label>
                            <input
                                type="file"
                                id="edit-image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={errors.image ? "error" : ""}
                            />
                            {errors.image && <span className="error-message">{errors.image}</span>}

                            {/* Afficher l'aperçu de la nouvelle image si elle existe */}
                            {image && (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Nouvelle photo"
                                        style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                    />
                                </div>
                            )}

                            {/* Afficher l'image actuelle si aucune nouvelle image n'est sélectionnée */}
                            {!image && currentImageUrl && (
                                <div className="current-image">
                                    <p>Image actuelle :</p>
                                    <img
                                        src={currentImageUrl}
                                        alt="Photo actuelle"
                                        style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            {/* <ButtonPrimary text="Mettre à jour" type="submit" /> */}
                            <button className="btn-primary" type="submit">Mettre à jour</button>
                            <button type="button" className="cancel-button" onClick={handleClose}>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
});

export default EditSeller;

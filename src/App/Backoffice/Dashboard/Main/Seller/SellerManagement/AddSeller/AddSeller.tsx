import React from "react";
import { Modal } from "react-bootstrap";
import Title from "../../../../../../../utilities/minitiatures/Title/Title";
// import ButtonPrimary from "../../../../../../../utilities/minitiatures/Button/ButtonPrimary/ButtonPrimary";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { addSeller } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import "./AddSeller.scss";

/**
 * Composant pour l'ajout d'un nouveau vendeur/professionnel
 * Affiche un formulaire modal pour saisir les informations du vendeur
 */
const AddSeller = React.memo(() => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // États pour les champs du formulaire
    const [formData, setFormData] = React.useState({
        name: "",
        firstname: "",
        email: "",
        phone_number: "",
        adress: "",
        password: "",
        password_confirmation: ""
    });

    // État pour l'image du vendeur
    const [image, setImage] = React.useState<File | null>(null);

    // Gestion des erreurs de validation
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    // Ouverture/fermeture du modal
    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        // Réinitialiser le formulaire
        setFormData({
            name: "",
            firstname: "",
            email: "",
            phone_number: "",
            adress: "",
            password: "",
            password_confirmation: ""
        });
        setImage(null);
        setErrors({});
    }, []);

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

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Soumission du formulaire
    const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Préparation des données du vendeur pour l'API
            const sellerData = {
                name: formData.name,
                firstname: formData.firstname,
                email: formData.email,
                phone_number: formData.phone_number,
                adress: formData.adress,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                type: "SELLER" as const,
                // Ces champs seront remplis par l'API
                created_at: "",
                updated_at: "",
                validated_at: null,
                email_verified_at: null,
                // Ajouter l'image si elle existe
                image: image
            };

            console.log("Envoi des données du vendeur:", sellerData);

            // Appel à l'action Redux pour ajouter le vendeur
            // Le type SellerInput dans backofficeSlice.ts accepte déjà File | Blob pour image
            await dispatch(addSeller(sellerData)).unwrap();

            // Fermer le modal
            handleClose();

            // Afficher un message de succès
            alert("Vendeur ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout du vendeur:", error);
            alert("Erreur lors de l'ajout du vendeur. Veuillez réessayer.");
        }
    }, [formData, validateForm, dispatch, handleClose, image]);

    return (
        <div className="add-seller-container">
            {/* Bouton pour ouvrir le modal d'ajout */}
            <div className="add-seller-button">
                {/* <ButtonPrimary text="Ajouter un professionnel" onClick={handleOpen} /> */}
                <button className="btn-primary" onClick={handleOpen}>Ajouter un professionnel</button>
            </div>

            {/* Modal avec le formulaire d'ajout */}
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Title text="Ajouter un professionnel" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-seller-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? "error" : ""}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstname">Prénom</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className={errors.firstname ? "error" : ""}
                                />
                                {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : ""}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone_number">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className={errors.phone_number ? "error" : ""}
                                />
                                {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="adress">Adresse</label>
                                <textarea
                                    id="adress"
                                    name="adress"
                                    value={formData.adress}
                                    onChange={handleChange}
                                    className={errors.adress ? "error" : ""}
                                />
                                {errors.adress && <span className="error-message">{errors.adress}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? "error" : ""}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className={errors.password_confirmation ? "error" : ""}
                                />
                                {errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Photo de profil</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={errors.image ? "error" : ""}
                                />
                                {errors.image && <span className="error-message">{errors.image}</span>}
                                {image && (
                                    <div className="image-preview">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Aperçu"
                                            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                {/* <ButtonPrimary text="Ajouter" type="submit" /> */}
                                <button className="btn-primary" type="submit">Ajouter</button>
                                <button type="button" className="cancel-button" onClick={handleClose}>
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
});

export default AddSeller;

import React from "react";
import { User } from "../../../../utilities/constants/types";
import appImage from "../../../../utilities/helpers/appImage";
import fileIsImage from "../../../../utilities/helpers/fileIsImage";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import imageToDataUrl from "../../../../utilities/helpers/imageToDataUrl";
import usePagePreloader from "../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { updateUser } from "../../../../utilities/api/actions";
import useRefreshAuth from "../../../../utilities/hooks/useRefreshAuth";
import useAuth from "../../../../utilities/hooks/useAuth";

const Overview = React.memo(() => {
    const user = useAuth().auth as User;
    const toasts = useToasts();
    const pagePreloader = usePagePreloader();
    const refreshAuth = useRefreshAuth();

    const [state, setState] = React.useState({
        imageUrl: '',
    });

    const imageSource = React.useMemo(() => state.imageUrl || appImage(user.image), [state.imageUrl, user.image]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];

            if (fileIsImage(file)) {
                pagePreloader.enable();

                updateUser({ image: file })
                    .then(() => {
                        refreshAuth()
                        imageToDataUrl(file, (imageUrl) => setState(s => ({ ...s, imageUrl })));
                        toasts.push({
                            title: "Photo mise à jour",
                            content: "Votre image de profil a été changé avec succès",
                            type: "success"
                        })
                    })
                    .catch(() => {
                        toasts.push({
                            title: "Une erreur s'est produite",
                            content: "Nous n'avons pas pu changer votre photo de profil, veuillez réessayer plus tard",
                            type: "danger"
                        })
                    })
                    .finally(() => {
                        pagePreloader.disable();
                    });
            } else {
                toasts.push({
                    title: 'Format invalide.',
                    content: "Veuillez insérer un fichier de type image uniquement.",
                    type: "danger"
                });
            }
        }
    }, []);

    return <div className="overview-container">
        <div className="profile-picture">
            {imageSource ?
                <img
                    src={imageSource} /> : <div className="profile-picture-placeholder">
                    <i className="fa fa-image fa-2x"></i>
                </div>}
            <label
                className="btn btn-dark rounded-circle profile-picture-action btn-sm"
                htmlFor="profile-image-input">
                <i className="fa fa-camera"></i>
                <input
                    type="file"
                    id="profile-image-input"
                    accept="image/*"
                    onChange={handleChange}
                    hidden />
            </label>
        </div>
        <p>{user.name} {user.firstname}</p>
    </div>
});

export default Overview;
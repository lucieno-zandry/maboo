import { USER_TYPES } from "../constants/datas";
import { UserType } from "../constants/types";

let type = null as UserType | null;
let previousPathname = location.pathname;

export default function (): UserType {
  const path = location.pathname;

  if (path !== previousPathname) {
    type = null;
    previousPathname = path;
  }

  if (!type) {
    // Liste des routes frontoffice qui ne doivent pas être confondues avec des types d'utilisateurs
    const frontofficeRoutes = ["/professionals"];

    // Vérifier d'abord si le chemin correspond à une route frontoffice connue
    let isFrontofficeRoute = false;
    for (const route of frontofficeRoutes) {
      if (path === route || path.startsWith(`${route}/`)) {
        isFrontofficeRoute = true;
        break;
      }
    }

    // Si c'est une route frontoffice, définir le type sur "customer"
    if (isFrontofficeRoute) {
      type = "customer";
    } else {
      // Sinon, vérifier les types d'utilisateurs comme avant
      USER_TYPES.forEach((userType) => {
        if (path.startsWith(`/${userType}`)) {
          type = userType;
        }
      });
    }
  }

  if (!type) type = "customer";
  return type;
}

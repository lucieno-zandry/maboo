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
    USER_TYPES.forEach((userType) => {
      if (path.startsWith(`/${userType}`)) {
        type = userType;
      }
    });
  }

  if (!type) type = "customer";
  return type;
}

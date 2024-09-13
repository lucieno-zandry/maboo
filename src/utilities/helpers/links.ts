import userType from "./userType";

const basePath = userType() === "customer" ? "" : `/${userType()}`;

const validationPage = `${basePath}/auth/validation`;
const emailConfirmation = `${basePath}/auth/confirmation`;
const loginPage = `${basePath}/auth/login`;
const signupPage = `${basePath}/auth/signup`;
const authPage = basePath ? `${basePath}/dashboard` : "/";
const forgottenPassword = `${basePath}/auth/password-forgotten`;

const getAuth = `/${userType()}/auth/user`;
const signup = `/${userType()}/auth/signup`;
const login = `/${userType()}/auth/login`;
const addToCart = '/cart/add';

export default {
  validationPage,
  emailConfirmation,
  loginPage,
  authPage,
  signupPage,
  forgottenPassword,
  getAuth,
  signup,
  login,
  addToCart
};
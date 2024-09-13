import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import userType from "../helpers/userType";
import links from "../helpers/links";

type Headers = {
  Authorization?: string;
  Accept?: string;
  "Content-Type"?: string;
};

const UNAUTHORIZED_REDIRECTION_EXCLUSION: string[] = [
  links.getAuth,
  links.login,
  links.signup,
  links.addToCart,
];

const AUTHORIZATION_TOKEN_PREFIX = "Bearer ";
const TOKEN_SUFFIX = "Token";

async function execute(action: () => Promise<AxiosResponse>, url: string) {
  try {
    const response = await action();
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 401:
          if (!UNAUTHORIZED_REDIRECTION_EXCLUSION.includes(url)) {
            location.pathname = links.loginPage;
          }
          break;

        default:
          break;
      }
    }

    throw e;
  }
}

function createInstance(headers: Headers): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers,
  });

  return instance;
}

function authorizationToken(): string | null {
  const prefix = userType();
  const token = localStorage.getItem(`${prefix}${TOKEN_SUFFIX}`);
  return token;
}

const getHeaders = (): Headers => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `${AUTHORIZATION_TOKEN_PREFIX}${authorizationToken()}`,
});

function get(url: string) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.get(url), url);
}

function post(url: string, payload?: unknown) {
  const headers = getHeaders();

  if (payload instanceof FormData) {
    delete headers["Content-Type"];
  }

  const instance = createInstance(headers);
  return execute(() => instance.post(url, payload), url);
}

function put(url: string, payload?: unknown) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.put(url, payload), url);
}

function __delete(url: string) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.delete(url), url);
}

export default {
  get,
  post,
  put,
  delete: __delete,
};

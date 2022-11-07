import axios from 'axios';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { setAppAlert, setAppState } from 'src/contexts/app';
import { AppActionType } from 'src/contexts/app/types';
import apiRoutes from 'src/routes/api';

const tokenCookieName = 'MyShopAppToken';
export const baseURL = 'https://myshopapi.iran.liara.run/';

let routerNavigate: NavigateFunction | undefined;
let appDispatch: React.Dispatch<AppActionType> | undefined;

const AXIOS = axios.create({ baseURL });

AXIOS.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const client_id = Cookies.get(tokenCookieName);
    if (client_id) config.headers!.Authorization = client_id;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

AXIOS.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if (error.response) {
      // Request made and server responded

      switch (error.response.status) {
        case 400:
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Bad Request', mode: 'error' }));
          break;
        case 401:
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Unauthorized', mode: 'error' }));
          unAuthorized();
          break;
        case 403: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Forbidden', mode: 'error' }));
          break;
        case 404: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Not Found', mode: 'error' }));
          break;
        case 405: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Method Not Allowed', mode: 'error' }));
          break;
        case 408: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Request Timeout', mode: 'error' }));
          break;
        case 429: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Too Many Requests', mode: 'error' }));
          break;
        case 500: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Internal Server Error', mode: 'error' }));
          break;
        case 502: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Bad Gateway', mode: 'error' }));
          break;
        case 503: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Service Unavailable', mode: 'error' }));
          break;
        case 504: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Gateway Timeout', mode: 'error' }));
          break;
        case 511: //
          appDispatch &&
            appDispatch(setAppAlert({ isShown: true, message: 'Network Authentication Required', mode: 'error' }));
          break;
        default: //
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Something Went Wrong', mode: 'error' }));
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received

      switch (error.message) {
        case 'Network Error':
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Network Error', mode: 'error' }));
          break;
        default: // Something Went Wrong
          appDispatch && appDispatch(setAppAlert({ isShown: true, message: 'Something Went Wrong', mode: 'error' }));
          break;
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }

    return Promise.reject(error);
  },
);

export const transferFunctions = (
  routerNavigateFun: NavigateFunction,
  appDispatchFun: React.Dispatch<AppActionType>,
) => {
  routerNavigate = routerNavigateFun;
  appDispatch = appDispatchFun;
};

export const setAuthorizeData = (client_id: string) => {
  //
  if (!client_id) return;

  const options: any = {
    expires: 1,
    path: '/',
  };

  Cookies.set(tokenCookieName, client_id, options);
  AXIOS.defaults.headers.common['Authorization'] = client_id;
  appDispatch && appDispatch(setAppState('LoggedIn'));
  routerNavigate && routerNavigate('/');
};

export const unAuthorized = () => {
  appDispatch && appDispatch(setAppState('LoggedOut'));
  Cookies.remove(tokenCookieName);
  delete AXIOS.defaults.headers.common['Authorization'];
};

export const checkTokenReq = async () => {
  const client_id = Cookies.get(tokenCookieName);
  if (!client_id) return Promise.resolve(false);
  const { data } = await AXIOS.post<boolean>(apiRoutes.auth.checkToken);
  return data;
};

export default AXIOS;

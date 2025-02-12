import axios, {AxiosError, AxiosResponse} from 'axios';
import {getAccessToken, login} from '../managers/AuthManager';
import {setHeaders} from '../managers/SitesManager';
import {API_BASE_URL} from '../config/consts';

export const createApiInstance = (route?: string, timeout?: number) => {
  const Api = axios.create({
    baseURL: `${API_BASE_URL}${route}`,
    responseType: 'json',
    withCredentials: true,
    ...(timeout ? {timeout} : {}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Api.interceptors.request.use(async req => {
    await setHeaders(req);
    const msalAccessToken = await getAccessToken();
    if (msalAccessToken) {
      req.headers['Authorization'] = `Bearer ${msalAccessToken}`;
    }
    return req;
  });

  Api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log('aaaaaaaaaaaaaaaaaaaaa 401');
        //login();
      }
      return Promise.reject(error);
    },
  );

  return Api;
};

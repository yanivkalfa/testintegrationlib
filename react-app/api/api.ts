import axios, {AxiosError, AxiosResponse} from 'axios';
import {getAccessToken, login} from '../managers/AuthManager';
import {setHeaders} from '../managers/SitesManager';

const baseURL = 'https://hotam.dev.digital.idf.il/api/field/development';

export const createApiInstance = (route?: string) => {
  const Api = axios.create({
    baseURL: `${baseURL}${route}`,
    responseType: 'json',
    withCredentials: true,
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

import axios, { AxiosError, AxiosResponse } from "axios";

enum MethodApiEnum {
  get = "get",
  post = "post",
  update = "update",
  delete = "delete",
}

const instance = axios.create({
  baseURL: `/api/`,
  headers: { "Content-type": "application/json" },
});

const responseBody = (response: AxiosResponse<any>) => response.data;

const responseError = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    throw new Error(err.response?.data.message || err.response?.data.error);
  } else {
    throw new Error(err.message);
  }
};

const requests = {
  get: (url: string) =>
    instance.get(url).then(responseBody).catch(responseError),
  post: (url: string, body: {}) =>
    instance.post(url, body).then(responseBody).catch(responseError),
  put: (url: string, body: {}) =>
    instance.put(url, body).then(responseBody).catch(responseError),
  delete: (url: string) =>
    instance.delete(url).then(responseBody).catch(responseError),
};

export { MethodApiEnum };
export default requests;

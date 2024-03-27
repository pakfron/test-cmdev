import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("sending request");

    return config;
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("receive response");
    return response;
  },
  (error: AxiosError) => {
    console.log("receive axios error");
    return Promise.reject(error);
  }
);

export default axios;

import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER_API,
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
});

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;

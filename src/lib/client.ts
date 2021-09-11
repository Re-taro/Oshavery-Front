import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

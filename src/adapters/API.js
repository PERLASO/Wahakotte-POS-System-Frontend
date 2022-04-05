import axios from 'axios';
import { env_var } from './env';

export const api = axios.create({
    baseURL: env_var.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  
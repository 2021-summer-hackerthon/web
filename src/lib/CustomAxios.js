import { SERVER } from "config/config.json";
import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${SERVER}`, // default config
  headers: {
    access_token: sessionStorage.getItem("token"),
  },
});

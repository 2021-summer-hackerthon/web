import { customAxios } from "lib/CustomAxios";

export const GETPROFILE = async () => {
  const url = `/user`;
  const { data } = await customAxios.get(url);
  return data;
}
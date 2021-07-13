import { customAxios } from "lib/CustomAxios";

export const GETTOKEN = async (code) => {
  const url = `/token?code=${code}`;
  const { data } = await customAxios.get(url);
  return data;
}
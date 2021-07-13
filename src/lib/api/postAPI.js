import { SERVER } from "config/config.json";
import { customAxios } from "lib/CustomAxios";

export const GETCOMMENTPOSTS = async () => {
  const url = `/all?option=comment`;
  const { data } = await customAxios.get(url);
  return data;
};

export const GETSTARPOSTS = async () => {
  const url = `/all?option=star`;
  const { data } = await customAxios.get(url);
  return data;
};

export const GETFIVEPOSTS = async () => {
  const url = `/five`;
  const { data } = await customAxios.get(url);
  return data;
};

export const ADDPOSTS = async ({ data }) => {
  const { data } = await customAxios.post(url, data);
  return data;
};

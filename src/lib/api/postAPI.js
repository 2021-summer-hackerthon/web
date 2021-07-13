import { customAxios } from "lib/CustomAxios";

export const GETCOMMENTPOSTS = async () => {
  const url = `/hotplace/all?option=comment`;
  const { data } = await customAxios.get(url);
  console.log(data);
  return data;
};

export const GETSTARPOSTS = async () => {
  const url = `/hotplace/all?option=star`;
  const { data } = await customAxios.get(url);
  console.log(data);
  return data;
};

export const ADDPOSTS = async (a) => {
  const url = "/hotplace";
  const { data } = await customAxios.post(url, a);
  console.log(data);
  return data;
};

export const GETRECENTPOSTS = async () => {
  const url = `/hotplace/search?keyword`;
  const { data } = await customAxios.get(url);
  console.log(data);
  return data;
};

export const ADDCOMMENT = async (a) => {
  const url = `/comment/${a.idx}`;
  const { data } = await customAxios.post(url, a.data);
  console.log(data);
  return data;
};

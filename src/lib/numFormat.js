
export const numFormat = (data) => {

  data = Number(data).toString();
  if (Number(data) < 10 && data.length == 1)
    data = "0" + data;
  return data;
}
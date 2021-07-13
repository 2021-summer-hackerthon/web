export const getToken = () => {
  let token = false;

  const session = localStorage.getItem("token");

  if (session) {
    token = true;
  }

  return token;
}

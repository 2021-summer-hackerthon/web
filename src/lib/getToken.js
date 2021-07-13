export const getToken = () => {
  let token = false;

  const session = sessionStorage.getItem("token");
  
  if(session) {
    token = true;
  }

  return token;
}

import Nav from "components/Nav";
import { getToken } from "lib/getToken";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoginState } from "recoil/mapAtom";

const NavContainer = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  return (
    <Nav />
  );
}

export default NavContainer;
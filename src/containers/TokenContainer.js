import { GETTOKEN } from "lib/api/tokenAPI";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileState } from "recoil/profileAtom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const TokenContainer = () => {

  const [profile, setProfile] = useRecoilState(profileState);

  const query = String(useQuery()).substring(5);

  const getToken = async () => {

    const { data } = await GETTOKEN(query);

    setProfile(data.user.profileImage);

    window.localStorage.setItem('token', data.token);

    window.location.replace('/');
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      Loading...
    </>
  );
};

export default TokenContainer;
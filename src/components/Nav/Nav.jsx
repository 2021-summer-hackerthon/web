/*global kakao */
import { memo, useEffect, useState } from "react";
import MainLogo from "asset/MainLogo.svg";
import DefaultProfile from "asset/DefaultProfile.svg";
import classNames from "classnames";
import FadeIn from "react-fade-in";
import { useRecoilState } from "recoil";
import { isLoginState, mapInputState, placeState } from "recoil/mapAtom";
import { profileState } from "recoil/profileAtom";

const style = require("./Nav.scss");
const cx = classNames.bind(style);

const Nav = () => {
  const [place, setPlace] = useRecoilState(placeState);
  const [input, setInput] = useRecoilState(mapInputState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [isHover, setIsHover] = useState(false);

  const deltoken = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onSearchPlace = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPlace(e.target.value);
      setInput("");
    }
  };

  return (
    <FadeIn delay={400}>
      <div className={cx("Nav")}>
        <div className={cx("Nav-Logo")}>
          <img src={MainLogo} alt="메인로고" />
        </div>

        {isLogin ? (
          <>
            <div
              className={cx("Nav-Profile")}
              onClick={(e) => deltoken()}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {profile === null || profile === "" ? (
                <img src={DefaultProfile} alt="프로필 이미지" />
              ) : (
                <img src={profile} alt="프로필 이미지" />
              )}
            </div>
            {isHover && <div className={cx("Navlogout")}>로그아웃</div>}
          </>
        ) : (
          <div className={cx("Nav-Dodam")}>
            <a
              href="http://dauth.b1nd.com/login?clientId=35340c9845dc45aeafee3a3584018ca4312cb5b724d14fefaa95a8dbd9d97d2a&redirectUrl=http://matitsogo.kro.kr/callback"
              rel="noreferrer"
            >
              도담도담 로그인
            </a>
          </div>
        )}
        <div className={cx("Nav-Search")}>
          <input
            value={input}
            className={cx("Nav-Search-Input")}
            placeholder="음식점을 검색해주세요"
            onChange={onChangeInput}
            onKeyPress={onSearchPlace}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default memo(Nav);

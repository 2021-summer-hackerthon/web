/*global kakao */
import { memo, useEffect, useState } from "react";
import MainLogo from "asset/MainLogo.svg";
import DefaultProfile from "asset/DefaultProfile.svg";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { isLoginState, mapInputState, placeState } from "recoil/mapAtom";

const style = require("./Nav.scss");
const cx = classNames.bind(style);

const Nav = () => {
  const [place, setPlace] = useRecoilState(placeState);
  const [input, setInput] = useRecoilState(mapInputState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

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
    <div className={cx("Nav")}>
      <div className={cx("Nav-Logo")}>
        <img src={MainLogo} alt="메인로고" />
      </div>

      {isLogin ? (
        <div className={cx("Nav-Profile")}>
          <img src={DefaultProfile} alt="프로필 이미지" />
        </div>
      ) : (
        <div className={cx("Nav-Dodam")}>
          <a
            href="http://dauth.b1nd.com/login?clientId=35340c9845dc45aeafee3a3584018ca4312cb5b724d14fefaa95a8dbd9d97d2a&redirectUrl=http://localhost:3000/callback"
            target="_blank"
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
  );
};

export default memo(Nav);

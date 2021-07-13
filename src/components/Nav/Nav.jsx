import { memo, useEffect, useState } from "react";
import MainLogo from "asset/MainLogo.svg";
import classNames from "classnames";

const style = require("./Nav.scss");
const cx = classNames.bind(style);

const Nav = () => {
  const [search, setSearch] = useState("");
  let isLogin = false;
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={cx("Nav")}>
      <div className={cx("Nav-Logo")}>
        <img src={MainLogo} alt="메인로고" />
      </div>

      {isLogin ? (
        <div className={cx("Nav-Profile")}></div>
      ) : (
        <div className={cx("Nav-Dodam")}>
          <a
            href="http://dauth.b1nd.com/login?clientId=35340c9845dc45aeafee3a3584018ca4312cb5b724d14fefaa95a8dbd9d97d2a&redirectUrl=http://localhost:3000/callback"
            target="_blank"
          >
            도담도담 로그인
          </a>
        </div>
      )}
      <div className={cx("Nav-Search")}>
        <input
          className={cx("Nav-Search-Input")}
          placeholder="음식점을 검색해주세요"
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
};

export default memo(Nav);

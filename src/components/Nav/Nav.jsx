import { memo, useEffect, useState } from "react";
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
      <div className={cx("Nav-Logo")}></div>
      <div className={cx("Nav-Search")}>
        <input
          className={cx("Nav-Search-Input")}
          placeholder="음식점을 검색해주세요"
          onChange={onChangeSearch}
        />
        <div className={cx("Nav-Search-Logo")}>대충로고</div>
      </div>
      {isLogin ? (
        <div className={cx("Nav-Profile")}></div>
      ) : (
        <div className={cx("Nav-Dodam")}>
          도담도담 로그인
        </div>
      )}
    </div>
  );
};

export default memo(Nav);

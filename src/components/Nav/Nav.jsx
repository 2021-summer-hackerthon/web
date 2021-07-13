import { memo } from "react";
import classNames from "classnames";

const style = require("./Nav.scss");
const cx = classNames.bind(style);

const Nav = () => {
  return (
    <div className={cx("Nav")}>
      <div className={cx("Nav-Logo")}></div>
      
      <div className={cx("Nav-Search")}></div>
      <div className={cx("Nav-Profile")}></div>
    </div>
  );
};

export default memo(Nav);

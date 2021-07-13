import React, { memo } from "react";
import classNames from "classnames";

const style = require("./Main.scss");
const cx = classNames.bind(style);


const Main = () => {
  return (
    <div className={cx('MainWrapper')} >
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Main;

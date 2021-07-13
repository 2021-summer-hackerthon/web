import React, { memo } from "react";
import classNames from "classnames";
import FadeIn from "react-fade-in";

const style = require("./Main.scss");
const cx = classNames.bind(style);

const Main = () => {
  return (
    <FadeIn delay={400}>
      <div className={cx("MainWrapper")}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </FadeIn>
  );
};

export default Main;

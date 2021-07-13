/*global kakao */
import Main from "components/Main/Main";
import React, { memo, useCallback, useEffect, useState } from "react";

const MainContainer = () => {
  useEffect(() => {
    var container = document.getElementById("map");
    console.log("123");
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
  }, []);

  return <Main />;
};

export default memo(MainContainer);

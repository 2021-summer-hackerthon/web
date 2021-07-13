/*global kakao */
import Main from "components/Main/Main";
import Nav from "components/Nav";
import React, { memo, useCallback, useEffect, useState } from "react";

const MainContainer = () => {
  return (
    <>
      <Nav />
      <Main />
    </>
  );
};

export default memo(MainContainer);

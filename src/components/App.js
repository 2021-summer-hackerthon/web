import React from "react";
import { Switch, Route } from "react-router-dom";
import "styles/reset.scss";
import MainTemplate from "./MainTemplate/MainTemplate";
const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <MainTemplate />} />
    </Switch>
  );
};

export default App;

import TokenContainer from "containers/TokenContainer";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "styles/reset.scss";
import MainTemplate from "./MainTemplate/MainTemplate";
const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <MainTemplate />} />
      <Route path="/callback" render={() => <TokenContainer />} />
    </Switch>
  );
};

export default App;

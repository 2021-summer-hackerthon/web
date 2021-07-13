import MainContainer from "containers/MainContainer";
import classNames from "classnames";
import "styles/reset.scss";
import NavContainer from "containers/NavContainer";
import SideContainer from "containers/SideContainer";

const style = require("./App.scss");
const cx = classNames.bind(style);

const App = () => {
  return (
    <div className={cx("AppWrapper")}>
      <NavContainer />
      <div className={cx("AppWrapper-SideWrapper")}>
        <SideContainer />
        <MainContainer />
      </div>
    </div>
  );
};

export default App;

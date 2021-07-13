import MainContainer from "containers/MainContainer";
import NavContainer from "containers/NavContainer";
import classNames from "classnames";
import "styles/reset.scss";

const style = require("./App.scss");
const cx = classNames.bind(style);

const App = () => {
  return (
    <div className={cx('AppWrapper')} >
      <NavContainer />
      <MainContainer />
    </div>
  );
};

export default App;

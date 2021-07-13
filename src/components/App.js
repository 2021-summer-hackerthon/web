import MainContainer from "containers/MainContainer";
import classNames from "classnames";
import "styles/reset.scss";
import NavContainer from "containers/NavContainer";
import SideContainer from "containers/SideContainer";
import Info from "./Info/Info";
import { useRecoilState } from "recoil";
import { isClickCardState } from "recoil/mapAtom";

const style = require("./App.scss");
const cx = classNames.bind(style);

const App = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  return (
    <div className={cx("AppWrapper")}>
      <NavContainer />
      <div className={cx("AppWrapper-SideWrapper")}>
        <SideContainer />
        {isClick ? <Info /> : null}
        <MainContainer />
      </div>
    </div>
  );
};

export default App;

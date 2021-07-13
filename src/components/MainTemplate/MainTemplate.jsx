import MainContainer from "containers/MainContainer";
import classNames from "classnames";
import "styles/reset.scss";
import NavContainer from "containers/NavContainer";
import SideContainer from "containers/SideContainer";
import Info from "../Info";
import { useRecoilState } from "recoil";
import { isClickCardState } from "recoil/mapAtom";
import thumb from '../../asset/thumb.svg';
import { isModalState } from "recoil/modalAtom";

const style = require("./MainTemplate.scss");
const cx = classNames.bind(style);

const MainTemplate = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [isModal, setIsModal] = useRecoilState(isModalState);

  const modalOpen = () => {

    setIsModal(isModal ? false : true);
  }

  return (
    <div className={cx("AppWrapper")}>
      <div className={cx("AppWrapper-thumb")} onClick={modalOpen} >
        <img src={thumb} className={cx("AppWrapper-thumb-svg")} />
      </div>
      <NavContainer />
      <div className={cx("AppWrapper-SideWrapper")}>
        <SideContainer />
        {isClick && <Info />}
        <MainContainer />
      </div>
    </div>
  );
};

export default MainTemplate;

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
import ModalComponent from "components/Modal/Modal.component";

const style = require("./MainTemplate.scss");
const cx = classNames.bind(style);

const MainTemplate = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [isModal, setIsModal] = useRecoilState(isModalState);

  return (
    <div className={cx("AppWrapper")}>
      {isModal && <ModalComponent />}
      <div className={cx("AppWrapper-thumb")} onClick={() => setIsModal(true)}>
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

import classNames from "classnames";
import img from "asset/defaultCardImg.svg";
import { isClickCardState } from "recoil/mapAtom";
import { useRecoilState } from "recoil";
const style = require("./Info.scss");
const cx = classNames.bind(style);

const Info = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  return (
    <div className={cx("Info")}>
      <div className={cx("Info-Image")}>
        <img src={img} alt="이미지" />
      </div>
      <div className={cx("Info-Input")}>

        <div className={cx("Info-Input-TitleWrap")}>
          <div className={cx("Info-Input-TitleWrap-Profile")}>2209 손민재</div>
          <select className={cx("Info-Input-TitleWrap-Star")}>
            <option selected value="5.0">
              5.0
            </option>
            <option selected value="4.5">
              4.5
            </option>
            <option selected value="4.0">
              4.0
            </option>
            <option selected value="3.5">
              3.5
            </option>
            <option selected value="3.0">
              3.0
            </option>
            <option selected value="2.5">
              2.5
            </option>
            <option selected value="2.0">
              2.0
            </option>
            <option selected value="1.5">
              1.5
            </option>
            <option selected value="1.0">
              1.0
            </option>
            <option selected value="0.5">
              0.5
            </option>
          </select>
        </div>

        <input
          className={cx("Info-Input-review")}
          type="text"
          placeholder="리뷰를 입력해주세요"
        />
      </div>
    </div>
  );
};

export default Info;

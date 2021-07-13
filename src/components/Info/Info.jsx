import classNames from "classnames";
import img from "asset/defaultCardImg.svg";
import { isClickCardState } from "recoil/mapAtom";
import { useRecoilState } from "recoil";
import Comment from "components/Comment";
import { useEffect, useRef, useState } from "react";

const style = require("./Info.scss");
const cx = classNames.bind(style);

const Info = () => {
  const el = useRef();
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [star, setStar] = useState("5.0");
  const [review, setReview] = useState("");

  const onCloseModal = (e) => {
    if (isClick && (!el.current || !el.current.contains(e.target)))
      setIsClick(false);
  };

  useEffect(() => {
    window.addEventListener("click", onCloseModal);
    return () => window.removeEventListener("click", onCloseModal);
  }, []);

  return (
    <div className={cx("Info")} ref={el} >
      <div className={cx("Info-Image")}>
        <img src={img} alt="이미지" />
      </div>
      <div className={cx("Info-Input")}>
        <div className={cx("Info-Input-TitleWrap")}>
          <div className={cx("Info-Input-TitleWrap-Profile")}>2209 손민재</div>
          <select
            className={cx("Info-Input-TitleWrap-Star")}
            onChange={(e) => {
              setStar(e.target.value);
            }}
          >
            <option defaultValue="5.0">5.0</option>
            <option value="4.5">4.5</option>
            <option value="4.0">4.0</option>
            <option value="3.5">3.5</option>
            <option value="3.0">3.0</option>
            <option value="2.5">2.5</option>
            <option value="2.0">2.0</option>
            <option value="1.5">1.5</option>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
          </select>
        </div>

        <textarea
          className={cx("Info-Input-review")}
          type="text"
          placeholder="리뷰를 입력해주세요"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          value={review}
        />
      </div>
      <div className={cx("line")}></div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Info;

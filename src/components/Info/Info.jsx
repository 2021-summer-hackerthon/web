import classNames from "classnames";
import phoneIcon from "asset/phoneIcon.svg";
import DescIcon from "asset/DescIcon.svg";
import { isClickCardState, postInfoState } from "recoil/mapAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Comment from "components/Comment";
import { useEffect, useRef, useState } from "react";

const style = require("./Info.scss");
const cx = classNames.bind(style);

const Info = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [postInfo, setPostInfo] = useRecoilState(postInfoState);
  const [star, setStar] = useState("5.0");
  const [review, setReview] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const onClickAnonymous = () => {
    setAnonymous((anonymous) => !anonymous);
  };

  const onClickClose = () => {
    setIsClick(false);
  };

  console.log(postInfo);
  return (
    <div className={cx("Info")}>
      <div className={cx("Info-Close")} onClick={onClickClose}>
        ❌
      </div>
      <div className={cx("Info-Title")}>{postInfo.name}</div>
      <div className={cx("Info-Image")}>
        <img src={postInfo.image} alt="이미지" />
      </div>

      <div className={cx("Info-Content")}>
        <div className={cx("Info-Content-Top")}>
          <div className={cx("Info-Content-Top-StarStandard")}>/5</div>
          <div className={cx("Info-Content-Top-Star")}>
            {postInfo.star ? postInfo.star : 0}
          </div>
          <div className={cx("Info-Content-Top-StarLogo")}>★</div>
        </div>
        <div className={cx("Info-Content-Mid")}>
          <div className={cx("Info-Content-Mid-Phone")}>
            <img
              className={cx("Info-Content-Mid-Phone-Icon")}
              src={phoneIcon}
              alt="폰"
            />
            {postInfo.phone ? postInfo.phone : "휴대전화번호가 없습니다"}
          </div>
          <div className={cx("Info-Content-Mid-Address")}>
            <img
              className={cx("Info-Content-Mid-Address-Icon")}
              src={DescIcon}
              alt="마커"
            />
            {postInfo.desc ? postInfo.desc : "요약 정보가 없습니다"}
          </div>
        </div>
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
          <div className={cx("Info-Input-TitleWrap-Anonymous")}>
            <input
              type="checkbox"
              className={cx("Info-Input-TitleWrap-Anonymous-Input")}
              onClick={onClickAnonymous}
            />
            <div className={cx("Info-Input-TitleWrap-Anonymous-Title")}>
              익명
            </div>
          </div>
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
      {postInfo.comment
        ? postInfo.comment.map((v) => {
            return <Comment />;
          })
        : null}
    </div>
  );
};

export default Info;

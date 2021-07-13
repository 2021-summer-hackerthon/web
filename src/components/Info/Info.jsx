import classNames from "classnames";
import phoneIcon from "asset/phoneIcon.svg";
import DescIcon from "asset/DescIcon.svg";
import xBtn from "asset/xButton.svg";
import { isClickCardState, postInfoState } from "recoil/mapAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Comment from "components/Comment";
import { useEffect, useRef, useState } from "react";
import FadeIn from "react-fade-in";
import Swal from "sweetalert2";
import { ADDCOMMENT, GETPOSTINFO } from "lib/api/postAPI";
import { getToken } from "lib/getToken";
import { myGradeState, myNameState, myNumberState, myRoomState } from "recoil/profileAtom";
import { numFormat } from "lib/numFormat";

const style = require("./Info.scss");
const cx = classNames.bind(style);

const Info = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [postInfo, setPostInfo] = useRecoilState(postInfoState);
  const [star, setStar] = useState("5.0");
  const [review, setReview] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [username, setUsername] = useRecoilState(myNameState);
  const [myGrade, setMyGrade] = useRecoilState(myGradeState);
  const [myRoom, setMyRoom] = useRecoilState(myRoomState);
  const [myNumber, setMyNumber] = useRecoilState(myNumberState);

  const onClickAnonymous = () => {
    setAnonymous((anonymous) => !anonymous);
  };

  const onClickClose = () => {
    setIsClick(false);
  };

  const getPostInfo = async () => {
    try {
      const data = await GETPOSTINFO(postInfo.idx);
      if (data.status === 200) {
        setPostInfo(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const addComment = async () => {
    try {
      const dto = {
        idx: postInfo.idx,
        data: {
          comment: review,
          anonymous,
          star: parseInt(star),
        },
      };

      const data = await ADDCOMMENT(dto);
      if (data.status === 200) {
        await Swal.fire({
          title: "성공",
          text: "리뷰 작성에 성공했어요",
          icon: "success",
        });
        await getPostInfo();
      }
    } catch (e) {
      throw e;
    }
  };

  const onEnterReview = (e) => {
    if (e.key === "Enter") {
      if (getToken() === false) {
        Swal.fire({
          title: "잠시만요",
          text: "로그인 해주세요",
          icon: "error",
        });
        return;
      }

      if (e.target.value.length === 0) {
        Swal.fire({
          title: "잠시만요",
          text: "내용을 채워주세요.",
          icon: "error",
        });
        return;
      }

      addComment();
      setReview("");
    }
  };

  console.log(postInfo);
  return (
    <div className={cx("Info")}>
      <div className={cx("Info-Close")} onClick={onClickClose}>
        <img src={xBtn} alt="x" />
      </div>
      <div className={cx("Info-Title")}>{postInfo.name}</div>
      <div className={cx("Info-Image")}>
        <img src={postInfo.image} alt="이미지" />
      </div>

      <div className={cx("Info-Content")}>
        <div className={cx("Info-Content-Top")}>
          <div className={cx("Info-Content-Top-StarLogo")}>★</div>
          <div className={cx("Info-Content-Top-Star")}>
            {postInfo.star ? postInfo.star.toFixed(2) : 0}
          </div>
          <div className={cx("Info-Content-Top-StarStandard")}>/5</div>
        </div>

        <div className={cx("Info-Content-Mid")}>
          <div className={cx("Info-Content-Mid-Phone")}>
            <img
              className={cx("Info-Content-Mid-Phone-Icon")}
              src={phoneIcon}
              alt="폰"
            />
            <div className={cx("Info-Content-Mid-Phone-Content")}>
              {postInfo.phone ? postInfo.phone : "휴대전화번호가 없습니다"}
            </div>
          </div>
          <div className={cx("Info-Content-Mid-Desc")}>
            <img
              className={cx("Info-Content-Mid-Desc-Icon")}
              src={DescIcon}
              alt="마커"
            />
            <div className={cx("Info-Content-Mid-Desc-Content")}>
              {postInfo.desc ? postInfo.desc : "요약 정보가 없습니다"}
            </div>
          </div>
        </div>
      </div>

      <div className={cx("Info-Input")}>
        <div className={cx("Info-Input-TitleWrap")}>
          <div className={cx("Info-Input-TitleWrap-Profile")}>{myGrade}{myRoom}{numFormat(myNumber)} {username}</div>
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
          onKeyPress={onEnterReview}
          value={review}
        />
      </div>
      <div className={cx("line")}></div>
      {postInfo.comment
        ? postInfo.comment.map((v) => {
          return (
            <Comment
              key={v.idx}
              idx={v.idx}
              comment={v.comment}
              anonymous={v.anonymous}
              star={v.star}
              user={v.user}
            />
          );
        })
        : null}
      <FadeIn delay={100}>
        {postInfo.comment
          ? postInfo.comment.map((v) => {
            return (
              <Comment
                key={v.idx}
                idx={v.idx}
                comment={v.comment}
                anonymous={v.anonymous}
                star={v.star}
                user={v.user}
              />
            );
          })
          : null}
      </FadeIn>
    </div>
  );
};

export default Info;

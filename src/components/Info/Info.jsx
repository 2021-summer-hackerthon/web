import classNames from "classnames";
import phoneIcon from "asset/phoneIcon.svg";
import DescIcon from "asset/DescIcon.svg";
import xBtn from "asset/xButton.svg";
import {
  allCommentPostsState,
  allRecentPostsState,
  allStarPostsState,
  isClickCardState,
  postInfoState,
} from "recoil/mapAtom";
import { useRecoilState } from "recoil";
import Comment from "components/Comment";
import { useState } from "react";
import FadeIn from "react-fade-in";
import Swal from "sweetalert2";
import {
  ADDCOMMENT,
  GETCOMMENTPOSTS,
  GETPOSTINFO,
  GETRECENTPOSTS,
  GETSTARPOSTS,
} from "lib/api/postAPI";
import { getToken } from "lib/getToken";
import {
  myGradeState,
  myNameState,
  myNumberState,
  myRoomState,
} from "recoil/profileAtom";
import { numFormat } from "lib/numFormat";
import Star from "components/Star/Star";

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
  const [allStarPosts, setAllStarPosts] = useRecoilState(allStarPostsState);
  const [allCommentPosts, setAllCommentPosts] =
    useRecoilState(allCommentPostsState);
  const [allRecentPosts, setAllRecentPosts] =
    useRecoilState(allRecentPostsState);

  const getAllStarPosts = async () => {
    try {
      const data = await GETSTARPOSTS();
      if (data.status === 200) {
        setAllStarPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const getAllCommentPosts = async () => {
    try {
      const data = await GETCOMMENTPOSTS();
      if (data.status === 200) {
        setAllCommentPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const getAllRecentPosts = async () => {
    try {
      const data = await GETRECENTPOSTS();
      if (data.status === 200) {
        setAllRecentPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };
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
          star: parseFloat(star),
        },
      };

      const data = await ADDCOMMENT(dto);
      if (data.status === 200) {
        await Swal.fire({
          title: "??????",
          text: "?????? ????????? ???????????????",
          icon: "success",
        });
        getAllStarPosts();
        getAllCommentPosts();
        getAllRecentPosts();
        getPostInfo();
      }
    } catch (e) {
      throw e;
    }
  };

  const onEnterReview = (e) => {
    if (e.key === "Enter") {
      if (getToken() === false) {
        Swal.fire({
          title: "????????????",
          text: "????????? ????????????",
          icon: "error",
        });
        return;
      }

      if (e.target.value.length === 0) {
        Swal.fire({
          title: "????????????",
          text: "????????? ???????????????.",
          icon: "error",
        });
        return;
      }

      addComment();
      setReview("");
    }
  };

  return (
    <div className={cx("Info")}>
      <div className={cx("Info-Close")} onClick={onClickClose}>
        <img src={xBtn} alt="x" />
      </div>
      <div className={cx("Info-Title")}>{postInfo.name}</div>
      <div className={cx("Info-Image")}>
        <img src={postInfo.image} alt="?????????" />
      </div>

      <div className={cx("Info-Content")}>
        <div className={cx("Info-Content-Top")}>
          <div className={cx("Info-Content-Top-StarLogo")}>???</div>
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
              alt="???"
            />
            <div className={cx("Info-Content-Mid-Phone-Content")}>
              {postInfo.phone ? postInfo.phone : "????????????????????? ????????????"}
            </div>
          </div>
          <div className={cx("Info-Content-Mid-Desc")}>
            <img
              className={cx("Info-Content-Mid-Desc-Icon")}
              src={DescIcon}
              alt="??????"
            />
            <div className={cx("Info-Content-Mid-Desc-Content")}>
              {postInfo.discript ? postInfo.discript : "?????? ????????? ????????????"}
            </div>
          </div>
        </div>
      </div>

      <div className={cx("Info-Input")}>
        <div className={cx("Info-Input-TitleWrap")}>
          <div className={cx("Info-Input-TitleWrap-Profile")}>
            {myGrade}
            {myRoom}
            {numFormat(myNumber)} {username}
          </div>
          <Star star={star} setStar={setStar} />
          <div className={cx("Info-Input-TitleWrap-Anonymous")}>
            <input
              type="checkbox"
              className={cx("Info-Input-TitleWrap-Anonymous-Input")}
              onClick={onClickAnonymous}
            />
            <div className={cx("Info-Input-TitleWrap-Anonymous-Title")}>
              ??????
            </div>
          </div>
        </div>

        <textarea
          className={cx("Info-Input-review")}
          type="text"
          placeholder="????????? ??????????????????"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          onKeyPress={onEnterReview}
          value={review}
        />
      </div>
      <div className={cx("line")}></div>
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

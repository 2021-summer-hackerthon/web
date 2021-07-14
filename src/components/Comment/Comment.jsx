import classNames from "classnames";
import { Rate } from "antd";
import "antd/dist/antd.css";
import { numFormat } from "lib/numFormat";
import { useRecoilState, useRecoilValue } from "recoil";
import { myNameState } from "recoil/profileAtom";
import xBtn from "asset/xButton.svg";
import Swal from "sweetalert2";
import {
  DELETECOMMENT,
  GETCOMMENTPOSTS,
  GETPOSTINFO,
  GETRECENTPOSTS,
  GETSTARPOSTS,
} from "lib/api/postAPI";
import {
  allCommentPostsState,
  allRecentPostsState,
  allStarPostsState,
  postInfoState,
} from "recoil/mapAtom";
import { getToken } from "lib/getToken";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star, user }) => {
  const myName = useRecoilValue(myNameState);
  const { grade, room, number, name } = user;
  const [postInfo, setPostInfo] = useRecoilState(postInfoState);
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

  const onDeleteComment = async (idx) => {
    if (getToken() === false) {
      Swal.fire({
        title: "잠시만요",
        text: "로그인 해주세요",
        icon: "error",
      });
      return;
    }

    try {
      const data = await DELETECOMMENT(idx);

      if (data.status === 200) {
        Swal.fire({
          title: "성공",
          text: "댓글을 지우는데 성공했어요",
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

  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {anonymous ? "익명" : `${grade}${room}${numFormat(number)} ${name}`}
        </div>
        {myName === name ? (
          <div
            className={cx("Comment-TitleWrap-Close")}
            onClick={() => {
              onDeleteComment(idx);
            }}
          >
            <img src={xBtn} alt="삭제" />
          </div>
        ) : null}
        <Rate
          allowHalf
          disabled
          className={cx("Comment-TitleWrap-Star")}
          defaultValue={parseFloat(star)}
        />
      </div>
      <div className={cx("Comment-Content")}>{comment}</div>
    </div>
  );
};

export default Comment;

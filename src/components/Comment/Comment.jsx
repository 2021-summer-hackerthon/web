import classNames from "classnames";
import { numFormat } from "lib/numFormat";
import { useState } from "react";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star, user }) => {
  const {
    grade,
    room,
    number,
    name
  } = user;

  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {/* {user} */}
          {anonymous ? "익명" : `${grade}${room}${numFormat(number)} ${name}`}
        </div>
        <div className={cx("Comment-TitleWrap-Star")}>* * * * *</div>
      </div>
      <div className={cx("Comment-Content")}>{comment}</div>
    </div>
  );
};

export default Comment;

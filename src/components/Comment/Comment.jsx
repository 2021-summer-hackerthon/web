import classNames from "classnames";
import { useState } from "react";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star }) => {
  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {anonymous ? "익명" : "2209 손민재"}
        </div>
        <div className={cx("Comment-TitleWrap-Star")}>* * * * *</div>
      </div>
      <div className={cx("Comment-Content")}>{comment}</div>
    </div>
  );
};

export default Comment;

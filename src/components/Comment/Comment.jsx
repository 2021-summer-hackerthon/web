import classNames from "classnames";
import { Rate } from "antd";
import "antd/dist/antd.css";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star }) => {
  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {anonymous ? "익명" : "2209 손민재"}
        </div>
        <Rate
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

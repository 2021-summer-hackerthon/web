import classNames from "classnames";
import { Rate } from "antd";
import "antd/dist/antd.css";
import { numFormat } from "lib/numFormat";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star, user }) => {
  const { grade, room, number, name } = user;
  console.log(star);
  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {/* {user} */}
          {anonymous ? "익명" : `${grade}${room}${numFormat(number)} ${name}`}
        </div>
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

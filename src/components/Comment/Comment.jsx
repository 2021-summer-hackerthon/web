import classNames from "classnames";
import { Rate } from "antd";
import "antd/dist/antd.css";
import { numFormat } from "lib/numFormat";
import { useRecoilValue } from "recoil";
import { myNameState } from "recoil/profileAtom";
import xBtn from "asset/xButton.svg";

const style = require("./Comment.scss");
const cx = classNames.bind(style);

const Comment = ({ idx, comment, anonymous, star, user }) => {
  const myName = useRecoilValue(myNameState);
  const { grade, room, number, name } = user;
  return (
    <div className={cx("Comment")}>
      <div className={cx("Comment-TitleWrap")}>
        <div className={cx("Comment-TitleWrap-Profile")}>
          {anonymous ? "익명" : `${grade}${room}${numFormat(number)} ${name}`}
        </div>
        {myName === name ? (
          <div className={cx("Comment-TitleWrap-Close")}>
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

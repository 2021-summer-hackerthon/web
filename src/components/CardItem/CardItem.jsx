import classNames from "classnames";
import { useRecoilState } from "recoil";
import { isClickCardState, postInfoState } from "recoil/mapAtom";

const style = require("./CardItem.scss");
const cx = classNames.bind(style);

const CardItem = ({
  idx,
  name,
  discript,
  x,
  y,
  phone,
  image,
  star,
  anonymous,
  comment,
}) => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const [postInfo, setPostInfo] = useRecoilState(postInfoState);
  const data = {
    idx,
    name,
    discript,
    x,
    y,
    phone,
    image,
    star,
    anonymous,
    comment,
  };
  const onClickCard = () => {
    setIsClick(true);
    setPostInfo(data);
  };

  return (
    <div className={cx("CardItem")}>
      <div
        className={cx("CardItem-Content")}
        onClick={onClickCard}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={cx("CardItem-Content-Footer")}>
          <div className={cx("CardItem-Content-Footer-Title")}>{name}</div>
          <div className={cx("CardItem-Content-Footer-StarStandard")}>/5</div>
          <div className={cx("CardItem-Content-Footer-Star")}>
            {star ? star.toFixed(2) : 0}
          </div>
          <div className={cx("CardItem-Content-Footer-StarLogo")}>★</div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

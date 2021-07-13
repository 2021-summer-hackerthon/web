import classNames from "classnames";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isClickCardState, mapState, postInfoState } from "recoil/mapAtom";

const style = require("./CardItem.scss");
const cx = classNames.bind(style);

const CardItem = ({
  idx,
  name,
  desc,
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
    desc,
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
  // 서버에서 별점 이미지 이름 좌표

  // "idx": 7,
  // "name": "대구소프트웨어고등학교 급식",
  // "discript": "짱 맛없음",
  // "xPosition": "35.6632413",
  // "yPosition": "128.4134766",
  // "phone": "053-231-9240",
  // "image": "http://localhost:8811/public/2e349dbb-33bd-4bab-9764-1c6c5af50e43.png",
  // "anonymous": 1,
  // "comment": [],
  // "star": null

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
        <div className={cx("CardItem-Content-Title")}>{name}</div>
        <div className={cx("CardItem-Content-Footer")}>
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

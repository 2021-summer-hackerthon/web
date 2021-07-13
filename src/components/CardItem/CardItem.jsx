import classNames from "classnames";
import Info from "components/Info/Info";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isClickCardState } from "recoil/mapAtom";

const style = require("./CardItem.scss");
const cx = classNames.bind(style);

const CardItem = () => {
  const [isClick, setIsClick] = useRecoilState(isClickCardState);
  const onClickCard = () => {
    setIsClick(true);
  };
  // 서버에서 별점 이미지 이름 좌표
  return (
    <div className={cx("CardItem")}>
      <div className={cx("CardItem-Content")} onClick={onClickCard}>
        <div className={cx("CardItem-Content-Title")}>공화춘</div>
        <div className={cx("CardItem-Content-Footer")}>
          <div className={cx("CardItem-Content-Footer-StarStandard")}>/5</div>
          <div className={cx("CardItem-Content-Footer-Star")}>4.4 </div>
          <div className={cx("CardItem-Content-Footer-StarLogo")}>★</div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

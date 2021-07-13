import classNames from "classnames";
import CardItem from "components/CardItem/CardItem";
import { useRecoilState } from "recoil";
import { AllPostsCategoryState } from "recoil/mapAtom";

const style = require("./Side.scss");
const cx = classNames.bind(style);

const Side = () => {
  const [category, setCategory] = useRecoilState(AllPostsCategoryState);

  return (
    <div className={cx("Side")}>
      <div className={cx("Side-TitleWrap")}>
        <div
          className={cx("Side-TitleWrap-Category")}
          onClick={() => {
            setCategory(0);
          }}
        >
          최신순
        </div>
        <div
          className={cx("Side-TitleWrap-Category")}
          onClick={() => {
            setCategory(1);
          }}
        >
          댓글순
        </div>
        <div
          className={cx("Side-TitleWrap-Category")}
          onClick={() => {
            setCategory(2);
          }}
        >
          평점순
        </div>
      </div>
      {/* category state에 따라서 다르게 렌더링 */}
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </div>
  );
};

export default Side;

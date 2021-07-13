import classNames from "classnames";
import CardItem from "components/CardItem/CardItem";

const style = require("./Side.scss");
const cx = classNames.bind(style);

const Side = () => {
  return (
    <div className={cx('Side')}>
      <CardItem />
    </div>
  );
}

export default Side;
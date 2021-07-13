import { Rate } from "antd";
import "antd/lib/rate/style/index.css";

const Star = ({star, setStar}) => {
  return (
    <Rate
      allowHalf
      value={parseFloat(star)}
      onChange={(e) => {
        let str = e.toString();
        setStar(str);
      }}
    />
  );
};

export default Star;
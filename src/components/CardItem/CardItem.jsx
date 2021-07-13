import classNames from 'classnames';

const style = require("./CardItem.scss");
const cx = classNames.bind(style);

const CardItem = () => {
  // 서버에서 별점 이미지 이름 좌표
  return (
    <div className={cx('CardItem')}>
      <div className={cx('CardItem-Content')}>
        <div className={cx('CardItem-Content-Title')}>공화춘</div>
        <div className={cx('CardItem-Content-Footer')}>
          <div className={cx('CardItem-Content-Footer-StarStandard')}>/5</div>
          <div className={cx('CardItem-Content-Footer-Star')}>4.4 </div>
          <div className={cx('CardItem-Content-Footer-StarLogo')}>★</div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
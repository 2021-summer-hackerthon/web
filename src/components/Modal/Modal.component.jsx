import classNames from "classnames";

const style = require("./Modal.component.scss");
const cx = classNames.bind(style);

const ModalComponent = () => {

  return (
    <div className={cx('Modal')}>
    </div>
  );
};

export default ModalComponent;

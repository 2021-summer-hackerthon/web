import classNames from "classnames";
import MainContainer from "containers/MainContainer";
import { useRecoilState } from "recoil";
import { isModalState } from "recoil/modalAtom";
import xButton from '../../asset/xButton.svg';

const style = require("./Modal.component.scss");
const cx = classNames.bind(style);

const ModalComponent = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);

  return (
    <>
      <div className={cx('Modal')} />
      <div className={cx('modalContainer')}>
        <div className={cx('modalContainer-topText')}>
          맛집을 추천해 주세요!
          <div className={cx('modalContainer-xButton')} onClick={() => setIsModal(false)} >
            <img src={xButton} alt='xButton' />
          </div>
        </div>

        <div className={cx('modalContainer-submit')} >
          제출
        </div>

        <textarea className={cx('modalContainer-descript')} type='textarea' placeholder='맛집을 요약해주세요' />

        <div className={cx('modalContainer-Input')} >
          맛집 이름
        </div>
        <input className={cx('modalContainer-Input-box')} />

        <div className={cx('modalContainer-call')} >
          맛집 전화번호
        </div>
        <input className={cx('modalContainer-call-input')} />

        <div className={cx('modalContainer-call')} >
          맛집 주소
        </div>
        <input className={cx('modalContainer-call-input')} placeholder='지도에서 클릭해주세요' />


        <div className={cx('modalContainer-map')} >
          <MainContainer />
        </div>

      </div>
    </>
  );
};

export default ModalComponent;

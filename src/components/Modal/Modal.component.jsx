import classNames from "classnames";
import MainContainer from "containers/MainContainer";
import makePhoneNumber from "lib/makePhoneNumber";
import { useRecoilState } from "recoil";
import { allCommentPostsState, allRecentPostsState, allStarPostsState, clickAddressState, mapState } from "recoil/mapAtom";
import {
  isModalState,
  modalDescriptState,
  modalImageState,
  modalNameState,
  modalPhoneState,
} from "recoil/modalAtom";
import xButton from "../../asset/xButton.svg";
import camera from "../../asset/camera.svg";
import { ADDPOST, GETCOMMENTPOSTS, GETRECENTPOSTS, GETSTARPOSTS, UPLOADIMAGE } from "lib/api/postAPI";
import Swal from "sweetalert2";
import { getToken } from "lib/getToken";

const style = require("./Modal.component.scss");
const cx = classNames.bind(style);

const ModalComponent = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [modalDescript, setModalDescript] = useRecoilState(modalDescriptState);
  const [modalName, setModalName] = useRecoilState(modalNameState);
  const [modalPhone, setModalPhone] = useRecoilState(modalPhoneState);
  const [address, setAddress] = useRecoilState(clickAddressState);
  const [image, setImage] = useRecoilState(modalImageState);
  const [allStarPosts, setAllStarPosts] = useRecoilState(allStarPostsState);
  const [allCommentPosts, setAllCommentPosts] =
    useRecoilState(allCommentPostsState);
  const [allRecentPosts, setAllRecentPosts] =
    useRecoilState(allRecentPostsState);

  const getAllStarPosts = async () => {
    try {
      const data = await GETSTARPOSTS();
      if (data.status === 200) {
        setAllStarPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const getAllCommentPosts = async () => {
    try {
      const data = await GETCOMMENTPOSTS();
      if (data.status === 200) {
        setAllCommentPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const getAllRecentPosts = async () => {
    try {
      const data = await GETRECENTPOSTS();
      if (data.status === 200) {
        setAllRecentPosts(data.data);
      }
    } catch (e) {
      throw e;
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("images", file);


    try {
      const { data } = await UPLOADIMAGE(formData);

      setImage(data.files[0]);
    } catch (err) {
      alert("알맞지 않은 형식입니다 (jpg, jpeg, png만 업로드 가능)");
    }
  };

  const addPost = async () => {
    const data = {
      name: modalName,
      discript: modalDescript,
      phone: modalPhone,
      xPosition: String(address.x),
      yPosition: String(address.y),
      image,
      anonymous: true,
    };

    if (getToken() === false) {
      Swal.fire({
        title: "잠시만요",
        text: "로그인 해주세요",
        icon: "error",
      });
      return;
    }


    try {
      await ADDPOST(data);

      Swal.fire({
        title: "성공",
        text: "맛집을 생성했어요",
        icon: "success",
      });

      getAllCommentPosts();
      getAllRecentPosts();
      getAllStarPosts();

      setModalPhone('');
      setModalName('');
      setModalDescript('');
      setAddress('');
      setImage('');
    } catch (err) {
      throw err;
    } finally {
      setIsModal(false);
    }
  };

  return (
    <>
      <div className={cx("Modal")} />
      <div className={cx("modalContainer")}>
        <div className={cx("modalContainer-topText")}>
          맛집을 추천해 주세요!
          <div
            className={cx("modalContainer-xButton")}
            onClick={() => setIsModal(false)}
          >
            <img src={xButton} alt="xButton" />
          </div>
        </div>

        <div className={cx("modalContainer-submit")} onClick={() => addPost()}>
          제출
        </div>

        <textarea
          className={cx("modalContainer-descript")}
          type="textarea"
          placeholder="맛집을 요약해주세요"
          value={modalDescript}
          onChange={(e) => setModalDescript(e.target.value)}
        />

        <label for="input-file">
          <img
            className={cx("modalContainer-camera")}
            src={camera}
            alt="upload"
          />{" "}
        </label>
        <input
          type="file"
          id="input-file"
          style={{ display: "none" }}
          onChange={(e) => uploadImage(e)}
        />

        <div className={cx("modalContainer-Input")}>맛집 이름</div>
        <input
          className={cx("modalContainer-Input-box")}
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
        />

        <div className={cx("modalContainer-call")}>맛집 전화번호</div>
        <input
          className={cx("modalContainer-call-input")}
          value={modalPhone}
          onChange={(e) => setModalPhone(makePhoneNumber(e.target.value))}
        />

        <div className={cx("modalContainer-call")}>맛집 주소</div>
        <input
          className={cx("modalContainer-call-input")}
          placeholder="지도에서 클릭해주세요"
          value={address.title}
        />

        <div className={cx("modalContainer-map")}>
          <MainContainer />
        </div>
      </div>
    </>
  );
};

export default ModalComponent;

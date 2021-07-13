import Side from "components/Side/Side";
import { GETCOMMENTPOSTS, GETRECENTPOSTS, GETSTARPOSTS } from "lib/api/postAPI";
import { useRecoilState } from "recoil";
import {
  allCommentPostsState,
  allRecentPostsState,
  allStarPostsState,
} from "recoil/mapAtom";

const SideContainer = () => {
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

  return (
    <Side
      getAllRecentPosts={getAllRecentPosts}
      getAllCommentPosts={getAllCommentPosts}
      getAllStarPosts={getAllStarPosts}
    />
  );
};

export default SideContainer;

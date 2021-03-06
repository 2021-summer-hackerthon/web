import classNames from "classnames";
import CardItem from "components/CardItem/CardItem";
import { useEffect } from "react";
import FadeIn from "react-fade-in";
import { useRecoilState } from "recoil";
import { AllPostsCategoryState } from "recoil/mapAtom";
import {
  allCommentPostsState,
  allRecentPostsState,
  allStarPostsState,
} from "recoil/mapAtom";

const style = require("./Side.scss");
const cx = classNames.bind(style);

const Side = ({ getAllStarPosts, getAllCommentPosts, getAllRecentPosts }) => {
  const [category, setCategory] = useRecoilState(AllPostsCategoryState);
  const [allStarPosts, setAllStarPosts] = useRecoilState(allStarPostsState);
  const [allCommentPosts, setAllCommentPosts] =
    useRecoilState(allCommentPostsState);
  const [allRecentPosts, setAllRecentPosts] =
    useRecoilState(allRecentPostsState);

  useEffect(() => {
    getAllStarPosts();
    getAllCommentPosts();
    getAllRecentPosts();
  }, []);

  const categorySwitch = () => {
    switch (category) {
      case 0:
        return allRecentPosts.map((v) => {
          return (
            <FadeIn delay={200} key={v.idx} >
              <CardItem
                key={v.idx}
                idx={v.idx}
                name={v.name}
                discript={v.discript}
                x={v.xPosition}
                y={v.yPosition}
                phone={v.phone}
                image={v.image}
                star={v.star}
                anonymous={v.anonymous}
                comment={v.comment}
              />
            </FadeIn>
          );
        });
      case 1:
        return allCommentPosts.map((v) => {
          return (
            <FadeIn delay={200} key={v.idx} >
              <CardItem
                key={v.idx}
                idx={v.idx}
                name={v.name}
                discript={v.discript}
                x={v.xPosition}
                y={v.yPosition}
                phone={v.phone}
                image={v.image}
                star={v.star}
                anonymous={v.anonymous}
                comment={v.comment}
              />
            </FadeIn>
          );
        });
      default:
        return allStarPosts.map((v) => {
          return (
            <FadeIn delay={200} key={v.idx} >
              <CardItem
                key={v.idx}
                idx={v.idx}
                name={v.name}
                discript={v.discript}
                x={v.xPosition}
                y={v.yPosition}
                phone={v.phone}
                image={v.image}
                anonymous={v.anonymous}
                comment={v.comment}
                star={v.star}
              />
            </FadeIn>
          );
        });
    }
  };

  return (
    <FadeIn delay={200}>
      <div className={cx("Side")}>
        <div className={cx("Side-TitleWrap")}>
          <div
            className={cx("Side-TitleWrap-Category")}
            onClick={() => {
              setCategory(0);
            }}
          >
            ?????????
          </div>
          <div
            className={cx("Side-TitleWrap-Category")}
            onClick={() => {
              setCategory(1);
            }}
          >
            ?????????
          </div>
          <div
            className={cx("Side-TitleWrap-Category")}
            onClick={() => {
              setCategory(2);
            }}
          >
            ?????????
          </div>
        </div>
        {categorySwitch()}
      </div>
    </FadeIn>
  );
};

export default Side;

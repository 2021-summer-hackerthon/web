import { atom } from "recoil";

export const mapInputState = atom({
  key: "mapInput",
  default: "",
});

export const placeState = atom({
  key: "placeState",
  default: "",
});

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

export const isClickCardState = atom({
  key: "isClickCardState",
  default: false,
});

export const allCommentPostsState = atom({
  key: "allCommnetPosts",
  default: [],
});

export const allRecentPostsState = atom({
  key: "allRecentPostsState",
  default: [],
});

export const allStarPostsState = atom({
  key: "allStarPosts",
  default: [],
});

export const AllPostsCategoryState = atom({
  key: "AllPostsCategoryState",
  default: 0,
});

export const postInfoState = atom({
  key: "postInfoState",
  default: {},
});

export const postsMarkerState = atom({
  key: "postsMarKerState",
  default: [],
});

export const mapState = atom({
  key: "mapState",
  default: {},
});

export const clickAddressState = atom({
  key:'clickAddressState',
  default: {}
});
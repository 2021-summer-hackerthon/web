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

export const allCommentPosts = atom({
  key: "allCommnetPosts",
  default: [],
});

export const allStarPosts = atom({
  key: "allStarPosts",
  default: [],
});

export const fivePosts = atom({
  key: "fivePosts",
  default: [],
});

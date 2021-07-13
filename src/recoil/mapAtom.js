import { atom } from "recoil";

export const mapInputState = atom({
  key: 'mapInput',
  default: ""
});

export const placeState = atom({
  key: 'placeState',
  default: ""
})

export const isLoginState = atom({
  key:'isLoginState',
  default: false
});

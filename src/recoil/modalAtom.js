import { atom } from "recoil";

export const isModalState = atom({
  key: "isModal",
  default: false,
});

export const modalDescriptState = atom({
  key: 'modalDescript',
  default: '',
});

export const modalNameState = atom({
  key: 'modalName',
  default: '',
});

export const modalPhoneState = atom({
  key: 'modalPhone',
  default: '',
});

export const modalImageState = atom({
  key: 'modalImage',
  default: '',
});
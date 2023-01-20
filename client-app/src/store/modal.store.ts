import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: JSX.Element | null;
  title: string | null;
}

export default class ModalStore {
  handleOk: any | null = null;
  modal: Modal = {
    open: false,
    body: null,
    title: null,
  };
  
  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element, title: any = null) => {
    this.modal.open = true;
    this.modal.body = content;
    if (title) this.modal.title = title;
  };

  closeModal = () => {
    this.modal = {
      open: false,
      body: null,
      title: null,
    };
  };
}

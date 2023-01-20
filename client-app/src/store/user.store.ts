import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { LoginDTO, registerDTO, User } from "../models/User";
import { router } from "../routes/Routes";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  Loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: LoginDTO) => {
    this.Loading = true;
    try {
      const user = await agent.Accounts.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        user.image =
          user.image &&
          import.meta.env.VITE_API_URL.split("api")[0] +
            "image-upload/" +
            user.image;
        this.user = user;
        this.setRoleUser(user.token);
        this.Loading = false;
      });
      router.navigate("/");
      store.modalStore.closeModal();
    } catch (error) {
      runInAction(() => (this.Loading = false));
      return error;
    }
  };

  register = async (creds: registerDTO) => {
    this.Loading = true;
    try { 
      var user = await agent.Accounts.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        user.image =
          user.image &&
          import.meta.env.VITE_API_URL.split("api")[0] +
            "image-upload/" +
            user.image;
        this.user = user;
        this.setRoleUser(user.token);
        this.Loading = false;
      });
      store.modalStore.closeModal();
    } catch (error) {
      runInAction(() => (this.Loading = false));
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null; 
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Accounts.getCurrent();
      store.commonStore.setToken(user.token);
      runInAction(() => {
        user.image =
          user.image &&
          import.meta.env.VITE_API_URL.split("api")[0] +
            "image-upload/" +
            user.image;
        this.user = { ...user };
        this.setRoleUser(user.token);
      });
    } catch (error) {
      console.log(error);
    }
  };

  setRoleUser = (token: string) => {
    let claims = JSON.parse(window.atob(token.split(".")[1])).role;
    this.user!.roles = typeof claims === "string" ? [claims] : claims;
  };
}

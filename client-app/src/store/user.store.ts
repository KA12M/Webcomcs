import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import {
  LoginDTO,
  Profile,
  registerDTO,
  UpdateMe,
  User,
  ChangePasswordDTO,
} from "../models/User";
import { router } from "../routes/Routes";
import { store } from "./store";
import URLImage from "../utils/URL";
import { UserRole } from "../constants/UserRole";
import { RoutePath } from "../constants/RoutePath";

export default class UserStore {
  user: User | undefined = undefined;
  profile: Profile | null = null;
  Loading: boolean = false;
  loadingSubmit: boolean = false;

  accountTabCurrent: string = "0";

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setAccountTabCurrent = (val: string) => (this.accountTabCurrent = val);

  login = async (creds: LoginDTO) => {
    this.Loading = true;
    try {
      const user = await agent.Accounts.login(creds);
      store.commonStore.setToken(user.token);
      return runInAction(() => {
        user.image =
          user.image &&
          import.meta.env.VITE_API_URL.split("api")[0] +
            "image-upload/" +
            user.image;
        this.user = user;
        this.setRoleUser(user.token);
        this.Loading = false;

        router.navigate(RoutePath.home);
        store.modalStore.closeModal();
        return user;
      });
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
    this.user = undefined;
    this.profile = null;
    router.navigate(RoutePath.home);
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

  setProfile = (user: Profile) => {
    user.imagePreview = user.image && URLImage(user.image!);
    this.profile = user;
  };

  loadProfile = async (username: string) => {
    this.Loading = true;
    try {
      var response = await agent.Profiles.profile(username);
      if (response.isRole == UserRole.student)
        store.projectStore.loadProjectByUsername(username);
      runInAction(() => {
        this.setProfile(response);
        this.Loading = false;
      });
    } catch (error) {
      runInAction(() => (this.Loading = false));
      throw error;
    }
  };

  updateMe = async (data: UpdateMe) => {
    this.loadingSubmit = true;
    data.bio = data.bio || "";
    try {
      await agent.Accounts.updateMe(data);
      runInAction(() => {
        this.profile = Object.assign({}, this.profile, data);
        this.loadingSubmit = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingSubmit = false));
      throw error;
    }
  };

  resetPassword = async (data: ChangePasswordDTO) => {
    this.loadingSubmit = true;
    try {
      await agent.Accounts.changePassword(data);
      runInAction(() => {
        this.loadingSubmit = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingSubmit = false));
      throw error;
    }
  };  
}

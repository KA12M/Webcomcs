import { makeAutoObservable, runInAction } from "mobx";
import { HomePhoto, PhotoCreate } from "../models/HomePhoto";
import agent from "../api/agent";
import URLImage from "../utils/URL";

export class homePhotoStore {
  photoRegistry = new Map<string, HomePhoto>();
  tableBody: any[] = [];
  formBody: PhotoCreate = new PhotoCreate();

  isLoading: boolean = false;
  submitLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  GetPhotos = async (enableOnly: boolean) => {
    this.isLoading = true;
    try {
      var param = new URLSearchParams();
      param.append("enableOnly", enableOnly ? "true" : "false");
      var photos = await agent.HomePhotos.list(param);
      runInAction(() => {
        photos.forEach(this.setPhoto);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.isLoading = false));
      throw error;
    }
  };

  setTable = (temp: any[]) => (this.tableBody = temp);

  get Photos() {
    return Array.from(this.photoRegistry.values());
  }

  private setPhoto = (photo: HomePhoto) => {
    photo.url = URLImage(photo.url);
    this.photoRegistry.set(photo.id, photo);
  };

  hidden = async (photo: HomePhoto) => {
    try {
      await agent.HomePhotos.enable(photo.id);
      runInAction(() => {
        this.photoRegistry.set(photo.id, {
          ...photo,
          isEnable: !photo.isEnable,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  deletePhoto = async (id: string) => {
    this.isLoading = true;
    try {
      await agent.HomePhotos.delete(id);
      runInAction(() => {
        this.photoRegistry.delete(id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.isLoading = false));
      throw error;
    }
  };

  clearFormBody = () => (this.formBody = new PhotoCreate());

  addPhoto = async () => {
    if (!this.formBody.fileImage) return;
    this.submitLoading = true;
    try {
      await agent.HomePhotos.add(this.formBody);
      runInAction(() => (this.submitLoading = false));
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };
}

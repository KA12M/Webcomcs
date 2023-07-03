import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ChatComment } from "../models/ChatComment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { config } from "./../constants/config";
import { formatDateThai } from "../utils/accessor";

export class CourseCommentStore {
  comments: ChatComment[] = [];
  countShown: number = 8;
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCountShown = (num: number) => this.countShown = num;

  commentsByDate = () => {
    let comments = this.comments.slice(0, this.countShown);
    return comments.reduce((acc: any, comment) => {
      const dateString = formatDateThai(comment.createdAt);
      if (!acc[dateString]) {
        acc[dateString] = [];
      }
      acc[dateString].push(comment);
      return acc;
    }, {});
  };

  createHubConnection = (generationId: string) => {
    if (store.generationStore.generationSelect) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${config.chatSocket}?generationId=${generationId}`, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        // .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      this.hubConnection
        .start()
        .catch((err) =>
          console.log("Error establishing the connection: ", err)
        );

      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
        runInAction(() => {
          this.comments.unshift(comment);
        });
      });

      this.hubConnection.on("SendRemoveComment", (id: string) => {
        runInAction(() => {
          this.comments = this.comments.filter((a) => a.id !== id);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((err) => console.log("Error stopping connection: ", err));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: any) => {
    values.generationId = store.generationStore.generationSelect?.generation.id;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };

  removeComment = async (id: string) => {
    let generation = store.generationStore.generationSelect?.generation;
    try {
      return await this.hubConnection?.invoke("RemoveComment", {
        commentId: id,
        generationId: generation?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

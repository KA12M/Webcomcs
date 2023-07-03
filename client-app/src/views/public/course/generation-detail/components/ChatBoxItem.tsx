import React from "react";
import { ChatComment } from "../../../../../models/ChatComment";
import AvatarPlaceholder from "../../../../../components/AvatarPlaceholder";
import { Empty, Space } from "antd";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../../constants/RoutePath";
import { format } from "date-fns";
import { textToHtml } from "../../../../../utils/accessor";
import { DeleteOutlined } from "@ant-design/icons";
import URLImage from "../../../../../utils/URL";

const ChatBoxItem = ({
  commentsByDate,
  user,
  isHost,
  handleRemoveComment,
}: any) => {
  return (
    <div className="space-y-2">
      {commentsByDate.length < 1 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" />
      )}
      {commentsByDate.map(([date, comments]: any, index: number) => (
        <div key={index}>
          <p className="text-center text-gray-300">{date}</p>
          {comments.map((val: ChatComment, i: number) => (
            <div
              key={i}
              className="flex relative group hover:bg-gray-100 rounded-lg px-2"
            >
              <div className="flex-shrink-0 mr-2">
                {val.author && val.author.image ? (
                  <img
                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                    src={URLImage(val.author.image!)}
                  />
                ) : (
                  <AvatarPlaceholder
                    label={
                      (val.author && val.author.fullName[0]!) || "Anonymous"
                    }
                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  />
                )}
              </div>
              <div className="flex-1 p-2 leading-relaxed box-border">
                <Space>
                  <Link to={RoutePath.accountDetail(val.author && val.author.username || "")}>
                    <strong>
                      {(val.author && val.author.fullName.split(" ")[0]) ||
                        "Anonymous"}
                    </strong>
                  </Link>
                  <span className="text-xs text-gray-400">
                    {format(new Date(val.createdAt), "HH:mm")}
                  </span>
                </Space>
                <p className="text-sm">{textToHtml(val.body || "")}</p>
              </div>

              {((val.author && val.author.username == user?.username) ||
                isHost) && (
                <div
                  className="absolute top-0 right-0 hidden group-hover:block cursor-pointer p-2"
                  onClick={() => handleRemoveComment(val.id, val.author)}
                >
                  <DeleteOutlined />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatBoxItem;

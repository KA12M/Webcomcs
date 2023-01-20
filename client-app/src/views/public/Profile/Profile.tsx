import React from "react";
import { Avatar, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import { BiEditAlt } from "react-icons/bi";
import ButtonUI from "../../../components/ButtonUI";

const Profile = () => {
  const {
    userStore: { user },
  } = useStore();

  return (
    <div className="shadow-46 bg-white rounded-xl px-2 py-4">
      <Space>
        <Avatar
          size={"large"}
          icon={user?.image ? <img src={user?.image!} /> : <UserOutlined />}
        />
        <Paragraph
          editable={{
            icon: <BiEditAlt size={18} />,
            enterIcon: <BiEditAlt size={18} />,
            tooltip: "กดเพื่อแก้ไข",
            onStart: () => {},
            onChange: (word: string) => alert(word),
          }}
        >
          {user?.fullName}
        </Paragraph>

        <ButtonUI>save</ButtonUI>
      </Space>
    </div>
  );
};

export default observer(Profile);

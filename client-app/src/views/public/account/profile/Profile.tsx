import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { Image, Space, Typography, Badge, Upload, Button } from "antd";
import Title from "antd/es/typography/Title";
import { RcFile, UploadProps } from "antd/es/upload";
import ImgCrop from "antd-img-crop";

import { Profile as ProfileModel } from "../../../../models/User";
import { badgeRoleTypes } from "../../../../constants/UserRole";
import { config } from "../../../../constants/config";

const { Text } = Typography;

interface Props {
  user: ProfileModel | undefined;
  loading: boolean;
  onSubmit: (value: any) => any;
}

const AccountPage = ({ user, onSubmit, loading }: Props) => {
  const [temporary, setTemporary] = useState<RcFile | undefined>();
  const [upload, setUpload] = useState<RcFile | undefined>();

  const handleUploadFile: UploadProps["beforeUpload"] = (file: RcFile) => {
    setUpload(file);
  };

  const onSubmitUpload = async () => {
    await onSubmit({ ...user, fileImages: upload }).then(() => {
      setTemporary(upload);
      setUpload(undefined);
    });
  };

  return (
    <Space align="start" size={20}>
      <Badge.Ribbon
        text={badgeRoleTypes[user?.isRole][1]}
        color={badgeRoleTypes[user?.isRole][2]}
      >
        <ImgCrop modalTitle="สัดส่วนรูปภาพ" quality={100}>
          <Upload
            disabled={!user?.isMe}
            name="fileImages"
            showUploadList={false}
            beforeUpload={handleUploadFile}
          >
            <Image
              width={120}
              className="rounded-lg shadow-46"
              src={
                (upload && URL.createObjectURL(upload)) ||
                (temporary && URL.createObjectURL(temporary)) ||
                user?.imagePreview! ||
                config.baseURL + "/image/empty-user.jpg"
              }
              preview={user?.image != null && !user?.isMe}
            />
          </Upload>
        </ImgCrop>
      </Badge.Ribbon>

      <div className="py-2">
        <Title level={2}>
          <p>{user?.fullName}</p>
        </Title>
        <Text>
          <p>{user?.email}</p>
        </Text>
        {upload && (
          <Button
            loading={loading}
            type="primary"
            shape="round"
            onClick={onSubmitUpload}
          >
            บันทึก
          </Button>
        )}
      </div>
    </Space>
  );
};

export default observer(AccountPage);

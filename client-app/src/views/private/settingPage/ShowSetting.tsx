import React, { useState } from "react";
import { Button, Descriptions, Image, Space } from "antd";
import { observer } from "mobx-react-lite";

import { Setting } from "../../../models/Setting";
import MyParagraph from "./MyParagraph";
import Upload, { RcFile } from "antd/es/upload";

interface Props {
  setting: Setting;
  changeSetting: (setting: Setting) => void;
  preview: RcFile | undefined; 
  handleUploadFile: (file: RcFile, FileList: RcFile[]) => void;
}

const ShowSetting = ({
  setting,
  preview,
  changeSetting,
  handleUploadFile,
}: Props) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="โลโก้">
        <Space wrap>
          <Image
            src={
              preview
                ? URL.createObjectURL(preview)
                : setting &&
                  setting!.logoPreview! 
            }
            width={120}
          />
          <Upload showUploadList={false} beforeUpload={handleUploadFile}>
            <Button type="default">อัพโหลด</Button>
          </Upload>
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label="ลิ้งเว็บมหาวิทยาลัย">
        <MyParagraph
          keyCurrent="kru"
          value={setting && setting.kruUrl}
          onChange={(text: string) => {
            changeSetting({ ...setting, kruUrl: text });
          }}
        />
      </Descriptions.Item>

      <Descriptions.Item label="ลิ้งเว็บสมัครเรียน">
        <MyParagraph
          keyCurrent="reg"
          value={setting && setting.registerUrl}
          onChange={(text: string) => {
            changeSetting({ ...setting, registerUrl: text });
          }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default observer(ShowSetting);

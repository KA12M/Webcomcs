import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { RcFile } from "antd/es/upload";
import { observer } from "mobx-react-lite";

import PageTitle from "../../../components/PageTitle";
import { useStore } from "../../../store/store";
import ShowSetting from "./ShowSetting";

const SettingPage = () => {
  const {
    settingStore: { loadSetting, updateSetting, setting, changeSetting },
  } = useStore();

  const [file, setFile] = useState<RcFile | undefined>(undefined);

  useEffect(() => {
    loadSetting();
  }, []);

  const handleUploadFile = (file: RcFile, FileList: RcFile[]) => {
    setFile(file);
  };

  const handleSubmit = () => {
    updateSetting({
      ...setting!,
      fileImages: file,
      logoPreview: file ? URL.createObjectURL(file!) : setting?.logoPreview,
    }).then(() => {
      message.success("บันทึกเรียบร้อย");
      setFile(undefined);
    });
  };

  return (
    <div className="h-screen">
      <PageTitle homePath="/secret" text="ตั้งค่าระบบ" />

      <div className="shadow-46 rounded-xl">
        <div className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8">
          <ShowSetting
            preview={file}
            handleUploadFile={handleUploadFile}
            setting={setting!}
            changeSetting={changeSetting}
          />
        </div>
      </div>

      <Button
        className="mt-4"
        shape="round"
        type="primary"
        onClick={handleSubmit}
      >
        บันทึก
      </Button>
    </div>
  );
};

export default observer(SettingPage);

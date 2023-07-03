import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { RcFile } from "antd/es/upload";
import { observer } from "mobx-react-lite";

import PageTitle from "../../../components/PageTitle";
import { useStore } from "../../../store/store";
import ShowSetting from "./ShowSetting";
import TagYoutubeForm from "./TagYoutubeForm";
import MapLocation from "../../../components/MapLocation";

const SettingPage = () => {
  const {
    settingStore: {
      loadSetting,
      updateSetting,
      setting,
      changeSetting,
      loading,
    },
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
    <>
      <PageTitle text="ตั้งค่าระบบ" />

      <Button
        className="mb-4 w-20"
        shape="round"
        type="primary"
        loading={loading}
        onClick={handleSubmit}
      >
        บันทึก
      </Button>

      <div className="shadow-lg rounded-xl">
        <div className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8">
          <ShowSetting
            preview={file}
            handleUploadFile={handleUploadFile}
            setting={setting!}
            changeSetting={changeSetting}
          />

          <TagYoutubeForm tags={setting!.youtubeList || []} />

          <div className="h-10" />

          <MapLocation
            lat={setting?.latAndLng.lat}
            lng={setting?.latAndLng.lng}
            isOnClick
          />

          <div className="h-6" />
        </div>
      </div>
    </>
  );
};

export default observer(SettingPage);

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store/store";
import LecturerCourse from "../../../../components/LecturerCourse";
import BannerCourse from "./components/BannerCourse";
import { Button, message } from "antd";
import LoginForm from "../../LoginForm";
import Description from "../../../../components/Description";
import useGenerationDetail from "../../../../hooks/useGenerationDetail";
import { useForm } from "antd/es/form/Form";
import FormGeneration from "./components/FormGeneration";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";
import moment from "moment";

const LeftContent = () => {
  const {
    generationStore: {
      generationSelect,
      join,
      submittingLoading,
      loading,
      editGeneration,
    },
    userStore: { isLoggedIn, user },
    modalStore: { openModal },
  } = useStore();

  const { formMode, setFormMode } = useGenerationDetail();
  const [file, setFile] = useState<any>();
  const [form] = useForm();

  if (!generationSelect) return null;

  const isHost = user?.username === generationSelect?.lecturer.username;

  const registerDisabled =
    generationSelect.generation.isCancelled ||
    (!generationSelect.isJoined &&
      generationSelect.generation.attendees!.length >=
        generationSelect.generation.quantity);

  const handleJoin = () => {
    if (isLoggedIn) join(generationSelect.generation.id);
    else openModal(<LoginForm />, "เข้าสู่ระบบ");
  };

  const handleSetFormEdit = () => {
    setFormMode(!formMode);
    form.setFieldsValue(generationSelect.generation);
    form.setFieldValue("dateRange", {
      startDate: moment(generationSelect.generation.startDate),
      endDate: moment(generationSelect.generation.endDate),
    });
    setFile(generationSelect.generation.genPhoto);
  };

  const submit = (values: any) => { 
    if (values.dateRange.startDate == null || values.dateRange.endDate == null)
      return message.warning("กรุณากรอกระยะเวลา");
    let body: any = Object.assign(values, {
      courseId: generationSelect.id,
      genPhoto: file,
      startDate: values.dateRange.startDate,
      endDate: values.dateRange.endDate,
      id: generationSelect.generation.id,
    });
    editGeneration(body).then(() => {
      setFormMode(false);
      window.scrollTo({
        top: -window.pageYOffset,
        behavior: "smooth",
      });
    });
  };

  const BannerBottom = () => {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-row justify-between">
        <h3 className="font-semibold text-lg text-gray-700 tracking-wide">
          <p className={`text-lg font-bold text-blue-500`}>
            {generationSelect.generation.attendees?.length}/
            {generationSelect.generation.quantity}
          </p>
        </h3>
        {isHost ? (
          <Button
            loading={loading}
            type="dashed"
            onClick={handleSetFormEdit}
            children={formMode ? "กลับ" : "แก้ไข"}
          />
        ) : (
          <Button
            type="primary"
            onClick={handleJoin}
            loading={submittingLoading}
            danger={generationSelect.isJoined}
            children={generationSelect.isJoined ? "ยกเลิกลงทะเบียน" : "ลงทะเบียน"}
            disabled={registerDisabled}
          />
        )}
      </div>
    );
  };

  const Content = () => {
    return (
      <div className="mb-2">
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden my-4">
          <div className="w-2 bg-gray-800"></div>
          <div className="flex items-center px-2 py-3">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={generationSelect.image!}
            />
            <div className="mx-3">
              <h2 className="text-xl font-semibold text-gray-800">
                <Link to={RoutePath.courseDetail(generationSelect.id)}>
                  {generationSelect.title}
                </Link>
              </h2>
              <p className="text-gray-600">หลักสูตร</p>
            </div>
          </div>
        </div>

        <LecturerCourse lecturer={generationSelect?.lecturer} />

        <Description description={generationSelect?.generation.description!} />
      </div>
    );
  };

  return (
    <>
      <BannerCourse handleSetFormEdit={handleSetFormEdit} />

      <BannerBottom />

      {formMode ? (
        <div className="shadow-md round-lg">
          <FormGeneration
            form={form}
            submit={submit}
            file={file}
            setFile={setFile}
          />
        </div>
      ) : (
        <Content />
      )}
    </>
  );
};

export default observer(LeftContent);

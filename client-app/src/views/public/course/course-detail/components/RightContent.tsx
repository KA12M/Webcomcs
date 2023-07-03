import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../store/store";
import { Empty, Space, Button, Skeleton, message } from "antd";
import { DateFormatYear543 } from "../../../../../utils/Date";
import URLImage from "../../../../../utils/URL";
import { router } from "../../../../../routes/Routes";
import { RoutePath } from "../../../../../constants/RoutePath";
import useGenerationDetail from "../../../../../hooks/useGenerationDetail";
import FormGeneration from "../../generation-detail/components/FormGeneration";
import { useForm } from "antd/es/form/Form";
import { Link, useParams } from "react-router-dom";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { TbEdit, TbEye } from "react-icons/tb";

const RightContent = () => {
  const { id } = useParams();
  const {
    userStore: { user },
    courseStore: { courseSelected, loadCourse },
    generationStore: {
      newGeneration,
      loadingGeneration,
      editGeneration,
      loading,
    },
  } = useStore();
  const { formMode, setFormMode, currentEdit, setCurrentEdit } =
    useGenerationDetail();
  const [file, setFile] = useState();
  const [form] = useForm();

  const isHost = user?.username === courseSelected?.lecturer.username;

  const submit = (values: any) => {
    if (values.dateRange.startDate == null || values.dateRange.endDate == null)
      return message.warning("กรุณากรอกระยะเวลา");
    let body: any = Object.assign(values, {
      courseId: id,
      genPhoto: file,
      startDate: values.dateRange.startDate,
      endDate: values.dateRange.endDate,
      id: currentEdit,
    });
    if (!currentEdit) newGeneration(body).then(reset);
    else editGeneration(body).then(reset);
  };

  const reset = () => {
    loadCourse(id!);
    setFormMode(false);
    setCurrentEdit("");
    form.resetFields();
    window.scrollBy({
      top: -window.pageYOffset,
      behavior: "smooth",
    });
  };

  const setEdit = (genId: string) => {
    setFormMode(true);
    loadingGeneration(genId)
      .then((res: any) => {
        form.setFieldsValue(res.generation);
        form.setFieldValue("dateRange", {
          startDate: moment(res.generation.startDate),
          endDate: moment(res.generation.endDate),
        });
        setFile(res.generation.genPhoto);
        setCurrentEdit(genId);
      })
      .catch(() => setFormMode(false));
  };

  return (
    <div className="mb-2">
      <div className="flex justify-between font-medium mb-2">
        <span className="text-md font-semibold text-gray-900">ลงทะเบียน</span>
        {isHost && (
          <button
            onClick={() => setFormMode(!formMode)}
            className="p-2 bg-green-500 text-md text-gray-100 rounded-lg border-green-300 hover-card"
          >
            {formMode ? "กลับ" : "เปิดลงทะเบียน"}
          </button>
        )}
      </div>

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
        <div
          style={{ maxHeight: "48rem" }}
          className="shadow-md flex flex-col bg-white rounded-lg flex-none w-full h-5/6 overflow-scroll"
        >
          {courseSelected?.generations.length! < 1 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="ไม่มีข้อมูล"
            />
          )}

          <div className="flex flex-col divide-y">
            {courseSelected?.generations.map((val) => (
              <div key={val.id}>
                <div className="flex justify-between space-x-6 p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={URLImage(val.genPhoto)}
                      className="rounded-md h-16 w-16 object-cover"
                    />
                    <div className="flex flex-col space-y-2">
                      <Link to={RoutePath.generationDetail(val.id)}>
                        {val.subTitle}
                      </Link>
                      <span>
                        {DateFormatYear543(val.startDate)} -{" "}
                        {DateFormatYear543(val.endDate)}
                      </span>
                    </div>
                  </div>
                  <Space wrap>
                    <Button
                      shape="round"
                      type="default"
                      onClick={() =>
                        router.navigate(RoutePath.generationDetail(val.id))
                      }
                    >
                      <TbEye />
                    </Button>
                    {isHost && (
                      <Button
                        shape="round"
                        type="primary"
                        onClick={() => setEdit(val.id)}
                      >
                        <TbEdit />
                      </Button>
                    )}
                  </Space>
                </div>
              </div>
            ))}
            {loading && <Skeleton active className="px-2 py-4" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(RightContent);

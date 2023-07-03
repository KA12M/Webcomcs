import React from "react";
import { Formik, FormikErrors } from "formik";
import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UpdateMe } from "../../../../models/User";
import MyInput from "./MyInput";
import { UserRole } from "../../../../constants/UserRole";

interface Props {
  initialValues: UpdateMe;
  onSubmit: (value: any) => any;
  setEditMode: (bool: boolean) => void;
  loadingSubmitted: boolean;
  isRole: any;
}

const FormAccount = ({
  onSubmit,
  initialValues,
  setEditMode,
  loadingSubmitted,
  isRole,
}: Props) => {
  const onSubmitForm = async (values: UpdateMe) => {
    console.log(values);
    await onSubmit({
      fullName: values.fullName,
      bio: values.bio,
      student: values.student,
      lecturer: values.lecturer,
    })
      .then(() => setEditMode(false))
      .catch(() => alert());
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmitForm}
      validate={(values) => {
        let errors: FormikErrors<UpdateMe> = {};
        if (!values.fullName) errors.fullName = "กรุณากรอกข้อมูล";
        return errors;
      }}
    >
      {({
        handleSubmit,
        handleChange,
        dirty,
        isValid,
        values,
        setFieldValue,
        errors,
      }) => (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
          <MyInput
            name="fullName"
            label="ชื่อ-นามสกุล"
            required
            errors={errors}
            onChange={handleChange}
            value={values.fullName}
          />

          <Form.Item label="ประวัติ">
            <TextArea
              name="bio"
              onChange={handleChange}
              rows={2}
              value={values.bio || ""}
            />
          </Form.Item>

          {isRole == UserRole.student ? (
            <>
              <Form.Item label="ปีการศึกษา">
                <DatePicker
                  name="student.yearEdu"
                  picker="year"
                  onChange={(day) =>
                    setFieldValue("student.yearEdu", day?.year())
                  }
                />
              </Form.Item>

              <Form.Item label="การศึกษาระดับมัธยม">
                <Input
                  name="student.oldEdu"
                  value={values.student && values.student.oldEdu}
                  onChange={(val) =>
                    setFieldValue("student.oldEdu", val.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="ที่อยู่">
                <TextArea
                  rows={2}
                  name="student.address"
                  value={values.student && values.student.address}
                  onChange={(val) =>
                    setFieldValue("student.address", val.target.value)
                  }
                />
              </Form.Item>
            </>
          ) : (
            isRole == UserRole.lecturer && (
              <>
                <Form.Item label="ชำนาญ">
                  <Input
                    name="lecturer.expert"
                    value={values.lecturer && values.lecturer.expert}
                    onChange={(val) =>
                      setFieldValue("lecturer.expert", val.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="ระดับการศึกษา">
                  <Input
                    name="lecturer.lvEdu"
                    value={values.lecturer && values.lecturer.lvEdu}
                    onChange={(val) =>
                      setFieldValue("lecturer.lvEdu", val.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="ตำแหน่ง">
                  <Input
                    name="lecturer.position"
                    value={values.lecturer && values.lecturer.position}
                    onChange={(val) =>
                      setFieldValue("lecturer.position", val.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="ติดต่อ">
                  <TextArea
                    rows={2}
                    name="lecturer.contact"
                    value={values.lecturer && values.lecturer.contact}
                    onChange={(val) =>
                      setFieldValue("lecturer.contact", val.target.value)
                    }
                  />
                </Form.Item>
              </>
            )
          )}

          <Form.Item>
            <Button
              loading={loadingSubmitted}
              type="primary"
              htmlType="submit"
              shape="round"
              disabled={!dirty || !isValid}
            >
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default FormAccount;

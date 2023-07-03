import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store/store";
import { Button, Col, Empty, Row, Skeleton, Space } from "antd";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";
import { UserRole } from "../../../../constants/UserRole";
import CardCourse from "./components/CardCourse";

const CourseManage = () => {
  const {
    courseStore: {
      courseRegistry,
      clearRegistry,
      loading,
      loadCourses,
      setPredicate,
    },
    userStore: { profile },
  } = useStore();

  useEffect(() => {
    setPredicate("hostUsername", profile?.username);
    clearRegistry();
    loadCourses();
  }, []);

  return (
    <>
      {profile?.isMe && profile.isRole == UserRole.lecturer && (
        <Space wrap className="mb-4">
          <Button
            type="primary"
            shape="round"
            children="หลักสูตรใหม่"
            onClick={() => router.navigate(RoutePath.coursesForm)}
          />
        </Space>
      )}

      {loading ? (
        <Skeleton active />
      ) : (
        Array.from(courseRegistry.values()).length < 1 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="ไม่มีข้อมูล"
          />
        )
      )}
      <Row className="mb-4" gutter={[16, 16]}>
        {Array.from(courseRegistry.values()).map((val, i) => (
          <Col key={i} xs={24} sm={12} md={8} lg={6} className="w-ful">
            <CardCourse course={val}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default observer(CourseManage);

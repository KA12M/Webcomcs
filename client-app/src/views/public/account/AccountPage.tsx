import React, { useEffect, useState } from "react";
import Profile from "./profile/Profile";
import { observer } from "mobx-react-lite";
import { Col, Divider, Row, Skeleton, Space, Tabs, Button } from "antd";
import Title from "antd/es/typography/Title";

import Main from "../../../containers/Main";
import { useStore } from "../../../store/store";
import { useParams, useLocation } from "react-router-dom";
import { router } from "../../../routes/Routes";
import AccountDetail from "./profile/AccountDetail";
import FormAccount from "./profile/FormAccount";
import { UserRole } from "../../../constants/UserRole";
import AccountProject from "./project/AccountProject";
import AccountSetting from "./account-setting/AccountSetting";
import AccountJobHistory from "./job-history/AccountJobHistory";
import CourseManage from "./course-manage/CourseManage";

const ProfilePage = () => {
  const { username } = useParams();
  const { pathname } = useLocation();
  const {
    userStore: {
      user,
      profile,
      Loading,
      loadingSubmit,
      accountTabCurrent,
      loadProfile,
      updateMe,
      setAccountTabCurrent,
    },
    projectStore: { projectRegistry },
  } = useStore();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (username || user) {
      loadProfile(username || user?.username!);
    } else router.navigate("*");
  }, [pathname]);

  if (!profile || Loading)
    return (
      <Main>
        <Skeleton active className="py-8" />
      </Main>
    );

  const items = [
    {
      label: `ข้อมูลส่วนตัว`,
      key: "0",
      children: (
        <>
          <Row justify={"space-between"}>
            <Col>
              <Title level={4}>
                <p>ข้อมูลส่วนตัว</p>
              </Title>
            </Col>
            <Col>
              {profile.isMe && (
                <Button
                  onClick={() => setEditMode(!editMode)}
                  shape="round"
                  type={editMode ? "default" : "primary"}
                >
                  {editMode ? "กลับ" : "แก้ไข"}
                </Button>
              )}
            </Col>
          </Row>

          <div>
            {editMode ? (
              <FormAccount
                onSubmit={updateMe}
                initialValues={profile}
                setEditMode={setEditMode}
                loadingSubmitted={loadingSubmit}
                isRole={profile.isRole}
              />
            ) : (
              <AccountDetail user={profile!} />
            )}
          </div>
        </>
      ),
    },
  ];

  // check role student
  if (UserRole.student == profile.isRole) {
    items.push({
      label: `โครงงานวิจัย`,
      key: "projects",
      children: (
        <AccountProject projects={Array.from(projectRegistry.values())} />
      ),
    });
    items.push({
      label: `ประวัติการทำงาน`,
      key: "job-history",
      children: <AccountJobHistory />,
    });
  }

  // check role lecturer
  else if (UserRole.lecturer == profile.isRole) {
    items.push({
      label: `หลักสูตรระยะสั้น`,
      key: "course-manage",
      children: <CourseManage />,
    });
  }

  // check is my account
  if (profile.isMe)
    items.push({
      label: `ตั้งค่า`,
      key: "settings",
      children: <AccountSetting />,
    });

  return (
    <Main>
      <div className="shadow-lg rounded-xl min-h-screen bg-white mb-4 lg:py-12 lg:px-16 md:py-4 md:px-8 py-4 px-2">
        <Space wrap direction="vertical" className="w-full">
          <Profile user={profile} onSubmit={updateMe} loading={loadingSubmit} />

          <Divider plain />

          <Tabs
            defaultActiveKey={accountTabCurrent}
            onChange={setAccountTabCurrent}
            tabPosition={"left"}
            items={items}
          />
        </Space>
      </div>
    </Main>
  );
};

export default observer(ProfilePage);

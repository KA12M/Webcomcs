import React, { useState } from "react";
import { Descriptions } from "antd";
import { Profile } from "../../../../models/User";
import { UserRole } from "../../../../constants/UserRole";

interface Props {
  user: Profile;
}

const AccountDetail = ({ user }: Props) => {
  return (
    <Descriptions size={"default"}>
      <Descriptions.Item label="ชื่อ-นามสกุล">
        {user.fullName}
      </Descriptions.Item>
      {UserRole.student == user.isRole && (
        <Descriptions.Item label="รหัสนักศึกษา">
          {user.username}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="ประวัติ">{user.bio}</Descriptions.Item>

      {UserRole.student == user.isRole ? (
        <>
          <Descriptions.Item label="ปีการศึกษา">
            {user.student && user.student.yearEdu}
          </Descriptions.Item>
          <Descriptions.Item label="การศึกษาระดับมัธยม">
            {user.student && user.student.oldEdu}
          </Descriptions.Item>
          <Descriptions.Item label="ที่อยู่">
            {user.student && user.student.address}
          </Descriptions.Item>
        </>
      ) : (
        UserRole.lecturer == user.isRole && (
          <>
            <Descriptions.Item label="ความชำนาญ">
              {user.lecturer && user.lecturer.expert}
            </Descriptions.Item>
            <Descriptions.Item label="การศึกษา">
              {user.lecturer && user.lecturer.lvEdu}
            </Descriptions.Item>
            <Descriptions.Item label="ตำแหน่ง">
              {user.lecturer && user.lecturer.position}
            </Descriptions.Item>
            <Descriptions.Item label="ติดต่อ">
              {user.lecturer && user.lecturer.contact}
            </Descriptions.Item>
          </>
        )
      )}
    </Descriptions>
  );
};

export default AccountDetail;

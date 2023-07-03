import React from "react";
import { observer } from "mobx-react-lite";
import FormResetPassword from "./FormResetPassword";
import Title from 'antd/es/typography/Title';

const AccountSetting = () => {
  return (
    <>
      <div className="lg:w-96">
        <Title level={4}>
          <p>เปลี่ยนรหัสผ่าน</p>
        </Title> 

        <FormResetPassword />
      </div>
    </>
  );
};

export default observer(AccountSetting);

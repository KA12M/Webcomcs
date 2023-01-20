import React from "react";
import { Button, Result } from "antd";
import { router } from "../routes/Routes";

const Notfound404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="ขออภัย หน้าที่คุณเยี่ยมชมไม่มีอยู่"
      extra={
        <Button type="primary" onClick={() => router.navigate("/")}>
          กลับหน้าหลัก
        </Button>
      }
    />
  );
};

export default Notfound404;

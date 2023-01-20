import React, { useEffect, useState } from "react";
import { Badge } from "@windmill/react-ui";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Avatar, Button } from "antd";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../store/store";
import PageTitle from "../../../components/PageTitle";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";

const UserPage = () => {
  const {
    accountStore: {
      loadAccounts,
      setTable,
      tableBody,
      accountsRegistry,
      pagingParams,
    },
  } = useStore();

  const columns: any[] = [
    {
      title: "ลำดับ",
      key: "index",
      dataIndex: "index",
      align: "center",
    },
    {
      title: "ผู้ใช้",
      key: "image",
      dataIndex: "image",
      align: "center",
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "fullName",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "อีเมล",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "สถานะ",
      key: "isRole",
      dataIndex: "isRole",
      align: "center",
    },
    {
      title: "จัดการ",
      key: "action",
      align: "center",
      render: (record: any) => (
        <Button
          danger
          type="primary"
          onClick={() => alert(JSON.stringify(record, null, 2))}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    loadAccounts().then(mapTable);
  }, [pagingParams]);

  const roleBadge = (role: number) => {
    switch (role) {
      case 0:
        return <Badge type="neutral">ทั่วไป</Badge>;
      case 1:
        return <Badge type="success">นักศึกษา</Badge>;
      case 2:
        return <Badge type="primary">อาจารย์</Badge>;
    }
  };

  const mapTable = () => {
    const body: any = [];
    Array.from(accountsRegistry.values())?.forEach((user, i) =>
      body.push({
        key: user.username,
        index: (pagingParams.currentPage - 1) * pagingParams.pageSize + (i + 1),
        fullName: user.fullName,
        email: user.email,
        isRole: roleBadge(user.isRole),
        image: (
          <Avatar
            size={64}
            icon={
              user.image ? (
                <img src={user.image} />
              ) : (
                user.fullName[0].toLocaleUpperCase()
              )
            }
          />
        ),
      })
    );
    setTable(body);
  };

  return (
    <div className="h-screen">
      <PageTitle homePath="/secret" text="ตารางรายชื่อผู้ใช้" />

      <Row className="shadow-46 rounded-xl">
        <Col sm={24} xl={6} className="p-2">
          <UserFilter mapTable={mapTable} />
        </Col>

        <Col sm={24} xl={18}>
          <UserTable data={tableBody} columns={columns} />
        </Col>
      </Row>
    </div>
  );
};

export default observer(UserPage);

import React, { useEffect } from "react";
import {
  Row,
  Col,
  Avatar,
  Button,
  Popconfirm,
  Space,
  Dropdown,
  Badge,
} from "antd";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../store/store";
import PageTitle from "../../../components/PageTitle";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";
import {
  RoleLabel,
  UserRole,
  badgeRoleTypes,
} from "../../../constants/UserRole";
import { BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RouteSecret, RoutePath } from "../../../constants/RoutePath";
import FormEditUser from "./components/FormEditUser";

const UserPage = () => {
  const {
    modalStore: { openModal },
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
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "อีเมล",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "สถานะ",
      key: "isRole",
      dataIndex: "isRole",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (record: any) => (
        <Space wrap>
          <Popconfirm
            placement="topRight"
            title={"ลบ"}
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => {}}
            disabled={record.role == UserRole.admin}
          >
            <Button
              danger
              disabled={record.role == UserRole.admin}
              shape="round"
              children={<BiTrash size={18} />}
              type="primary"
            />
          </Popconfirm>
          <Dropdown
            disabled={record.role == UserRole.admin}
            menu={{
              items: [
                {
                  key: "1",
                  label: "แก้ไข",
                  onClick: () =>
                    openModal(
                      <FormEditUser
                        username={record.key}
                        roleCurrent={record.role}
                      />
                    ),
                },
              ],
            }}
            placement="top"
            arrow
          >
            <Button shape="round" children={<BiDotsHorizontalRounded />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadAccounts().then(mapTable);
  }, [pagingParams]);

  const mapTable = () => {
    const body: any = [];
    Array.from(accountsRegistry.values()).forEach((user, i) =>
      body.push({
        key: user.username,
        role: user.isRole,
        index: (pagingParams.currentPage - 1) * pagingParams.pageSize + (i + 1),
        fullName: (
          <Space wrap>
            <Link to={RoutePath.accountDetail(user.username)}>
              <Avatar src={user.image} icon={user.fullName[0]} />
            </Link>
            <Link to={RoutePath.accountDetail(user.username)}>
              {user.fullName}
            </Link>
          </Space>
        ),
        email: user.email,
        isRole: (
          <Badge
            color={"#faad14" || badgeRoleTypes[user.isRole!][0]}
            style={{ backgroundColor: "#faad14" }}
          >
            <p>{RoleLabel[user.isRole!]["th"]}</p>
          </Badge>
        ),
      })
    );
    setTable(body);
  };

  return (
    <>
      <PageTitle text="ตารางรายชื่อผู้ใช้" />

      <Row className="shadow-46 rounded-xl">
        <Col span={24}>
          <UserFilter mapTable={mapTable} />

          <UserTable data={tableBody} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default observer(UserPage);

import React, { useEffect } from "react";
import { Row, Col, Space, Avatar, Switch } from "antd";
import MyTable from "../../../components/MyTable";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { columns } from "./components/JobHistoryTableColumns";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";
import PageTitle from "../../../components/PageTitle";
import JobHistoryModal from "../../public/job-history/components/JobHistoryModal";

const JobHistoryManage = () => {
  const {
    jobHistoryStore: {
      predicate,
      loading,
      tableBody,
      setTable,
      pagination,
      pagingParams,
      setPagingParams,
      loadJobHistories,
      jobHistoryRegistry,
      changeIsUse,
    },
    modalStore: { openModal },
  } = useStore();

  useEffect(() => {
    predicate.set("showAll", true);
    loadJobHistories().then(mapTable);
  }, [pagingParams]);

  const mapTable = () => {
    let temp: any[] = Array.from(jobHistoryRegistry.values()).map((val, i) => ({
      key: i,
      user: (
        <Space wrap>
          <Avatar src={val.user?.image} icon={val.user?.fullName[0]} />
          <Link
            to={RoutePath.accountDetail(val.user?.username!)}
            children={val.user?.fullName}
          />
        </Space>
      ),
      jobName: (
        <div
          className="cursor-pointer"
          onClick={() => openModal(<JobHistoryModal val={val} />)}
        >
          {val.jobName}
        </div>
      ),
      position: val.position,
      company: val.company,
      isUse: (
        <Switch
          checkedChildren="แสดง"
          unCheckedChildren="ซ่อน"
          defaultChecked={val.isUse}
          onChange={() => changeIsUse(val.user?.username!)}
        />
      ),
    }));
    setTable(temp);
  };

  return (
    <>
      <PageTitle text="ประวัติการทำงาน" />

      <Row className="shadow-46 rounded-xl">
        <Col span={24}>
          <MyTable
            isLoading={loading}
            data={tableBody}
            columns={columns({})}
            pagination={{
              current: pagination?.currentPage,
              total: pagination?.totalItems,
              pageSize: pagingParams.pageSize,
              onChange: setPagingParams,
              showSizeChanger: true,
              pageSizeOptions: [10, 30, 50],
              style: { marginRight: 8, marginLeft: 8 },
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default observer(JobHistoryManage);

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Space, Button, Switch } from "antd";

import PageTitle from "../../../components/PageTitle";
import { useStore } from "../../../store/store";
import MyTable from "../../../components/MyTable";
import { columns } from "./components/SyllabusTableColumn";
import FormSyllabus from "./components/FormSyllabus";

const SyllabusManage = () => {
  const {
    syllabusStore: {
      loadSyllabuses,
      syllabusRegistry,
      setTable,
      loading,
      tableBody,
      deleteSyllabus,
      predicate,
      hidden,
      setYearList,
      loadSyllabusDetail, 
    },
  } = useStore();
  const [formMode, setFormMode] = useState(false);

  useEffect(() => {
    predicate.set("showHidden", true);
    loadSyllabuses().then(mapTable).then(setYearList);
  }, []);

  const mapTable = () => {
    let body: any[] = Array.from(syllabusRegistry.values()).map((a) => ({
      key: a.id,
      nameTH: a.nameTH,
      total: a.total,
      year: a.yearFormat,
      hidden: (
        <Switch
          checkedChildren="แสดง"
          unCheckedChildren="ซ่อน"
          defaultChecked={!a.hidden}
          onChange={() => hidden(a)}
        />
      ),
    }));
    setTable(body);
  };

  const handleSetMode = () => setFormMode(!formMode);

  const handleRemove = (id: string) => deleteSyllabus(id).then(mapTable);

  const handleEdit = async (id: string) => {
    loadSyllabusDetail(id).then(handleSetMode);
  };

  return (
    <>
      <PageTitle text="หลักสูตรวิทยาการคอมพิวเตอร์" />

      <Space wrap className="mb-4">
        <Button
          shape="round"
          type={formMode ? "default" : "primary"}
          onClick={handleSetMode}
          children={formMode ? "กลับ" : "เพิ่ม"}
        />
      </Space>

      <Row className="shadow-46 rounded-xl">
        <Col span={24}>
          {formMode ? (
            <FormSyllabus setFormMode={setFormMode} mapTable={mapTable} />
          ) : (
            <MyTable
              isLoading={loading}
              data={tableBody}
              columns={columns({ handleRemove, handleEdit })}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default observer(SyllabusManage);

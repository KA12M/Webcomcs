import React, { useEffect, useState } from "react";
import { Col, Row, Avatar, Space, Button } from "antd";
import PageTitle from "../../../components/PageTitle";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { Lecturer } from "../../../models/Lecturer";
import MyTable from "../../../components/MyTable";
import { LecturerColumn } from "./components/LecturerColumn";
import FormLecturer from "./components/FormLecturer";
import LecturerFilter from "./components/LecturerFilter";

const LecturerManage = () => {
  const {
    lecturerStore: {
      lecturerRegistry,
      tableBody,
      predicate,
      loading,
      setTable,
      loadLecturers,
      removeLecturer,
      setHidden,
      setPositionList,
    },
  } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<string | null>(null);

  useEffect(() => {
    predicate.set("showHidden", true);
    loadLecturers().then(mapTable).then(setPositionList);
  }, []);

  const mapTable = () => {
    let body: any[] = Array.from(lecturerRegistry.values()).map(
      (el: Lecturer) => {
        return {
          key: el.id,
          lecturer: (
            <Avatar src={el.image && el.imagePreview} icon={el.fullName[0]} />
          ),
          prefixed: el.prefix,
          name: el.fullName,
          hidden: el.hidden,
          position: el.position,
        };
      }
    );
    setTable(body);
  };

  const handleSetHidden = (id: string) => {
    setHidden(id).then(mapTable);
  };

  const handleRemove = (id: string) => {
    removeLecturer(id).then(mapTable);
  };

  return (
    <>
      <PageTitle text="อาจารย์" />

      <Space wrap className="mb-4">
        <Button
          onClick={() => setEditMode(!editMode)}
          shape="round"
          type={editMode ? "default" : "primary"}
          children={editMode ? "กลับ" : "เพิ่ม"}
        />
      </Space>

      <Row className="shadow-46 rounded-xl">
        <Col span={24}>
          {editMode ? (
            <FormLecturer
              currentEdit={currentEdit}
              setEditMode={setEditMode}
              mapTable={mapTable}
              setCurrentEdit={setCurrentEdit}
            />
          ) : (
            <>
              <LecturerFilter mapTable={mapTable} />
              <MyTable
                data={tableBody}
                columns={LecturerColumn({
                  handleRemove,
                  setCurrentEdit,
                  setEditMode,
                  handleSetHidden,
                })}
                isLoading={loading}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default observer(LecturerManage);

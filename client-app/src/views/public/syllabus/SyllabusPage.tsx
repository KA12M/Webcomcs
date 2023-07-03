import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Skeleton,
  Divider,
  Button,
  Select,
  Empty,
} from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Title from "antd/es/typography/Title";

import Main from "../../../containers/Main";
import { useStore } from "../../../store/store";
import SyllabusContentLeft from "./components/SyllabusContentLeft";
import SyllabusContentRight from "./components/SyllabusContentRight"; 
import BreadcrumbPublic from "../../../components/BreadcrumbPublic";

const SyllabusPage = () => {
  const {
    syllabusStore: {
      loadSyllabuses,
      loading,
      syllabusSelected,
      yearList,
      setYearList,
      getSyllabusByYear,
      predicate,
    },
  } = useStore();

  useEffect(() => {
    predicate.set("showHidden", false);
    loadSyllabuses().then(initialData);
  }, []);

  const initialData = async () => {
    let list: any = setYearList();
    getSyllabusByYear(list[0]);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic text="หลักสูตรวิทยาศาสตรบัณฑิต" />
        </div>
      </div>

      <Main hScreen={false}>
        {loading ? (
          <Skeleton active className="py-4" />
        ) : !syllabusSelected ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="ไม่มีข้อมูล"
          />
        ) : (
          <div className="mb-4 pt-8">
            <Title level={3} className="px-2">
              <p>{syllabusSelected?.nameTH}</p>
            </Title>
            <Title level={5} className="px-2">
              <p>{syllabusSelected?.nameEN}</p>
              <div className="flex flex-row justify-between">
                <Button
                  danger
                  shape="round"
                  type="primary"
                  children={"PDF"}
                  onClick={() => window.open(syllabusSelected?.pdfPreview)}
                />
                <Select
                  defaultValue={yearList[0]}
                  style={{ width: 120 }}
                  onChange={(val) => getSyllabusByYear(val)}
                  options={yearList.map((val) => ({ label: val, value: val }))}
                />
              </div>
            </Title>

            <Divider />

            <Row>
              <Col className="px-2" sm={24} lg={12}>
                <SyllabusContentLeft syllabus={syllabusSelected!} />
              </Col>
              <Col className="px-2" sm={24} lg={12}>
                <SyllabusContentRight syllabus={syllabusSelected!} />
              </Col>
            </Row>
          </div>
        )}
      </Main>
    </div>
  );
};

export default observer(SyllabusPage);

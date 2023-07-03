import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Space, Image, Switch, Input, message, Row, Col } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";

import PageTitle from "../../../../components/PageTitle";
import { useStore } from "../../../../store/store";
import MyTable from "../../../../components/MyTable";
import NewsDateFormat from "../../../public/home/news-detail/NewsDateFormat";
import FormNews from "./FormNews";
import { truncate } from "../../../../utils/accessor";
import { columns } from "./components/NewsTableColumn";

const NewsManage = () => {
  const {
    newsStore: {
      setTable,
      loadNewses,
      hidden,
      setPagingParams,
      deleteNews,
      addNews,
      setSearch,
      loadNews,
      newsRegistry,
      tableBody,
      loading,
      predicate,
      pagination,
      pagingParams,
      submitLoading,
      formBody,
      setEditCurrentNews,
      editNews,
      setFormBody,
    },
  } = useStore();

  const [editCurrent, setEditCurrent] = useState<any>();
  const [formMode, setFormMode] = useState(false);
  const [preview, setPreview] = useState<RcFile[] | undefined>(
    formBody.fileImages
  );

  useEffect(() => {
    predicate.set("ShowAll", true);
    loadNewses().then(mapTable);
  }, [pagingParams]);

  const mapTable = () => {
    let body: any[] = [];
    Array.from(newsRegistry.values()).forEach((news) => {
      body.push({
        key: news.id,
        title: truncate(news.title),
        createdAt: <Space>{NewsDateFormat(news.createdAt)}</Space>,
        isHidden: (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!news.isHidden}
            onChange={() => hidden(news).then(mapTable)}
          />
        ),
        mainImage: (
          <Image
            className="items-center object-cover object-top rounded-lg "
            src={news.mainImage}
            width={160}
            height={90}
          />
        ),
      });
    });
    setTable(body);
  };

  const handleSetMode = () => setFormMode(!formMode);

  const handleUploadFiles: UploadProps["beforeUpload"] = (
    file: RcFile,
    FileList: RcFile[]
  ) => {
    setPreview(FileList);
    setFormBody({ fileImages: FileList });
  };

  const removeFileImage = (index: number) => {
    let body = formBody.fileImages!.filter((_, i) => i != index);
    setFormBody({
      fileImages: body,
    });
    setPreview(body);
  };

  const handleValuesChange = (changedValues: any, values: any) => {
    setFormBody({ ...values });
  };

  const handleSubmit = async () => {
    try {
      if (editCurrent) await editNews(editCurrent);
      else await addNews();

      setPreview(undefined);
      handleSetMode();
      loadNewses().then(mapTable);
    } catch (err: any) {
      message.error(err, 2);
    }
  };

  const handleSearch = (word: string) => {
    newsRegistry.clear();
    setSearch(word);
    setPagingParams(1, pagingParams.pageSize);
    loadNewses().then(mapTable);
  };

  const setCurrentEdit = (id: string) => {
    loadNews(id).then(() => {
      setEditCurrent(id);
      setFormMode(true);
      setEditCurrentNews();
    });
  };

  return (
    <>
      <PageTitle
        text="ข่าวประชาสัมพันธ์"
        tail={editCurrent && formBody.title}
      />

      <Space wrap className="mb-4">
        <Button
          shape="round"
          type={formMode ? "default" : "primary"}
          onClick={handleSetMode}
          children={formMode ? "กลับ" : "เพิ่ม"}
        />
      </Space>

      {formMode ? (
        <FormNews
          editCurrent={editCurrent}
          setEditCurrent={setEditCurrent}
          formBody={formBody}
          preview={preview}
          submitLoading={submitLoading}
          handleSubmit={handleSubmit}
          handleValuesChange={handleValuesChange}
          handleUploadFiles={handleUploadFiles}
          removeFileImage={removeFileImage}
        />
      ) : (
        <Row className="shadow-46 rounded-xl">
          <Col span={24}>
            <Space wrap className="py-4 px-2">
              <Input.Search
                allowClear
                defaultValue={predicate.get("Search")}
                placeholder="ค้นหา"
                onSearch={handleSearch}
                required
              />
            </Space>

            <Image.PreviewGroup>
              <MyTable
                data={tableBody}
                isLoading={loading}
                columns={columns({ deleteNews, mapTable, setCurrentEdit })}
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
            </Image.PreviewGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default observer(NewsManage);

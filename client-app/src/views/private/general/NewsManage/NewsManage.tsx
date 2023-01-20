import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Space,
  Image,
  Switch,
  Popconfirm,
  Tooltip,
  Input,
  message,
} from "antd";
import { BiEdit, BiSearchAlt2, BiTrash } from "react-icons/bi";
import { RcFile, UploadProps } from "antd/es/upload";

import PageTitle from "../../../../components/PageTitle";
import { useStore } from "../../../../store/store";
import MyTable from "../../../../components/MyTable";
import NewsDateFormat from "../../../public/home/news-detail/NewsDateFormat";
import FormNews from "./FormNews";
import { useForm } from "antd/es/form/Form";

const truncate = (txt: string) =>
  txt.length > 40 ? txt.substring(0, 40) + "..." : txt;

const NewsManage = () => {
  const columns = [
    {
      title: "ประชาสัมพันธ์",
      key: "mainImage",
      dataIndex: "mainImage",
    },
    {
      title: "หัวข้อ",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "วันที่",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "แสดง",
      key: "isHidden",
      dataIndex: "isHidden",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (news: any) => (
        <Space wrap>
          <Tooltip placement="top" title={"รายละเอียด"}>
            <Button
              shape="round"
              children={<BiSearchAlt2 size={18} />}
              type="default"
            />
          </Tooltip>
          <Tooltip placement="top" title={"แก้ไข"}>
            <Button
              shape="round"
              children={<BiEdit size={18} />}
              type="primary"
              color="yellow"
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title={"ลบ"}
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => deleteNews(news.key).then(mapTable)}
          >
            <Tooltip placement="right" title={"ลบ"}>
              <Button
                shape="round"
                danger
                children={<BiTrash size={18} />}
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const {
    newsStore: {
      setTable,
      loadNewses,
      hidden,
      setPagingParams,
      deleteNews,
      addNews,
      setSearch,
      clearFormBody,
      newsRegistry,
      tableBody,
      loading,
      predicate,
      pagination,
      pagingParams,
      submitLoading,
      formBody,
    },
  } = useStore();

  const [editMode, setEditMode] = useState(false);
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
            className="items-center object-cover object-center"
            src={news.mainImage}
            width={240}
            height={120}
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
    formBody.fileImages = FileList;
    setPreview(FileList);
  };

  const removeFileImage = (index: number) => {
    let body: RcFile[] = preview!.filter((_, i) => i != index);
    formBody.fileImages = body;
    setPreview(body);
  };

  const handleValuesChange = (changedValues: any, values: any) => {
    formBody.title = values.title;
    formBody.subTitle = values.subTitle;
    formBody.body = values.body;
  };

  const handleSubmit = () => {
    addNews()
      .then(() => {
        handleSetMode();
        setPreview(undefined);
        clearFormBody();
        loadNewses().then(mapTable); 
      })
      .catch((err) => message.error(err, 2));
  };

  const handleSearch = (word: string) => {
    newsRegistry.clear();
    setSearch(word);
    setPagingParams(1, pagingParams.pageSize);
    loadNewses().then(mapTable);
  };

  return (
    <div className="h-screen">
      <PageTitle
        homePath="/secret"
        text="ข่าวประชาสัมพันธ์"
        path={[{ label: "ทั่วไป" }]}
      />

      <Space className="mb-4">
        <Button
          shape="round"
          type={formMode ? "default" : "primary"}
          onClick={handleSetMode}
        >
          {formMode ? "กลับ" : "เพิ่ม"}
        </Button>
        {!formMode && (
          <Input.Search
            allowClear
            defaultValue={predicate.get("Search")}
            placeholder="ค้นหา"
            onSearch={handleSearch}
            required
          />
        )}
      </Space>

      <div className="rounded-xl shadow-46">
        {formMode ? (
          <FormNews 
            editMode={editMode}
            formBody={formBody}
            submitLoading={submitLoading}
            handleSubmit={handleSubmit}
            preview={preview}
            handleValuesChange={handleValuesChange}
            handleUploadFiles={handleUploadFiles}
            removeFileImage={removeFileImage}
          />
        ) : (
          <Image.PreviewGroup>
            <MyTable
              data={tableBody}
              columns={columns}
              isLoading={loading}
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
        )}
      </div>
    </div>
  );
};

export default observer(NewsManage);

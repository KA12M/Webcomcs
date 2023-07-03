import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../../../store/store";
import { Input, InputRef, Space, Tag } from "antd";
import { Consultant } from "../../../../../models/Project";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { observer } from "mobx-react-lite";

const ProjectConsultants = ({ currentEdit }: any) => {
  const {
    projectStore: { setFormBody, formBody, projectRegistry },
  } = useStore();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState(false);

  const [preview, setPreview] = useState<any>([]);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();

    if (currentEdit) {
      let currentProject = projectRegistry.get(currentEdit);
      setPreview(currentProject?.consultants);
    }
  }, []);

  const handleClose = (index: number) => {
    const newTags = formBody.consultants.filter(
      (_: any, i: number) => i !== index
    );
    setFormBody({ consultants: newTags });
    setPreview(newTags);
  };

  const handleInputConfirm = () => {
    if (inputValue.length > 0) {
      setFormBody({
        consultants: [...preview, { lecturerName: inputValue }],
      });
      setPreview([...preview, { lecturerName: inputValue }]);
      setInputVisible(false);
      setInputValue("");
    }
  };

  const forMap = (tag: Consultant, i: number) => (
    <span key={i} className="inline-block">
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(i);
        }}
      >
        {tag.lecturerName}
      </Tag>
    </span>
  );
  return (
    <>
      <div className="my-2">
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            style={{ width: 160 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Space>
            <Tag
              className="border-dashed"
              onClick={() => setInputVisible(true)}
            >
              <PlusOutlined /> เพิ่ม
            </Tag>
          </Space>
        )}
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === "appear" || e.type === "enter") {
              (e.target as any).style = "display: inline-block";
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
          className="mt-2"
        >
          {preview.map(forMap)}
        </TweenOneGroup>
      </div>
    </>
  );
};

export default observer(ProjectConsultants);

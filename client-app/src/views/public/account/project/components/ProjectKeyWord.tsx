import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../../../store/store";
import { Input, InputRef, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";

const ProjectKeyWord = ({ currentEdit }: any) => {
  const {
    projectStore: { setFormBody, projectRegistry, formBody },
  } = useStore();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState(false);

  const [preview, setPreview] = useState<any>([]);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
    if (currentEdit) {
      let currentProject = projectRegistry.get(currentEdit);
      setPreview(currentProject?.keyWordList);
    }
  }, []);

  const handleClose = (index: number) => {
    const newTags = formBody.keyWordList.filter(
      (_: any, i: number) => i != index
    );
    setFormBody({ keyWordList: newTags });
    setPreview(newTags);
  };

  const handleInputConfirm = () => {
    if (inputValue.length > 0) {
      setFormBody({
        keyWordList: [...preview, inputValue],
      });
      setPreview([...preview, inputValue]);
      setInputVisible(false);
      setInputValue("");
    }
  };

  const forMap = (tag: string, i: number) => (
    <span key={i} className="inline-block">
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(i);
        }}
      >
        {tag}
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
            style={{ width: 102 }}
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
          className="mt-4"
        >
          {preview.map(forMap)}
        </TweenOneGroup>
      </div>
    </>
  );
};

export default ProjectKeyWord;

import React, { useEffect, useRef, useState } from "react";
import { Col, Input, InputRef, Row, Tag, Space, Tour } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BiInfoCircle } from "react-icons/bi";

import Youtube from "../../../components/Youtube";
import { useStore } from "../../../store/store";
import StepTourYoutubeLink from "./StepTourYoutubeLink";
import { TweenOneGroup } from 'rc-tween-one';
import { observer } from 'mobx-react-lite';

interface Props {
  tags: any[];
}

const TagYoutubeForm = ({ tags }: Props) => {
  const {
    settingStore: { changeSetting },
    commonStore: { json },
  } = useStore();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [tourLinkYoutube, setTourLinkYoutube] = useState(false);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
  }, []);

  const handleClose = (index: number) => {
    const newTags = tags.filter((_: any, i: number) => i != index);
    changeSetting({ youtubeList: newTags });
  };

  const handleInputConfirm = () => {
    if (inputValue.length > 0) {
      changeSetting({ youtubeList: [...tags, inputValue] });
      setInputVisible(false);
      setInputValue("");
    }
  };

  const forMap = (tag: string, i: number) => (
    <span key={tag} className="inline-block">
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
      <div className="my-8">
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
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
            <BiInfoCircle
              className="cursor-pointer"
              onClick={() => setTourLinkYoutube(true)}
            />
          </Space>
        )}
        
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
          }}
          onEnd={(e: any) => {
            if (e.type === "appear" || e.type === "enter") {
              (e.target as any).style = "display: inline-block";
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
          className="mt-4"
        >
          {tags.map(forMap)}
        </TweenOneGroup>

        <Tour
          animated
          open={tourLinkYoutube}
          onClose={() => setTourLinkYoutube(false)}
          steps={StepTourYoutubeLink(json["youtube-guidelines"])}
        />
      </div>

      <Row gutter={[18, 18]} wrap>
        {tags.map((val: string, i: number) => (
          <Col className="w-full" key={i} sm={24} md={8} lg={6}>
            <Youtube url={val} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default observer(TagYoutubeForm);

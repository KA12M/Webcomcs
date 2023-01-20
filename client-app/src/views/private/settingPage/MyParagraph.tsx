import React, { useState } from "react";
import Paragraph from "antd/es/typography/Paragraph";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { Typography } from "antd";
import { truncateSync } from "fs";

interface Props {
  keyCurrent: string;
  value: any;
  onChange: (text: string) => void;
}

const MyParagraph = ({ onChange, keyCurrent, value }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [target, setTarget] = useState("");

  const handleEditMode = (txt: string) => {
    setEditMode(true);
    setTarget(txt);
  }; 

  const handleOnChange = (txt: string) => {
    onChange(txt);
    setEditMode(false);
    setTarget("");
  };

  return (
    <Paragraph
      editable={{
        icon: <BiEditAlt size={18} />,
        enterIcon: <BiSave size={18} />,
        tooltip: "กดเพื่อแก้ไข",
        onStart: () => handleEditMode(keyCurrent),
        onChange: handleOnChange,
      }}
    >
      {editMode && target == keyCurrent ? (
        value
      ) : (
        <Typography.Link href={value && value} target="_blank">
          {value && value}
        </Typography.Link>
      )}
    </Paragraph>
  );
};
export default MyParagraph;

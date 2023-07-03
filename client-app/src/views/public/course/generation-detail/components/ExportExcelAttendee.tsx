import React from "react";
import { Attendee } from "../../../../../models/Course";
import { CSVLink } from "react-csv";
import { Button } from "antd";

interface Props {
  attendees: Attendee[];
  filename: string;
}

const headers = [
  { label: "ลำดับ", key: "index" },
  { label: "ชื่อ", key: "fullName" },
  { label: "อีเมล", key: "email" },
  { label: "วันที่", key: "date" },
  { label: "เพิ่มเติม", key: "more" },
];

const ExportExcelAttendee = ({ attendees, filename }: Props) => {
  const data = attendees.map((el, index) => ({
    index,
    fullName: el.fullName,
    email: el.email,
    date: el.date,
    more: "",
  }));

  return (
    <CSVLink filename={filename} headers={headers} data={data}>
      Excel
    </CSVLink>
  );
};

export default ExportExcelAttendee;

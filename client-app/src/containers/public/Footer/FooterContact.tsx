import React from "react";
import { Setting } from "../../../models/Setting";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

interface Props {
  setting: Setting;
}

const Menu = [
  {
    children: "วิทยาการคอมพิวเตอร์ เราเรียนอะไร?",
    to: RoutePath.comsciSubjectPage,
  },
  {
    children: "หลักสูตรวิทยาการคอมพิวเตอร์",
    to: RoutePath.syllabus,
  },
  {
    children: "ข่าวประชาสัมพันธ์",
    to: RoutePath.news,
  },
  {
    children: "โครงงานวิจัยนักศึกษา",
    to: RoutePath.projects,
  },
  {
    children: "อาจารย์ประจำสาขา",
    to: RoutePath.lecturers,
  },
  {
    children: "การทำงานของศิษย์เก่า",
    to: RoutePath.studentJobHistory,
  },
  {
    children: "นักศึกษาในสาขา",
    to: RoutePath.students,
  },
];

const FooterContact = ({ setting }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
      <div>
        <h2 className="mb-6 text-lg font-extrabold uppercase text-white">ติดต่อ</h2>
        <ul className=" text-gray-300">
          <li className="mb-4 hover:text-gray-100">
            <a
              className="hover:underline"
              href={setting?.pageFacebook || ""}
              target="_blank"
            >
              Facebook page
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-6 text-lg font-extrabold uppercase text-white ">
          เกี่ยวข้อง
        </h2>
        <ul className=" text-gray-300 ">
          <li className="mb-4 hover:text-gray-100">
            <a
              href={setting?.kruUrl || ""}
              target="_blank"
              className="hover:underline"
            >
              มหาวิทยาลัยราชภัฏกาญจนบุรี
            </a>
          </li>
          <li className="hover:text-gray-100">
            <a
              href={setting?.registerUrl || ""}
              target="_blank"
              className="hover:underline"
            >
              สมัครเรียน
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-2 lg:row-span-1 lg:col-span-1">
        <h2 className="mb-6 text-lg font-extrabold uppercase text-white">เมนู</h2>
        <ul className=" text-gray-300 ">
          {Menu.map((val: any, i: number) => (
            <li key={i} className="mb-4 hover:text-gray-100">
              <Link className="hover:underline" {...val} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterContact;

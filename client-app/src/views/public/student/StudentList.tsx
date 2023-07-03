import React from "react";
import { Row } from "antd";
import StudentCard from "./StudentCard";
import { Profile } from "../../../models/User";

const StudentList = ({ students }: { students: Profile[] }) => {
  return (
    <Row >
      {students.map((el: Profile, i) => (
        <StudentCard key={i} student={el} />
      ))} 
    </Row>
  );
};

export default StudentList;

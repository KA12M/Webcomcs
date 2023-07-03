import React, { useEffect } from "react";
import FormProject from "../../account/project/FormProject";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import Main from "../../../../containers/Main";
import { Breadcrumb } from "antd";
import { RoutePath } from "../../../../constants/RoutePath";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const ProjectPageForm = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic
            text="ฟอร์มบันทึกข้อมูลโครงงานวิจัย"
            links={
              <Breadcrumb.Item>
                <Link to={RoutePath.projects} children="โครงงานวิจัย" />
              </Breadcrumb.Item>
            }
          />
        </div>
      </div>

      <Main hScreen={false}>
        <section className="rounded-lg shadow-md my-2 p-4">
          <FormProject currentEdit={id} />
        </section>
      </Main>
    </div>
  );
};

export default observer(ProjectPageForm);

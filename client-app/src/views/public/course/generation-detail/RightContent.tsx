import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Empty, MenuProps, Dropdown } from "antd";

import { useStore } from "../../../../store/store";
import { RoutePath } from "../../../../constants/RoutePath";
import { DateFormatYear543 } from "../../../../utils/Date";
import BtnExportPDF from "../../../../components/BtnExportPDF";
import RegisterPDF from "./components/RegisterPDF";
import GenerationChatBox from "./components/GenerationChatBox";
import ExportExcelAttendee from "./components/ExportExcelAttendee"; 

const RightContent = () => {
  const {
    generationStore: { generationSelect },
    userStore: { user },
  } = useStore();

  const isHost = user?.username == generationSelect?.lecturer.username;

  const fileName = `${generationSelect?.title.replace(/\s/g, "-")}-${format(
    new Date(Date.now()),
    `dd-MM-yy`
  )}.pdf`;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <BtnExportPDF
          fileName={fileName}
          pdf={<RegisterPDF generation={generationSelect!} />}
        >
          pdf
        </BtnExportPDF>
      ),
    },
    {
      key: "2",
      label: (
        <ExportExcelAttendee
          filename={fileName + ".csv"}
          attendees={generationSelect?.generation.attendees || []}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between px-2 text-lg font-medium">
        <div className="text-md font-semibold text-gray-900 ">
          {generationSelect?.generation.attendees?.length} ผู้ลงทะเบียน
        </div>
        {isHost && (
          <Dropdown
            menu={{
              items,
            }}
          >
            <Button type="primary" shape="round">
              พิมพ์รายชื่อผู้ลงทะเบียน
            </Button>
          </Dropdown>
        )}
      </div>
      <div className=" w-full mx-auto bg-white rounded-xl shadow-md flex flex-col pt-4 min-h-36 max-h-96 overflow-y-scroll mb-4">
        {generationSelect?.generation.attendees?.length! < 1 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="ไม่มีข้อมูล"
          />
        )}
        {generationSelect?.generation.attendees!.map((val, i) => (
          <div
            key={i}
            className="user-row flex flex-col  justify-between cursor-pointer p-4 duration-300 sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
          >
            <div className="user flex items-center flex-row gap-4">
              <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5 ">
                {val.image ? (
                  <img
                    className="avatar w-16 h-16 rounded-full"
                    src={val.image}
                  />
                ) : (
                  <div className="avatar-initials w-16 h-16 rounded-full flex items-center justify-center bg-gray-500 text-lg text-white font-bold">
                    {val.fullName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="user-body flex flex-col mb-4 sm:mb-0">
                <Link
                  to={RoutePath.accountDetail(val.username)}
                  className="title font-medium no-underline mb-2"
                >
                  {val.fullName}
                </Link>
                <div className="skills flex flex-col">
                  <span className="subtitle text-slate-500">
                    {DateFormatYear543(val.date!)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GenerationChatBox generationId={generationSelect?.generation.id!} />
    </>
  );
};

export default observer(RightContent);

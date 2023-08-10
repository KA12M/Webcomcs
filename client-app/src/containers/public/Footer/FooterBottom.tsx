import React from "react";
import { FacebookOutlined } from "@ant-design/icons";

interface Props {
  pageFacebook: string;
}

const FooterBottom = ({ pageFacebook }: Props) => {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      {/* <span className="text-sm sm:text-center text-gray-400">
        © 2023{" "}
        <a href={pageFacebook} target="_blank" className="hover:underline">
          สาขาวิทยาการคอมพิวเตอร์
        </a>
        . มหาวิทยาลัยราชภัฏกาญจนบุรี.
      </span> */}

      <span className="text-sm sm:text-center text-gray-400">
        Dev. by Mr.Karan Khumthong and Asst. Prof.Teeradet Tavarpinun
      </span>
      <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
        <a
          href={pageFacebook}
          target="_blank"
          className="text-gray-500   hover:text-white"
        >
          <FacebookOutlined />
          <span className="sr-only">Facebook page</span>
        </a>
      </div>
    </div>
  );
};

export default FooterBottom;

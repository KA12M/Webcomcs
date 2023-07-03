import React from "react";
import ReactHtmlParser from "react-html-parser";

const Description = ({ description }: { description: string }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mt-3 flex relative z-30 mb-4">
      <div className="w-2.5 h-auto bg-indigo-700 rounded-tl-md rounded-bl-md"></div>
      <div className="w-full p-8">
        <div className="md:flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-6 mb-2 text-gray-800">
            รายละเอียด
          </h2>
        </div>
        <div className="text-base leading-6 mt-4 text-gray-600">
          {ReactHtmlParser(description)}
        </div>
      </div>
    </div>
  );
};

export default Description;

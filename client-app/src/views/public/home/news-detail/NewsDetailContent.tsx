import React from "react";
import { NewsDetail } from "../../../../models/News";
import ReactHtmlParser from "react-html-parser";
import URLImage from "../../../../utils/URL";
import { Divider, Space } from "antd";
import { BiPieChartAlt } from "react-icons/bi";
import NewsDateFormat from "./NewsDateFormat";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";

interface Props {
  newsSelected: NewsDetail;
}

const NewsDetailContent = ({ newsSelected: news }: Props) => {
  return (
    <main className="mt-8">
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            {news.title}
          </h2>
          <div className="py-2 text-gray-700 inline-flex items-center justify-center mb-2">
            <Space>
              <BiPieChartAlt />
              {NewsDateFormat(news.createdAt)}
            </Space>
          </div>
        </div>

        <img
          src={URLImage(news.mainImage)}
          className="w-full object-cover object-top lg:rounded cursor-pointer"
          style={{ height: "28em" }}
          onClick={() => window.open(URLImage(news.mainImage))}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
          <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
            {news.subTitle}
          </div>

          {/* <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4"></h2> */}

          <div className="pb-6">{ReactHtmlParser(news.body!)}</div>
        </div>

        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div className="p-2 px-4 border-t border-b md:border md:rounded">
            <div className="flex py-2">
              <Link to={RoutePath.accountDetail(news.author?.username!)}>
                {news.author?.image ? (
                  <img
                    src={URLImage(news.author?.image)}
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="avatar-initials w-10 h-10 mr-2 rounded-full flex items-center justify-center bg-gray-500 text-lg text-white font-bold">
                    {news.author?.fullName.charAt(0)}
                  </div>
                )}
              </Link>

              <div>
                <Link to={RoutePath.accountDetail(news.author?.username!)}>
                  <p className="font-semibold text-gray-700 text-sm">
                    {news.author?.fullName}
                  </p>
                </Link>
                <p className="font-semibold text-gray-600 text-xs">ผู้เขียน</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsDetailContent;

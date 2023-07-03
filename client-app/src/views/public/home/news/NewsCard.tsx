import React from "react";
import { Col } from "antd";
import { formatDistance } from "date-fns";
import { th } from "date-fns/locale";

import { News } from "../../../../models/News";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";
import { truncate } from "../../../../utils/accessor"; 

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  return (
    <Col
      xs={24}
      md={12}
      lg={6}
      onClick={() => router.navigate(RoutePath.newsDetail(news.id))}
      className="min-h-90"
    >
      <div className="bg-gray-50 shadow-md md:bg-white rounded-md mb-2 cursor-pointer hover:shadow-lg duration-300">
        <div className="flex-shrink-0 overflow-clip">
          <img
            src={news.mainImage}
            className="object-cover object-top w-full h-48 rounded-lg rounded-b-none hover:brightness-75 transition duration-500 ease-in-out"
            loading="lazy"
          />
        </div>

        <div className="py-1">
          <div className="px-4 h-16">
            <h2 className="font-medium mb-2 md:mt-4 text-2xl text-gray-800 line-clamp-2">
              {news.title && truncate(news.title, 50)}
            </h2>

            {/* <p className="break-words text-sm text-gray-700 mr-1">
              {truncate(news.subTitle!, 90)}
            </p> */}
          </div>

          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <div className="text-sm ml-2">
                <p className="text-black leading-none"></p>

                <p className="text-gray-700">
                  {formatDistance(new Date(news.createdAt), Date.now(), {
                    addSuffix: true,
                    locale: th,
                  })}
                </p>
              </div>
            </div>
            <div
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2 cursor-pointer"
              onClick={() => router.navigate(RoutePath.newsDetail(news.id))}
            >
              อ่านเพิ่มเติม
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default NewsCard;

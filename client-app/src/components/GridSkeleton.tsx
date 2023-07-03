import React from "react";

const GridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
      <div className="w-full ">
        <div className="w-full h-36 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      </div>

      <div className="w-full ">
        <div className="w-full h-36 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      </div>

      <div className="w-full ">
        <div className="w-full h-36 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      </div>
    </div>
  );
};

export default GridSkeleton;

import React from "react";
import { useStore } from "../../../../store/store";
import { config } from "../../../../constants/config";
import { observer } from "mobx-react-lite";

const WhatStudy = () => {
  const {
    commonStore: { json },
    comSciSubject: { comsciSubjectRegistry },
  } = useStore();

  return (
    <section className="py-20 bg-stone-100 overflow-x-clip">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-auto items-center max-w-6xl ">
        <div className="px-4 md:mr-6">
          <h3 className="text-4xl pr-6 sm:leading-snug tracking-tight font-bold text-black">
            {json["what-study"]["title"]}
          </h3>
          <p className="mt-4 text-stone-800 text-xl font-medium">
            {json["what-study"]["subTitle"]}
          </p>
        </div>
        <div>
          <div className="bg-indigo-500 transform -translate-x-10 relative h-64"></div>
          <div className="transform rounded-md bg-white rotate-3 scale-110 translate-x-10 md:shadow-2xl -ml-4 -mt-44 p-12  space-y-2">
            <div className="px-4 sm:px-0 grid grid-cols-5 sm:grid-cols-4 gap-2 sm:gap-8 max-w-5xl mx-auto">
              {/* {json["what-study"]["logo-list"] &&
                json["what-study"]["logo-list"].map(
                  (val: string, i: number) => (
                    <img key={i} src={config.baseURL + val} />
                  )
                )} */}

              {Array.from(comsciSubjectRegistry.values()).map((val, i) => (
                <img key={i} src={val.iconPreview} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(WhatStudy);

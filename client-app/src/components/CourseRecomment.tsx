import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { CourseList } from "../models/Course";
import { Link } from "react-router-dom";
import { RoutePath } from "../constants/RoutePath";

const CourseRecomment = () => {
  const {
    courseStore: { courseRegistry },
  } = useStore();
  const [data, setData] = useState<CourseList[]>();

  useEffect(() => {
    const shuffled = Array.from(courseRegistry.values()).sort(
      () => 0.5 - Math.random()
    );
    if (shuffled.length <= 4) setData(shuffled);
    else setData(shuffled.slice(0, 4));
  }, []);

  return (
    <section className="w-full mx-auto px-2 my-12 ">
      <article>
        <h2 className="text-2xl font-extrabold text-gray-900">หลักสูตรอบรม</h2>
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 ">
          {data?.map((val) => (
            <article
              key={val.id}
              className="hover-card relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"
              style={{
                backgroundImage: `url(${val.image!})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <Link
                    to={RoutePath.courseDetail(val.id)}
                    className="text-white text-2xl font-bold text-center"
                  >
                    <span className="absolute inset-0"></span>
                    {val.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </section>
      </article>
    </section>
  );
};

export default observer(CourseRecomment);

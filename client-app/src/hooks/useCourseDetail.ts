import { useState } from "react";

const useCourseDetail = () => {
  const [loadApp, setLoadApp] = useState(true);

  return { loadApp, setLoadApp };
};

export default useCourseDetail;

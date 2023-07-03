import { TourProps } from "antd";

import { config } from "./../../../constants/config";

const StepTourYoutubeLink = (youtube: any[]) => {
  const steps: TourProps["steps"] = [];

  if (youtube)
    youtube.forEach((el: any) =>
      steps.push({
        title: el.title,
        description: el.description,
        cover: (
          <img
            src={config.baseURL + "/" + el.pathImage}
            alt={el.pathImage}
          />
        ),
      })
    );

  return steps;
};

export default StepTourYoutubeLink;

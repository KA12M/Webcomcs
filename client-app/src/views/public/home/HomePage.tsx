import { observer } from "mobx-react-lite";
import { Row } from "antd";

import { useStore } from "../../../store/store";
import HomePageCarousel from "./HomePageCarousel";
import Main from "../../../containers/Main";
import CardMenu from "./CardMenu";
import NewsHomePage from "./news/NewsHomePage";
import { config } from "../../../constants/config";
import MapTest from "../../../components/MapLocation";
import { YoutubeSpace } from "./YoutubeSpace";
import WhatStudy from "./banner/WhatStudy";

const HomePage: React.FC = () => {
  const {
    homePhotoStore: { Photos },
    settingStore: { setting },
    commonStore: { json },
  } = useStore();

  return (
    <>
      <HomePageCarousel photo={Photos} />

      <Main>
        <Row gutter={[16, 16]} className="my-8">
          {Array.from(json["card-menu"] || []).map((val: any, i: number) => (
            <CardMenu
              key={i}
              title={val.title || ""}
              image={config.baseURL + "/" + val.image}
              url={val.url}
            />
          ))}
        </Row>

        <hr className="w-40 my-10 border-4 rounded-md sm:mx-0 mx-auto" />

        <NewsHomePage />

        <WhatStudy />

        <YoutubeSpace youtube={setting?.youtubeList!} />

        {json["open-map-box"] && (
          <MapTest lat={setting?.latAndLng.lat} lng={setting?.latAndLng.lng} />
        )}
      </Main>
    </>
  );
};

export default observer(HomePage);

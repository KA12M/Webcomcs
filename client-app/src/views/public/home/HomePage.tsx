import { observer } from "mobx-react-lite";
import { Col, Row, Space } from "antd";

import { useStore } from "../../../store/store";
import HomePageCarousel from "./HomePageCarousel";
import Main from "../../../containers/Main";
import CardMenu from "./CardMenu";
import NewsHomePage from "./news/NewsHomePage";
import { YoutubeSpace } from "./YoutubeSpace";

const HomePage: React.FC = () => {
  const {
    homePhotoStore: { Photos },
  } = useStore();

  return (
    <>
      <HomePageCarousel photo={Photos} />

      <Main>
        <Row gutter={[16, 16]} className="py-12 ">
          <CardMenu title="นักศึกษา" image="public/image/bg-2.jpg" />
          <CardMenu title="อาจารย์" image="public/image/bg-1.jpg" />
          <CardMenu
            title="ศิษย์เก่า"
            image="public/image/306138126_502518891883318_5989501266831546160_n.jpg"
          />
        </Row>

        <NewsHomePage />

        {/* <YoutubeSpace /> */}
      </Main>
    </>
  );
};

export default observer(HomePage);

import React from "react";
import { Row, Col } from "antd";
import YouTube, { YouTubeProps } from "react-youtube";

const opts = {
  height: "390",
  width: "100%",
};

const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  event.target.pauseVideo();
};

export const YoutubeSpace = () => {
  return (
    <Row gutter={[16, 16]} className="py-12 ">
      <Col xs={24} xl={12}>
        <YouTube videoId="riIUrn3yLlY" opts={opts} onReady={onPlayerReady} />
      </Col>
      <Col xs={24} xl={12}>
        <YouTube videoId="udzjVQYfplM" opts={opts} onReady={onPlayerReady} />
      </Col>
    </Row>
  );
};

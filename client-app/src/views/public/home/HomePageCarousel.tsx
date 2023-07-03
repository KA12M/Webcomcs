import React from "react";
import { Carousel } from "antd";
import { HomePhoto } from "../../../models/HomePhoto";
import { config } from "../../../constants/config";

const HomePageCarousel = ({ photo }: any) => {
  return (
    <Carousel
      autoplay
      lazyLoad="progressive"
      className="carousel--image z-0"
      draggable
    >
      {photo.length > 0 ? (
        photo.map((photo: HomePhoto) => (
          <img key={photo.id} className="img" src={photo.url} />
        ))
      ) : (
        <img
          key={photo.id}
          className="img"
          src={config.baseURL + "/image/homepage.jpg"}
        />
      )}
    </Carousel>
  );
};

export default HomePageCarousel;

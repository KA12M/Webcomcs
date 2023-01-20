import React from "react";
import { Carousel } from "antd";
import { HomePhoto } from "../../../models/HomePhoto";

const HomePageCarousel = ({ photo }: any) => {
  return (
    <Carousel
      autoplay
      lazyLoad="progressive"
      className="carousel--image"
      draggable
    >
      {photo.length > 0 ? (
        photo.map((photo: HomePhoto) => (
          <img key={photo.id} className="img" src={photo.url} />
        ))
      ) : (
        <img key={photo.id} className="img" src={"/image/homepage.jpg"} />
      )}
    </Carousel>
  );
};

export default HomePageCarousel;

import React from "react";
import ReactPlayer from "react-player";

const Youtube = ({ url }: { url: string }) => {
  return <ReactPlayer controls height={"16rem"} width={"100%"} url={url} />;
};

export default Youtube;

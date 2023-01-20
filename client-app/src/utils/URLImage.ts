const URLImage = (url: string) => {
  return import.meta.env.VITE_API_URL.split("api")[0] + "image-upload/" + url;
};

export default URLImage;

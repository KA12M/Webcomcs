const URLImage = (url: string) => {
  return import.meta.env.VITE_API_URL.split("api")[0] + "image-upload/" + url;
};

export const URLFile = (url: string) => {
  return import.meta.env.VITE_API_URL.split("api")[0] + "file-upload/" + url;
};

export default URLImage;

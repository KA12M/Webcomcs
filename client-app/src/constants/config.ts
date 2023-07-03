export const config = {
  baseURL: import.meta.env.VITE_HOST, 
  baseAPI: import.meta.env.VITE_API_URL,
  urlUploadFile: import.meta.env.VITE_API_URL + "/uploadFile/image",
  mapboxKeyApi: import.meta.env.VITE_MAPBOX_KEYAPI,
  chatSocket: import.meta.env.VITE_URL_CHAT_SOCKET,
};

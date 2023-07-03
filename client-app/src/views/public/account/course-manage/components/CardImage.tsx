import React from "react";
import { Switch, Tooltip } from "antd";
import { Photo } from "../../../../../models/Course";
import URLImage from "../../../../../utils/URL";

interface Props {
  onSetMain: any;
  remove: any;
  photo: Photo;
}

const CardImage = ({ onSetMain, photo, remove }: Props) => {
  return (
    <div className="relative rounded-md shadow-md w-full h-36">
      <img
        className="w-full h-full object-cover rounded-md shadow-md"
        src={URLImage(photo.url)}
      />
      <Tooltip placement="top" title="นำออก">
        <button
          type="button"
          onClick={remove}
          disabled={photo.isMain ?? false}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.364 5.636a.996.996 0 0 0-1.414 0L12 10.586 7.05 5.636a.996.996 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.996.996 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.996.996 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.996.996 0 0 0 0-1.414z" />
          </svg>
        </button>
      </Tooltip>
      
      <div className="absolute bottom-2 right-2">
        <Switch
          onClick={onSetMain} 
          defaultChecked={photo.isMain}
          checked={photo.isMain}
        />
      </div>
    </div>
  );
};

export default CardImage;

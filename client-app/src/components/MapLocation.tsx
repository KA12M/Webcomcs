import React, { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

import { config } from "../constants/config";
import { useStore } from "../store/store";
import { MyIcon } from "../constants/MyIcon/index";

interface Props {
  lat: any;
  lng: any;
  isOnClick?: boolean;
}

const MapLocation = ({ lat = 0, lng = 0, isOnClick = false }: Props) => {
  const {
    settingStore: { changeSetting },
  } = useStore();

  return (
    <div className="mt-8 mb-2">
      <div className="mb-4 px-4 rounded-sm border-l-4 border-green-500">
        <p className="text-lg">
          สาขาวิทยาการคอมพิวเตอร์, มหาวิทยาลัยราชภัฏกาญจนบุรี
        </p>
        {isOnClick && (
          <p>
            {lat}, {lat}
          </p>
        )}
      </div>

      <Map
        mapboxAccessToken={config.mapboxKeyApi}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 16,
        }}
        cursor="mouse"
        style={{ height: 420 }}
        touchZoomRotate={false} 
        // dragPan={false} 
        scrollZoom={false}
        onClick={(e) => {
          if (isOnClick) {
            changeSetting({ latAndLng: e.lngLat });
          }
        }}
      >
        <Marker latitude={lat} longitude={lng}>
          <MyIcon.markerPinRed />
        </Marker>

        <FullscreenControl containerId="map-container" />

        <NavigationControl />

        <GeolocateControl />
      </Map>
    </div>
  );
};

export default MapLocation;

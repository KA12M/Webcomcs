import More from "./more";
import Time from "./time";
import MapboxMarkerIconRed from "./MapboxMarkerIconRed";
import Send from "./send";

interface Icon {
  time: any;
  more: any;
  markerPinRed: any;
  send: any
}

export const MyIcon: Icon = {
  time: () => <Time />,
  more: () => <More />,
  markerPinRed: () => <MapboxMarkerIconRed />,
  send: () => <Send />
};

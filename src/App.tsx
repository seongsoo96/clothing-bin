import React, { useEffect, useState } from "react";
import LocationButton from "./components/LocationButton";
import MapContainer from "./components/MapContainer";
import SearchBar from "./components/SearchBar";

const { kakao } = window;
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  // const [container, setContainer] = useState<HTMLElement>();
  // const [options, setOptions] = useState<{
  //   center: any;
  //   level: number;
  // }>();

  const [map, setMap] = useState();
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566535, 126.97796919),
      level: 8,
    };
    setMap(new kakao.maps.Map(container, options));
  }, []);

  return (
    <div className="relative flex flex-row justify-center">
      <LocationButton />
      <SearchBar />
      <MapContainer map={map} />
    </div>
  );
}

export default App;

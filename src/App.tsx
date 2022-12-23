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
  // const [map, setMap] = useState<{ map: any }>();

  // useEffect(() => {
  // setContainer(document.getElementById("map"));

  // const options = {
  //   center: new kakao.maps.LatLng(33.450701, 126.570667),
  //   level: 6,
  // };
  // const map = new kakao.maps.Map(container, options);
  // },[])

  return (
    <div className="relative flex flex-row justify-center">
      <LocationButton />
      <SearchBar />
      <MapContainer />
    </div>
  );
}

export default App;

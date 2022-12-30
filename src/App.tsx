import { useEffect, useState } from "react"
import { Map } from "react-kakao-maps-sdk"
import LocationButton from "./components/LocationButton"
import MapContainer from "./components/MapContainer"
import MapContainer2 from "./components/MapContainer2"
import SearchBar from "./components/SearchBar"

const { kakao } = window
declare global {
  interface Window {
    kakao: any
  }
}

function App() {
  // const [map, setMap] = useState()
  // useEffect(() => {
  //   const container = document.getElementById("map")
  //   const options = {
  //     center: new kakao.maps.LatLng(37.566535, 126.97796919),
  //     level: 8,
  //   }
  //   setMap(new kakao.maps.Map(container, options))
  // }, [])

  return (
    <div id="container" className="relative flex flex-row justify-center">
      {/* <LocationButton map={map} /> */}
      {/* <SearchBar /> */}
      {/* <MapContainer map={map} /> */}
      <MapContainer2 />
    </div>
  )
}

export default App

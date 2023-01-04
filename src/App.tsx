import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { Map } from "react-kakao-maps-sdk"
import { roadViewAtom } from "./atoms/roadViewAtom"
import CloseRoadViewButton from "./components/CloseRoadViewButton"
import LocationButton from "./components/LocationButton"
import LocationButton2 from "./components/LocationButton2"
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
  const showRoadView = useAtomValue(roadViewAtom)

  return (
    <div
      id="container"
      className="relative h-screen flex flex-row justify-center"
    >
      {/* <LocationButton /> */}
      {/* <SearchBar /> */}
      {/* <MapContainer map={map} /> */}
      <MapContainer2 />
      {!showRoadView ? <LocationButton2 /> : <CloseRoadViewButton />}
    </div>
  )
}

export default App

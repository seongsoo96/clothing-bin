import { useAtomValue } from "jotai"
import { Suspense } from "react"
import { roadViewAtom } from "./atoms/roadViewAtom"
import CloseRoadViewButton from "./components/CloseRoadViewButton"
import LocationButton from "./components/LocationButton"
import MapContainer from "./components/MapContainer"
import HowToUse from "./components/HowToUse"
import SkeletonMap from "./components/SkeletonMap"

function App() {
  const showRoadView = useAtomValue(roadViewAtom)

  return (
    <div
      id="container"
      className="relative h-screen flex flex-row justify-center"
    >
      <HowToUse />
      <Suspense fallback={<SkeletonMap />}>
        <MapContainer />
      </Suspense>
      {showRoadView ? <CloseRoadViewButton /> : <LocationButton />}
    </div>
  )
}

export default App

import { useAtom } from "jotai"
import React from "react"
import { Roadview } from "react-kakao-maps-sdk"
import { centerAtom } from "../atoms"

export default function RoadViewContainer() {
  const [center, setCenter] = useAtom(centerAtom)

  return (
    <div className="w-6/12 h-80 border border-black absolute bottom-0 z-10">
      {/* <Roadview
            className="w-full h-full"
            position={{ ...center, radius: 50 }}
            pan={pan}
            onViewpointChange={(roadview) =>
              setPan(roadview.getViewpoint().pan)
            }
            onPositionChanged={(roadview) =>
              setCenter({
                lat: roadview.getPosition().getLat(),
                lng: roadview.getPosition().getLng(),
              })
            }
          ></Roadview>
          <button
            onClick={closeRoadView}
            className="bg-white top-0 right-0 z-20 absolute"
          >
            닫기
          </button> */}
    </div>
  )
}

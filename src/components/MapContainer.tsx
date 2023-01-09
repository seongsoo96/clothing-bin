import { useAtom, useAtomValue } from "jotai"
import { memo, useState } from "react"
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Roadview,
} from "react-kakao-maps-sdk"
import allCoords from "../assets/coordsAll.json"
import { centerAtom, levelAtom } from "../atoms"
import { roadViewAtom } from "../atoms/roadViewAtom"
import { roadViewStyleAtom } from "../atoms/roadViewStyleAtom"

const PaintingMarker = memo(
  ({ clickMarker }: { clickMarker: (marker: kakao.maps.Marker) => void }) => {
    return (
      <>
        {allCoords.map((position, index) => (
          <MapMarker
            key={`${position.lat}-${position.lng}-${index}`}
            position={{
              lat: Number(position.lat),
              lng: Number(position.lng),
            }}
            onClick={clickMarker}
            image={{
              src: "/images/gggg.png",
              size: {
                width: 15,
                height: 15,
              },
            }}
          />
        ))}
      </>
    )
  }
)

export default function MapContainer() {
  const [center, setCenter] = useAtom(centerAtom)
  const [showRoadView, setShowRoadView] = useAtom(roadViewAtom)
  const [level, setLevel] = useAtom(levelAtom)
  const [pan, setPan] = useState(0)
  const style = useAtomValue(roadViewStyleAtom)
  const [clickedMarkerPos, setClickedMarkerPos] = useState({
    lat: 37.566535,
    lng: 126.97796919,
  })

  const getAngleClassName = (angle: number) => {
    const threshold = 22.5 //이미지가 변화되어야 되는(각도가 변해야되는) 임계 값
    for (var i = 0; i < 16; i++) {
      //각도에 따라 변화되는 앵글 이미지의 수가 16개
      if (angle > threshold * i && angle < threshold * (i + 1)) {
        //각도(pan)에 따라 아이콘의 class명을 변경
        return "m" + i
      }
    }
  }

  const clickMarker = (marker: kakao.maps.Marker) => {
    setShowRoadView(true)
    setCenter({
      lat: marker.getPosition().getLat(),
      lng: marker.getPosition().getLng(),
    })
    setLevel(2)
    setClickedMarkerPos({
      lat: Number(marker.getPosition().getLat()),
      lng: Number(marker.getPosition().getLng()),
    })
  }

  return (
    <>
      <div className={style}>
        <Map
          center={{
            ...center,
          }}
          style={{ width: "100%", height: "100%", cursor: "grab" }}
          level={level}
        >
          {showRoadView ? (
            <MapMarker
              position={{
                ...clickedMarkerPos,
              }}
              image={{
                src: "/images/gggg.png",
                size: {
                  width: 15,
                  height: 15,
                },
              }}
            />
          ) : (
            <PaintingMarker clickMarker={clickMarker} />
          )}

          {showRoadView ? (
            <>
              <CustomOverlayMap position={center} yAnchor={1}>
                <div className={`MapWalker ${getAngleClassName(pan)}`}>
                  <div className={`angleBack`}></div>
                  <div className={"figure"}></div>
                </div>
              </CustomOverlayMap>
              <MapMarker
                position={center}
                draggable={true}
                onDragEnd={(marker) => {
                  setCenter({
                    lat: marker.getPosition().getLat(),
                    lng: marker.getPosition().getLng(),
                  })
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
                  size: { width: 26, height: 46 },
                  options: {
                    spriteSize: { width: 1666, height: 168 },
                    spriteOrigin: { x: 705, y: 114 },
                    offset: { x: 13, y: 46 },
                  },
                }}
              />
            </>
          ) : null}
        </Map>
      </div>
      {showRoadView ? (
        <Roadview
          className="w-full md:h-full h-2/3"
          position={{ ...center, radius: 50 }}
          pan={pan}
          zoom={-3}
          onViewpointChange={(roadview) => setPan(roadview.getViewpoint().pan)}
          onPositionChanged={(roadview) =>
            setCenter({
              lat: roadview.getPosition().getLat(),
              lng: roadview.getPosition().getLng(),
            })
          }
        ></Roadview>
      ) : null}
    </>
  )
}

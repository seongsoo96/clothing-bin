import { useAtom, useAtomValue } from "jotai"
import { useEffect, useRef, useState } from "react"
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  // MapTypeId,
  Roadview,
} from "react-kakao-maps-sdk"
import allCoords from "../assets/coordsAll.json"
import { centerAtom, levelAtom } from "../atoms"
import { roadViewAtom } from "../atoms/roadViewAtom"
import { roadViewStyleAtom } from "../atoms/roadViewStyleAtom"

export default function MapContainer() {
  const mapRef = useRef<kakao.maps.Map>()
  const [center, setCenter] = useAtom(centerAtom)
  const [showRoadView, setShowRoadView] = useAtom(roadViewAtom)
  const [level, setLevel] = useAtom(levelAtom)
  const [pan, setPan] = useState(0)
  // const [mapTypeRV, setMapTypeRV] = useState(false)
  const style = useAtomValue(roadViewStyleAtom)

  useEffect(() => {
    const map = mapRef.current
    if (map) map.relayout()
  }, [style])

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
  }

  return (
    <>
      <div
        className={
          "cursor-grab " +
          (showRoadView
            ? "w-[310px] h-[190px] z-20 !absolute bottom-0 left-0"
            : "w-screen h-screen")
        }
      >
        <Map
          center={{
            ...center,
          }}
          style={style}
          level={level}
        >
          {showRoadView ? (
            <MapMarker
              position={{
                lat: Number(center.lat),
                lng: Number(center.lng),
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
            allCoords.map((position, index) => (
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
            ))
          )}
          {showRoadView ? (
            <>
              {/* {mapTypeRV ? (
                <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
              ) : null} */}
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
          className="w-full h-full"
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

import { useAtom, useSetAtom } from "jotai"
import React, { useEffect, useRef, useState } from "react"
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeId,
  Roadview,
} from "react-kakao-maps-sdk"
import allCoords from "../assets/coordsAll.json"
import { centerAtom, levelAtom } from "../atoms"
import { roadViewAtom } from "../atoms/roadViewAtom"

export default function MapContainer2() {
  const [center, setCenter] = useAtom(centerAtom)
  const [showRoadView, setShowRoadView] = useAtom(roadViewAtom)
  const [level, setLevel] = useAtom(levelAtom)
  const [pan, setPan] = useState(0)
  const [mapTypeRV, setMapTypeRV] = useState(false)
  const [style, setStyle] = useState({
    width: "100%",
    height: "100%",
    cursor: "grab",
  })

  const closeRoadView = () => {
    setShowRoadView(false)
  }

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
    setLevel(7)
  }

  return (
    <>
      <div
        onMouseOver={() => (showRoadView ? setMapTypeRV(true) : null)}
        onMouseLeave={() => (showRoadView ? setMapTypeRV(false) : null)}
        className={
          "cursor-grab " +
          (showRoadView
            ? "w-[310px] h-[190px] z-20 !absolute bottom-0 left-0"
            : "w-screen h-screen")
        }
      >
        <Map // 지도를 표시할 Container
          center={{
            ...center,
          }}
          style={style}
          level={level} // 지도의 확대 레벨
          // ref={mapRef}
        >
          {allCoords.map((position, index) => (
            <MapMarker
              key={`${position.lat}-${position.lng}-${index}`}
              position={{
                lat: Number(position.lat),
                lng: Number(position.lng),
              }} // 마커를 표시할 위치
              onClick={clickMarker}
              image={{
                src: "/images/gggg.png", // 마커이미지의 주소입니다
                size: {
                  width: 15,
                  height: 15,
                },
              }}
            />
          ))}
          {showRoadView ? (
            <>
              {mapTypeRV ? (
                <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
              ) : null}
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
        // <div className="w-full md:w-6/12 h-80 border border-black absolute bottom-0 z-10">
        <Roadview
          className="w-full h-full"
          position={{ ...center, radius: 50 }}
          pan={pan}
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

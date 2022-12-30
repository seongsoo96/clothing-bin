import React, { useState } from "react"
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeId,
  Roadview,
} from "react-kakao-maps-sdk"
import allCoords from "../assets/coordsAll.json"

export default function MapContainer2() {
  const [isError, setIsError] = useState(false)
  const [center, setCenter] = useState({
    lat: 37.566535,
    lng: 126.97796919,
  })
  const [showRoadView, setShowRoadView] = useState(false)
  const [level, setLevel] = useState(7)
  const [pan, setPan] = useState(0)

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
    setLevel(3)
  }

  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          ...center,
        }}
        className="w-screen h-screen"
        level={level} // 지도의 확대 레벨
      >
        {allCoords.map((position, index) => (
          <MapMarker
            key={`${position.lat}-${position.lng}-${index}`}
            position={{ lat: Number(position.lat), lng: Number(position.lng) }} // 마커를 표시할 위치
            onClick={clickMarker}
            image={{
              src: "/images/blue_dot.png", // 마커이미지의 주소입니다
              size: {
                width: 20,
                height: 20,
              },
            }}
          />
        ))}
        {showRoadView ? (
          <>
            <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
            <CustomOverlayMap
              position={center}
              className={`MapWalker ${getAngleClassName(pan)}`}
              yAnchor={1}
            >
              <div className={`angleBack`}></div>
              <div className={"figure"}></div>
            </CustomOverlayMap>
            <MapMarker
              position={center}
              draggable={true}
              onDragEnd={(marker) => {
                setCenter({
                  lat: marker.getPosition().getLat(),
                  lng: marker.getPosition().getLng(),
                })
                setIsError(false)
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
      {showRoadView ? (
        <Roadview
          className="w-6/12 h-80 border border-black absolute bottom-0 z-10"
          position={{ ...center, radius: 50 }}
          pan={pan}
          onViewpointChange={(roadview) => setPan(roadview.getViewpoint().pan)}
          onPositionChanged={(roadview) =>
            setCenter({
              lat: roadview.getPosition().getLat(),
              lng: roadview.getPosition().getLng(),
            })
          }
          onErrorGetNearestPanoId={() => setIsError(true)}
        ></Roadview>
      ) : null}
    </>
  )
}

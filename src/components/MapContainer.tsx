import { useCallback, useEffect, useState } from "react"
import { Roadview } from "react-kakao-maps-sdk"
import allCoords from "../assets/coordsAll.json"

const { kakao } = window

export default function MapContainer({ map }: { map: any }) {
  const [showRoadView, setShowRoadView] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [pos, setPos] = useState({
    lat: 33.450422139819736,
    lng: 126.5709139924533,
  })

  const closeRoadView = useCallback(() => {
    setShowRoadView(!showRoadView)
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
    setOverlay(false)
  }, [map, showRoadView])

  const openRoadView = useCallback(() => {
    setShowRoadView(true)
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
    setOverlay(true)
  }, [map])

  const clickMarker = useCallback(
    (selectedMarker: any) => {
      const roadviewContainer = document.getElementById("roadview")
      const roadview = new kakao.maps.Roadview(roadviewContainer)
      const roadviewClient = new kakao.maps.RoadviewClient()
      const position = selectedMarker.getPosition()
      // setPos(position)

      roadviewClient.getNearestPanoId(position, 50, function (panoId: any) {
        roadview.setPanoId(panoId, position)
      })
      setPos(position)

      if (overlay) {
        closeRoadView()
      }
      openRoadView()

      map.setLevel(1)
      map.setCenter(position)

      if (showRoadView) {
        selectedMarker.setPosition(position)
      }
    },
    [closeRoadView, map, openRoadView, overlay, showRoadView]
  )

  const addMarker = useCallback(
    (coord: any) => {
      const coords = new kakao.maps.LatLng(coord.y, coord.x)

      let selectedMarker: any = null
      const markerImageUrl = "/images/blue_dot.png",
        markerImageSize = new kakao.maps.Size(20, 20),
        markerImageOptions = {
          offset: new kakao.maps.Point(10, 20),
        }

      const markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        markerImageSize,
        markerImageOptions
      )

      const marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: coords,
      })

      kakao.maps.event.addListener(marker, "click", function () {
        selectedMarker = marker
        clickMarker(selectedMarker)
      })
    },
    [map, clickMarker]
  )

  useEffect(() => {
    for (const coord of allCoords) {
      addMarker(coord)
    }
  }, [addMarker, map])

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {showRoadView ? (
        // <div className="w-80 h-80 border border-black absolute bottom-0 z-10">
        //   <div id="roadview" className="w-full h-full"></div>
        //   <button
        //     onClick={closeRoadView}
        //     className="bg-white top-0 right-0 z-20 absolute"
        //   >
        //     닫기
        //   </button>
        // </div>
        <Roadview // 로드뷰를 표시할 Container
          position={{
            ...pos,
            radius: 50,
          }}
          className="w-80 h-80 border border-black absolute bottom-0 z-10"
          // style={{
          //   // 지도의 크기
          //   width: "100%",
          //   height: "450px",
          // }}
        />
      ) : (
        <div>
          <div id="roadview"></div>
        </div>
      )}
    </div>
  )
}

//지도위에 현재 로드뷰의 위치와, 각도를 표시하기 위한 map walker 아이콘 생성 클래스
function MapWalker(this: any, position: any) {
  //커스텀 오버레이에 사용할 map walker 엘리먼트
  var content = document.createElement("div")
  var figure = document.createElement("div")
  var angleBack = document.createElement("div")

  //map walker를 구성하는 각 노드들의 class명을 지정 - style셋팅을 위해 필요
  content.className = "MapWalker"
  figure.className = "figure"
  angleBack.className = "angleBack"

  content.appendChild(angleBack)
  content.appendChild(figure)

  //커스텀 오버레이 객체를 사용하여, map walker 아이콘을 생성
  var walker = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    yAnchor: 1,
  })

  this.walker = walker
  this.content = content
}

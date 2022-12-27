// import axios from "axios";
// import gwanakJson from "../assets/gwanak.json";
// import gwanakJson1 from "../assets/gwanak1.json";
// import gwanakJson2 from "../assets/gwanak2.json";
// import gwanakJson3 from "../assets/gwanak3.json";
// import gwangjinJson from "../assets/gwangjin.json";
// import dongjakJson from "../assets/dongjak.json";
// import mapoJson from "../assets/mapo.json";
// import yangcheonJson1 from "../assets/yangcheon1.json";
// import yangcheonJson2 from "../assets/yangcheon2.json";
// import seodaemun from "../assets/seodaemun.json";
// import seodaemun1 from "../assets/seodaemun1.json";
// import seodaemun2 from "../assets/seodaemun2.json";
// import seocho from "../assets/seocho.json";
// import gangnam1 from "../assets/gangnam1.json";
// import gangnam2 from "../assets/gangnam2.json";
// import jungnang1 from "../assets/jungnang1.json";
// import jungnang2 from "../assets/jungnang2.json";
// import useMarker from "../hooks/useMarker"

// import gwanakCoords from "../assets/coordsGwanak.json";
// import jongroCoords from "../assets/coordsJongro.json";
// import guroCoords from "../assets/coordsGuro.json";
// import gwangjinCoords from "../assets/coordsGwangjin.json";
// import mapoCoords from "../assets/coordsMapo.json";
// import dongjakCoords from "../assets/coordsDongjak.json";
// import yangcheonCoords from "../assets/coordsYangcheon.json";
// import yeongdeungpoCoords from "../assets/coordsYeongdeungpo.json";
// import seodaemunCoords from "../assets/coordsSeodaemun.json";
// import geumcheonCoords from "../assets/coordsGeumcheon.json";
// import seochoCoords from "../assets/coordsSeocho.json";
// import gangnamCoords from "../assets/coordsGangnam.json";
// import jungnangCoords from "../assets/coordsJungnang.json";
import { useCallback, useEffect, useState } from "react"
import allCoords from "../assets/coordsAll.json"

const { kakao } = window

export default function MapContainer({ map }: { map: any }) {
  const [showRoadView, setShowRoadView] = useState(false)
  //   const [area, setArea] = useState(jungnang2.data);
  // const geocoder = new kakao.maps.services.Geocoder()
  // const hello: any = []

  // const gwanak = JSON.stringify(gwanakCoords);
  // const jongro = JSON.stringify(jongroCoords);
  // const guro = JSON.stringify(guroCoords);
  // const gwangjin = JSON.stringify(gwangjinCoords);
  // const mapo = JSON.stringify(mapoCoords);
  // const dongjak = JSON.stringify(dongjakCoords);
  // const yangcheon = JSON.stringify(yangcheonCoords);
  // const yeongdeungpo = JSON.stringify(yeongdeungpoCoords);
  // const seodaemun = JSON.stringify(seodaemunCoords);
  // const geumcheon = JSON.stringify(geumcheonCoords);
  // const seocho = JSON.stringify(seochoCoords);
  // const gangnam = JSON.stringify(gangnamCoords);
  // const jungnang = JSON.stringify(jungnangCoords);
  // const all = JSON.stringify(allCoords)

  // const [map, setMap] = useState();
  // useEffect(() => {
  //   const container = document.getElementById("map");
  //   const options = {
  //     center: new kakao.maps.LatLng(37.566535, 126.97796919),
  //     level: 8,
  //   };
  //   setMap(new kakao.maps.Map(container, options));
  // }, []);
  // useMarker(gwanak, map);
  // useMarker(jongro, map);
  // useMarker(guro, map);
  // useMarker(gwangjin, map);
  // useMarker(mapo, map);
  // useMarker(dongjak, map);
  // useMarker(yangcheon, map);
  // useMarker(yeongdeungpo, map);
  // useMarker(seodaemun, map);
  // useMarker(geumcheon, map);
  // useMarker(seocho, map);
  // useMarker(gangnam, map);
  // useMarker(jungnang, map);
  // useMarker(all, map)

  // const areaCoords = JSON.parse(all)

  const toggleOverlay = useCallback(
    (active: boolean, marker: any) => {
      if (active) {
        setShowRoadView(!showRoadView)

        // 지도 위에 로드뷰 도로 오버레이를 추가합니다
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)

        // 지도 위에 마커를 표시합니다
        marker.setMap(map)

        // 마커의 위치를 지도 중심으로 설정합니다
        marker.setPosition(map.getCenter())
      } else {
        setShowRoadView(!showRoadView)

        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)

        marker.setMap(null)
      }
    },
    [map, showRoadView]
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
        if (!selectedMarker || selectedMarker !== marker) {
          !!selectedMarker &&
            selectedMarker.setImage(selectedMarker.normalImage)

          // marker.setImage(clickImage)
        }
        selectedMarker = marker

        const roadviewContainer = document.getElementById("roadview") //로드뷰를 표시할 div
        const roadview = new kakao.maps.Roadview(roadviewContainer) //로드뷰 객체
        const roadviewClient = new kakao.maps.RoadviewClient() //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
        const position = selectedMarker.getPosition()

        roadviewClient.getNearestPanoId(position, 50, function (panoId: any) {
          roadview.setPanoId(panoId, position)
        })
        toggleOverlay(true, marker)

        // 지도의 중심을 현재 로드뷰의 위치로 설정합니다
        map.setLevel(1)
        map.setCenter(position)

        // 지도 위에 로드뷰 도로 오버레이가 추가된 상태이면
        if (showRoadView) {
          // 마커의 위치를 현재 로드뷰의 위치로 설정합니다
          marker.setPosition(position)
        }
      })
    },
    [map, showRoadView, toggleOverlay]
  )

  useEffect(() => {
    for (const coord of allCoords) {
      addMarker(coord)

      // const coords = new kakao.maps.LatLng(coord.y, coord.x)
      // const markerImageUrl = "/images/blue_dot.png",
      //   markerImageSize = new kakao.maps.Size(20, 20),
      //   markerImageOptions = {
      //     offset: new kakao.maps.Point(10, 20),
      //   }

      // const markerImage = new kakao.maps.MarkerImage(
      //   markerImageUrl,
      //   markerImageSize,
      //   markerImageOptions
      // )

      // new kakao.maps.Marker({
      //   map: map,
      //   image: markerImage,
      //   position: coords,
      // })
    }
  }, [addMarker, map])

  // 마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
  // function addMarker(coord: any) {
  //   const coords = new kakao.maps.LatLng(coord.y, coord.x)

  //   let selectedMarker: any = null
  //   const markerImageUrl = "/images/blue_dot.png",
  //     markerImageSize = new kakao.maps.Size(20, 20),
  //     markerImageOptions = {
  //       offset: new kakao.maps.Point(10, 20),
  //     }

  //   const markerImage = new kakao.maps.MarkerImage(
  //     markerImageUrl,
  //     markerImageSize,
  //     markerImageOptions
  //   )

  //   const marker = new kakao.maps.Marker({
  //     map: map,
  //     image: markerImage,
  //     position: coords,
  //   })

  //   // // 마커에 mouseover 이벤트를 등록합니다
  //   // kakao.maps.event.addListener(marker, "mouseover", function () {
  //   //   // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
  //   //   // 마커의 이미지를 오버 이미지로 변경합니다
  //   //   if (!selectedMarker || selectedMarker !== marker) {
  //   //     marker.setImage(overImage)
  //   //   }
  //   // })

  //   // // 마커에 mouseout 이벤트를 등록합니다
  //   // kakao.maps.event.addListener(marker, "mouseout", function () {
  //   //   // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
  //   //   // 마커의 이미지를 기본 이미지로 변경합니다
  //   //   if (!selectedMarker || selectedMarker !== marker) {
  //   //     marker.setImage(normalImage)
  //   //   }
  //   // })

  //   kakao.maps.event.addListener(marker, "click", function () {
  //     if (!selectedMarker || selectedMarker !== marker) {
  //       !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage)

  //       // marker.setImage(clickImage)
  //     }
  //     selectedMarker = marker
  //     console.log(marker)
  //   })
  // }

  //   useEffect(() => {
  //     const apiCall = async () => {
  //       for (const addr of area) {
  //         await geocoder.addressSearch(
  //           addr["위치"],
  //           function (result: IAddrs, status: string) {
  //             if (status === kakao.maps.services.Status.OK) {
  //               hello.push({ y: result[0].y, x: result[0].x });
  //             } else {
  //               console.log("안됨!!!");
  //             }
  //           }
  //         );
  //       }
  //     };

  //     apiCall();
  //     setTimeout(() => {
  //       let jsonEncode = JSON.stringify(hello);
  //       let jsonDecode = JSON.parse(jsonEncode);
  //       console.log(jsonDecode);
  //       console.log(jsonEncode);
  //     }, 15000);
  //   }, [area, geocoder, hello]);

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {showRoadView ? (
        <div
          id="roadview"
          className="w-80 h-80 border border-black absolute z-10"
        ></div>
      ) : (
        <div id="roadview"></div>
      )}
    </div>
  )
}

import React, { useCallback, useEffect, useState } from "react";
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

import useMarker from "../hooks/useMarker";

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
import allCoords from "../assets/coordsAll.json";

const { kakao } = window;
declare global {
  interface Window {
    kakao: any;
  }
}
interface IAddr {
  address: {};
  address_name: string;
  address_type: string;
  road_address: {};
  x: string;
  y: string;
}

interface IAddrs extends Array<IAddr> {}

interface IJson {
  위치: string;
  의류수거함: string;
}

interface IJsons extends Array<IJson> {}

interface IAreaCoords {
  x: number;
  y: number;
}

interface IAreaCoordsArr extends Array<IAreaCoords> {}

export default function MapContainer({ map }: { map: any }) {
  //   const [area, setArea] = useState(jungnang2.data);
  const geocoder = new kakao.maps.services.Geocoder();
  const hello: any = [];

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
  const all = JSON.stringify(allCoords);

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
  useMarker(all, map);

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
    ></div>
  );
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition: number, message: string, map: any) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

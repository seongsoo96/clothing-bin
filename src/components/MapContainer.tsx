import React, { useEffect } from "react";
const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapContainer() {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message, map);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message, map);
    }

    // const positions = [
    //   {
    //     title: "카카오",
    //     latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    //   },
    //   {
    //     title: "생태연못",
    //     latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    //   },
    //   {
    //     title: "텃밭",
    //     latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    //   },
    //   {
    //     title: "근린공원",
    //     latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    //   },
    // ];

    // for (let i = 0; i < positions.length; i++) {
    //   // 마커를 생성합니다
    //   const marker = new kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //   });
    // }
  }, []);

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

import { useEffect } from "react";

const { kakao } = window;
declare global {
  interface Window {
    kakao: any;
  }
}

// interface IJson {
//   위치: string;
//   의류수거함: string;
// }

// interface IAreaCoords {
//   x: number;
//   y: number;
// }

export default function useMarker(jsonString: string, map: any) {
  const areaCoords = JSON.parse(jsonString);
  useEffect(() => {
    // const container = document.getElementById("map");
    // const options = {
    //   center: new kakao.maps.LatLng(37.566535, 126.97796919),
    //   level: 6,
    // };
    // const map = new kakao.maps.Map(container, options);
    for (const coord of areaCoords) {
      const coords = new kakao.maps.LatLng(coord.y, coord.x);
      var markerImageUrl = "/images/blue_dot.png",
        markerImageSize = new kakao.maps.Size(20, 20),
        markerImageOptions = {
          offset: new kakao.maps.Point(10, 20),
        };

      var markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        markerImageSize,
        markerImageOptions
      );

      new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: coords,
      });
    }
  }, [areaCoords]);

  return {};
}

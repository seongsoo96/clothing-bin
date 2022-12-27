import { useEffect } from "react"

const { kakao } = window

export default function useMarker(jsonString: string, map: any) {
  const areaCoords = JSON.parse(jsonString)
  useEffect(() => {
    for (const coord of areaCoords) {
      const coords = new kakao.maps.LatLng(coord.y, coord.x)
      var markerImageUrl = "/images/blue_dot.png",
        markerImageSize = new kakao.maps.Size(20, 20),
        markerImageOptions = {
          offset: new kakao.maps.Point(10, 20),
        }

      var markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        markerImageSize,
        markerImageOptions
      )

      new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: coords,
      })
    }
  }, [areaCoords, map])

  return {}
}

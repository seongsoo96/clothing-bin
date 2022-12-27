const { kakao } = window

export default function LocationButton({ map }: { map: any }) {
  const handleClick = () => {
    let lon = 126.570667
    let lat = 33.450701
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude // 위도
        lon = position.coords.longitude // 경도
        showMyLocation(new kakao.maps.LatLng(lat, lon))
      })
    } else {
      showMyLocation(new kakao.maps.LatLng(lat, lon))
    }
  }

  function showMyLocation(position: number) {
    map.setLevel(4)
    map.setCenter(position)
  }

  return (
    <div
      onClick={handleClick}
      className="w-100 mt-6 absolute z-20 top-4 right-2 border-2 border-black hover:bg-slate-300  p-1 bg-white text-white font-bold rounded"
    >
      <img
        src="images/myLocation.png"
        alt="findLocation"
        className="w-[20px]"
      />
    </div>
  )
}

import { useSetAtom } from "jotai"
import { centerAtom, levelAtom } from "../atoms"

export default function LocationButton() {
  const setCenter = useSetAtom(centerAtom)
  const setLevel = useSetAtom(levelAtom)
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLevel(2)
        },
        (err) => {
          setCenter({
            lat: 37.566535,
            lng: 126.97796919,
          })
        }
      )
    }
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

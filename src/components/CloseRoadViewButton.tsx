import { useSetAtom } from "jotai"
import { roadViewAtom } from "../atoms/roadViewAtom"

export default function CloseRoadViewButton() {
  const setShowRoadView = useSetAtom(roadViewAtom)

  const handleClick = () => {
    setShowRoadView(false)
  }

  return (
    <div
      onClick={handleClick}
      className="w-100 mt-16 fixed z-20 top-4 right-2 border-2 border-black hover:bg-slate-300  p-1 bg-white text-white font-bold rounded"
    >
      <img src="/images/x.png" alt="로드뷰 닫기" className="w-[20px]" />
    </div>
  )
}

import { useAtomValue } from "jotai"
import { Map } from "react-kakao-maps-sdk"
import { centerAtom, levelAtom } from "../atoms"
import Spinner from "./Spinner"

export default function SkeletonMap() {
  const center = useAtomValue(centerAtom)
  const level = useAtomValue(levelAtom)
  return (
    <Map // 지도를 표시할 Container
      center={{
        ...center,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={level}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto z-30 text-center h-[150px]">
        <br />
        <svg
          className="absolute animate-spin w-20 h-20 z-40"
          viewBox="0 0 24 24"
        ></svg>
        <Spinner />
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-20 opacity-50 bg-black" />
    </Map>
  )
}

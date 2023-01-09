import { atom } from "jotai"
import { roadViewAtom } from "./roadViewAtom"

export const roadViewStyleAtom = atom(async (get) => {
  return get(roadViewAtom)
    ? "w-full h-1/3 md:w-80 z-20 !absolute bottom-0 left-0"
    : "w-screen h-screen"
})

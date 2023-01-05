import { atom } from "jotai"
import { roadViewAtom } from "./roadViewAtom"

// interface IStyle {
//   width: string
//   height: string
//   cursur: string
//   position?: string
//   bottom?: number
//   left?: number
//   zIndex?: number
// }

export const roadViewStyleAtom = atom<Object>(async (get) => {
  return get(roadViewAtom)
    ? {
        width: "310px",
        height: "190px",
        cursur: "grab",
        position: "absolute !important",
        bottom: 0,
        left: 0,
        zIndex: 20,
      }
    : { width: "100%", height: "100%", cursur: "grab" }
})

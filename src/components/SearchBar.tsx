import React from "react"

export default function SearchBar() {
  return (
    <>
      {/* <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search Bar
      </label> */}
      <div className="w-100 mt-6 fixed z-20">
        {/* <input
          type="text"
          id="first_name"
          // className="w-80 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          className="w-80 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          placeholder="검색하기"
          required
        /> */}
        <h1 className="w-96 p-2.5 bg-gray-800 border border-gray-300 text-gray-100 text-base rounded-lg">
          초록점을 클릭하고 미리 로드뷰로 확인해보세요!
        </h1>
      </div>
    </>
  )
}

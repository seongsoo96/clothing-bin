import React from "react";
import LocationButton from "./components/LocationButton";
import MapContainer from "./components/MapContainer";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="relative flex flex-row justify-center">
      <LocationButton />
      <SearchBar />
      <MapContainer />
    </div>
  );
}

export default App;

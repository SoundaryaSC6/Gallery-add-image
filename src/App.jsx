import React from "react";
import AboutWidget from "./components/AboutWidget";
import GalleryWidget from "./components/GalleryWidget";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2" />

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <AboutWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  );
}

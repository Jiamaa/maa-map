'use client';

import Image from "next/image";
import Navbar from "../components/nabvar";
import dynamic from "next/dynamic";
// import MapWindow from "../components/mapWindow";
// import Button from "../components/button";

const MapWindow = dynamic(() => import("../components/mapWindow"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify- bg-zinc-50 font-sans dark:bg-black">
      <Navbar/>
      <div className="gap-50">
        <MapWindow/>
        {/* <Button/> */}
      </div>
    </div>
  );
}

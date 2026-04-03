'use client';

import { MapContainer} from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import GetLocation from "../app/hooks/getLocation";

export default function MapWindow(){
    return(
        <div className="flex h-full w-full justify-center items-center">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}
                style={{ top: 100, height: 500, width: 500}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GetLocation/>
            </MapContainer>
        </div>
    )
}
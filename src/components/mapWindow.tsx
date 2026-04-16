'use client';

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import GetLocation from "../app/hooks/getLocation";

export default function MapWindow(){
    return(
        <div className="relative z-0 flex w-full justify-center">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}
                style={{ height: 500, width: 500, borderRadius: 10 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GetLocation/>
            </MapContainer>
        </div>
    )
}
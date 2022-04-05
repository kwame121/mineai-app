import React, { createContext } from "react";


export interface poi 
{
    location:coordinate,
    locationName:string,
    bio:string,
}

export interface coordinate 
{
    lat:number,
    lng:number
}

export type MapContextType = 
{   
    center:coordinate,
    zoom:number,
    poi:poi[],
    geolocations:[],
    searchBoxRef:React.RefObject<HTMLInputElement>,
    mapRef: React.RefObject<HTMLDivElement>,
    changeZoom: (zoom:number) => void,
    changeCenter: (coordinate:coordinate) => void,
    changePoi:(poi:poi,action:string)=>void ,
    changeGeoLocation:(location:any) =>void,
}

export const MapContext = createContext <MapContextType | null>(null);

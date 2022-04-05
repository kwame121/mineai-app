import { createContext } from "react";
import { coordinate } from "./MapContext";
import { CapturedLocations } from "../views/MapArea";

export type SettingsContextType = {
    overlayColor:string;
    controlScheme:string;
    unit:string;
    capturedLocations:CapturedLocations[],
    changeOverlay: (colorCode:string) => void;
    changeScheme: (scheme:string) => void;
    changeUnit: (unit:string) => void;
    changeCapturedLocations:(location:CapturedLocations,zoom:number) => void;
}

export const SettingsContext = createContext <SettingsContextType| null> (null);
               
import React, { useState } from 'react'
import TaskBar from './TaskBar'
import MapArea from './MapArea'
import { SettingsContext, SettingsContextType } from '../Context/SettingsContext';
import { CapturedLocations } from './MapArea';



export const SettingsProvider: React.FC<React.ReactNode> = ({children})=> 
{
    const [overlayColor,setOverlayColor] = useState("#C21515");
    const [controlScheme,setControlScheme] = useState("box");
    const [unit,setUnit] = useState("metric");
    const [capturedLocations,setCapturedLocations] = useState<CapturedLocations[]>([]);

    const changeOverlay = (colorCode:string) => {
        setOverlayColor(colorCode);
    }

    const changeScheme = (scheme:string) => {
        setControlScheme(scheme);
    }

    const changeUnit = (unit:string) => {
        setUnit(unit);
    }

    const changeCapturedLocations = (location:CapturedLocations,zoom:number) => 
    {
        location.zoom = zoom;
        setCapturedLocations(locationArray=>[...locationArray,location]);
    }

    return (
        <SettingsContext.Provider value ={{
            overlayColor,controlScheme,unit,capturedLocations,
            changeOverlay,changeScheme,changeUnit,changeCapturedLocations
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

const MainBody = () => {
  return (
    <SettingsProvider>
            <div className="main-body flex flex-r">
                <TaskBar/>
                <MapArea/>
            </div>
    </SettingsProvider>    
  )
}

export default MainBody
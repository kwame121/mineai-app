import React,{useState,useRef} from 'react';
import MainTop from './MainTop';
import MainBody from './MainBody';
import MainFooter from '../includes/MainFooter';
import {MapContext,MapContextType,coordinate,poi} from '../Context/MapContext';
import { SettingsProvider } from './MainBody';


const MapSettingsProvider: React.FC<React.ReactNode> = ({children}) => 
{
  const [zoom,setZoom] = useState(12);
  const [center,setCenter] = useState({lat: 5.799396601612896, lng: -0.12223490000001114});
  const [poi,setPoi] = useState([]);
  const [geolocations,setGeoLocation] = useState<[]>([]); 
  let searchBoxRef = useRef<HTMLInputElement>(null);
  let mapRef = useRef<HTMLDivElement>(null);

  const changeZoom = (zoom:number) => 
  {
    if (zoom>=0)
    {
      setZoom(zoom);
    }
    else
    {
      setZoom(15);
    }
  }

  const changeCenter = (coord:coordinate) => 
  {
    setCenter(coord);
    console.log('coordinates changed');
  }

  const changePoi = (poi:poi,action:string) => 
  {
    if (action==='add')
    {
      //code for adding poi
    }
    else if (action==='delete')
    {
      //code for removing poi...
    }

  }

  const changeGeoLocation = (location:any) => 
  {
    //code for adding location...
  }

  return (
    <MapContext.Provider value={{zoom,center,poi,searchBoxRef,mapRef,geolocations,changeZoom,changeCenter,changePoi, changeGeoLocation}}>
        {children}
    </MapContext.Provider>
  )


}

const MainApp = () => {
  return (
    <div className="main-app flex flex-c h-100">
    <SettingsProvider>
      <MapSettingsProvider>
          <MainTop/>
          <MainBody/>
          <MainFooter/>
        </MapSettingsProvider>
    </SettingsProvider>
      
    </div>
  )
}

export default MainApp
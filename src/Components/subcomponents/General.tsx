import React, { useContext, useEffect } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { SettingsContext,SettingsContextType } from '../Context/SettingsContext';
import { CapturedLocations } from '../views/MapArea';


const background = '/images/sat.jpg';


const General = () => {

let {capturedLocations,changeCapturedLocations} = useContext(SettingsContext) as SettingsContextType;  
useEffect(()=>{},[]);


  return (
    <div className="general flex flex-c h-100 w-100">
        <div className="general-top flex flex-c w-100 ">
            <div className="title flex tertiary-color">
                <div>General</div>
            </div>
            <div className="general-card flex flex-c other-gray">
                <div className="location flex flex-r align-center-h">
                    <div className="left other-color">Tuscany, Italy</div>
                    <div className="right other-color"><NearMeIcon style={{fontSize:'1.5rem'}}/></div>
                </div>
                <div className="status secondary-color">
                    Non-Mining
                </div>
                <div className="general-card-details flex flex-c">
                    <div className="detail-item flex flex-r other-color-2">
                        <div className="left">Altitude</div>
                        <div className="right">~ 17,000</div>
                    </div>
                    <div className="detail-item flex flex-r other-color-2">
                        <div className="left">Latitude</div>
                        <div className="right">~ 5.799366</div>
                    </div>
                    <div className="detail-item flex flex-r other-color-2">
                        <div className="left">Longitude</div>
                        <div className="right">~ 5.799366</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="general-bottom">
            <div className="title flex other-color-2 ">
                Recent Predictions
            </div>
            <div className="recent-predictions flex flex-c w-100 align-center-h">

                {
                capturedLocations.slice(0).reverse().map((location,index)=>{
                    var imgUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" +location.coordinates.lat + "," + location.coordinates.lng + "&zoom=" + location.zoom +"&size=" + 250 + "x" + 250 + "&maptype=satellite&key="+process.env.REACT_APP_API_KEY;
                    return(<div className="prediction-card flex flex-r align-center-h other-gray-2">
                            <div className="left">
                                <div className="image-area" style={{backgroundImage:`url(${imgUrl})`}}>
        
                                </div>
                            </div>
                            <div className="right flex flex-c">
                                <div className="top other-color-2">
                                    Tuscany, Italy
                                </div>
                                <div className="bottom other-color-2">
                                    {location.predictionString==='positive'?'Mining':'Non-Mining'}
                                </div>
                            </div>
                    </div>
                    )
                })}
            </div>

        </div>
    </div>
  )
}

export default General
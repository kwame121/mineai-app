import React, { useContext, useEffect, useState } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { SettingsContext,SettingsContextType } from '../Context/SettingsContext';
import { CapturedLocations } from '../views/MapArea';
import {geolocationUrl} from '../../Constants/Constants';
import axios from 'axios';
import { coordinate } from '../Context/MapContext';


interface CapturedLocationWithGeo extends CapturedLocations 
{
    geolocation:{
        locality:string,
        country:string
    }
}


const General = () => {

let {capturedLocations,changeCapturedLocations} = useContext(SettingsContext) as SettingsContextType;  
let [capturedLocationsGeo,setCapturedLocationsGeo] = useState<CapturedLocationWithGeo[]>([]);
let [loading,setLoading] = useState<boolean>(false);
    useEffect(()=>{
        // const fetchGeolocationData  = async (location:CapturedLocations) => 
        // {
        //     setLoading(true);
        //     let request = await axios.post(geolocationUrl+`json?latlng=${location.coordinates.lat},${location.coordinates.lng}&key=${process.env.REACT_APP_API_KEY}`);
        //     let result = request.data.results[0];
        //     let addressComponents = result.address_components;
        //     let {long_name:locality} = addressComponents[1];
        //     let {short_name:country} = addressComponents[4];
        //     let coordinate:coordinate = {lat:location.coordinates.lat,lng:location.coordinates.lng};
        //     let geolocationObj = {locality:locality,country:country};
        //     let geolocation_final: CapturedLocationWithGeo = {coordinates:coordinate,geolocation:geolocationObj,prediction:location.prediction,predictionString:location.predictionString,zoom:location.zoom}; 
        //     console.log('fetched');
        //     setCapturedLocationsGeo(oldArray=>[...oldArray,geolocation_final]);

        // }
        // capturedLocations.forEach((location)=>{
        //     console.log('location');
        //    fetchGeolocationData(location);  
        // });
    },[]);




  return (
    <div className="general flex flex-c h-100 w-100">
        <div className="general-top flex flex-c w-100 ">
            <div className="title flex tertiary-color">
                <div>General</div>
            </div>
            <div className="general-card flex flex-c other-gray">
                <div className="location flex flex-r align-center-h">
                    <div className="left other-color">{capturedLocations.length>0?capturedLocations[capturedLocations.length-1].geolocation.locality:'Tuscany'} , {capturedLocations.length>0?capturedLocations[capturedLocations.length-1].geolocation.country:'Italy'}</div>
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

                {capturedLocations.length==0&&
                    <div className="flex flex-c no-predictions other-color-2 align-center-v">
                        No Predictions Yet                   
                    </div>
                }

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
                                   {location.geolocation.locality}, {location.geolocation.country}
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
import React, {useEffect,useState,useRef, useContext} from 'react';
import PoiCard from './PoiCard';
import ActionArea2 from './ActionArea2';
import ActionArea from './ActionArea';
import Overlay from './Overlay';
import { Loader } from '@googlemaps/js-api-loader';
import {coordinate, MapContext,MapContextType} from '../Context/MapContext';
import {SettingsContext,SettingsContextType} from '../Context/SettingsContext';
import axios from 'axios';
import CaptureBtn from '../subcomponents/Capturebtn';



export interface CapturedLocations 
{
  coordinates:coordinate,
  prediction:any,
  predictionString:string,
  zoom:number
}

const MapArea = () => {

  let {center,zoom,poi,mapRef,searchBoxRef,changeCenter,changeGeoLocation,changeZoom}  = useContext(MapContext) as MapContextType;
  let {overlayColor,controlScheme,capturedLocations,changeCapturedLocations} = useContext(SettingsContext) as SettingsContextType;
  // let [capturedLocations,setCapturedLocations] = useState<CapturedLocations[]>([]);
  // let [positivePredictions,setPositivePredictions] = useState<capturedLocations[]>([]);
  let [isloading,setisLoading] = useState<boolean>(false);
  let buttonRef = useRef<HTMLDivElement>();
  let zoomInRef = useRef<HTMLDivElement>();
  let zoomOutRef = useRef<HTMLDivElement>();


  const api_key: string | undefined = process.env.REACT_APP_API_KEY;
  const loader = new Loader({
    apiKey: api_key?api_key:'',
    version:'weekly',
    libraries:['places','drawing','geometry'],
    });
  let map:any = null;
  let markers:any = [];
  let captureLocation:any|undefined;

 
  useEffect (()=>{},[]);

  loader.load().then((google:any)=>{

    const _mapRef = mapRef.current as HTMLDivElement|HTMLElement;
    map = new google.maps.Map(_mapRef, {
      center: center,
      zoom: zoom,
      mapTypeId: 'satellite',
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });

    const _searchBoxRef = searchBoxRef.current as HTMLInputElement;
    const searchbox = new google.maps.places.SearchBox(_searchBoxRef);

    
  function calculateBounds (center:coordinate,side:number)
    {
      try
      {
        let north = google.maps.geometry.spherical.computeOffset(center,side/2,0).lat();
        let south = google.maps.geometry.spherical.computeOffset(center,side/2,180).lat();
        let east =  google.maps.geometry.spherical.computeOffset(center,side/2,90).lng();
        let west =  google.maps.geometry.spherical.computeOffset(center,side/2,270).lng();

        return new google.maps.LatLngBounds(new google.maps.LatLng(south,west),
        new google.maps.LatLng(north,east));

      }
      catch(e)
      {
        console.log(e);

      }
    }

    
    function zoomHandler (zoom:number,action:string)
    {
      if (action==='zoom-in')
      {
        if (zoom<21)
        {
          zoom = zoom + 1;
          let _centre = map.getCenter();
          let _lat = _centre.lat();
          let _lng= _centre.lng();

          changeCenter({lat:_lat,lng:_lng});
          changeZoom(zoom);
        }

      }
      else if (action ==='zoom-out')
      {
        if (zoom>0)
        {
          zoom = zoom - 1;
          changeZoom(zoom);
        }
      }

      return;
    }

    //load all the overlays

    captureLocation = async () => 
    {
      try
      {
        if (controlScheme=="box")
        {
          const size:number = 250;
          let _centre = map.getCenter();
          let _lat = _centre.lat();
          let _lng= _centre.lng();
          let _zoom = map.getZoom();
          var imgUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" +
          _lat + "," + _lng + "&zoom=" + _zoom +
          "&size=" + size + "x" + size + "&maptype=satellite&key="+process.env.REACT_APP_API_KEY;
          let request = await axios.post(`http://localhost:5001/predict`,{imgUrl});
          let {argMax,data} = request.data;
          let capturedCoordinates:coordinate = {lat:_lat,lng:_lng};
          let prediction = {argmax:argMax,data:data};
          let predictionString = argMax===0? 'positive':'negative';
          let _capturedLocation:CapturedLocations = {coordinates:capturedCoordinates,prediction:prediction,predictionString:predictionString,zoom:zoom};
          changeCenter(capturedCoordinates);
          changeZoom(map.getZoom());
          changeCapturedLocations(_capturedLocation,map.getZoom());
          console.log(argMax,data);
        }
        else if (controlScheme==="drawing")
        {
          //do the drawing code stuff...
        }

      }
      catch(e)
      {
        console.log(e);

      }
    }

    // end of function declarations.......

    if (capturedLocations.length>0)
    {
      capturedLocations.forEach((location:CapturedLocations,index)=> {
        if (location.predictionString=='positive')
        {
          let {coordinates} = location;
          let bounds = calculateBounds(coordinates,300);
          new google.maps.Rectangle({  strokeColor: overlayColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: overlayColor,
          fillOpacity: 0.25,
          map,
          bounds:bounds});
        }
      })
    }


    if (buttonRef.current!=undefined)
    {
      buttonRef.current.onclick = async () => 
      {
        await captureLocation();
      }
    }

    if (zoomInRef.current!=undefined&&zoomOutRef.current!=undefined)
    {
     
      zoomInRef.current.onclick = () => 
      {
        let zoom = map.getZoom();
        zoomHandler(zoom,'zoom-in');
      }

      zoomOutRef.current.onclick = () => 
      {
         let zoom = map.getZoom();
         zoomHandler(zoom,'zoom-out');
      }
    }

    _searchBoxRef.addEventListener('keydown',(e:KeyboardEvent)=>
    {
      if (e.code=='Enter')
      {
        e.stopImmediatePropagation();//to stop weird freezing issue with enter press...
      }
    });

   searchbox.addListener('places_changed', async ()=>
    {
      console.log('place changed');
        let places= searchbox.getPlaces();
        //on the places changed event, use .getPlaces() to fetch all the locations found
        console.log(places);
        if (places)
        {
          if(places.length==0)
          {
            return;
          }
          //so that typescript doesnt complain that 'places' can be undefined...
         
            markers.forEach((marker:any)=>{
              marker.setMap(null);
            });
            markers = [];

            //for every place change, initialize by removing all the markers currently on the map

            let place = places[0]; 
            places = null;
            const bounds = new google.maps.LatLngBounds();
            if (!place.geometry||!place.geometry.location)
            {
              console.log('returned no geometry');
              return;
            }

            const icon = {
              url: `${process.env.PUBLIC_URL}/images/placeholder.png`,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25),
            };

            markers.push(
              new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location,
              })
            );

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
            let centre = map.getCenter();
            let lat = centre.lat();
            let lng= centre.lng();
            let zoom = map.getZoom();

            let centerCoord:coordinate = {lat: lat, lng: lng};
            changeCenter(centerCoord);
            changeZoom(zoom);
           
        }

        return;
    });

  }).catch((e)=>{
    console.log(e);
  })


  return (
    <div className="MapArea flex   align-center-h align-center-v w-100" >
      <div className="map w-100 h-100 " ref={mapRef}>
      </div>
        <PoiCard/>
        <ActionArea zoomInRef = {zoomInRef} zoomOutRef = {zoomOutRef}/>
        <ActionArea2/>
        <Overlay/>
        <CaptureBtn buttonRef={buttonRef} captureLocation={captureLocation}/>
    </div>
  )
}

export default MapArea;
import React, { useState, useRef } from 'react';
import MainTop from './MainTop';
import MainBody from './MainBody';
import MainFooter from '../includes/MainFooter';
import {
  MapContext,
  MapContextType,
  coordinate,
  poi,
} from '../Context/MapContext';
import { SettingsProvider } from './MainBody';
import {
  IAboutPageState,
  IPointofinterest,
} from '../../Constants/globals.interfaces';
import PointOfInterestDrawer from '../subcomponents/PointOfInterestDrawer';

const MapSettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [zoom, setZoom] = useState(17);
  const [center, setCenter] = useState({
    lat: 6.260151420310712,
    lng: -2.0094492619787907,
  });
  const [poi, setPoi] = useState([]);
  const [geolocations, setGeoLocation] = useState<[]>([]);
  const [aboutPageState, setAboutPageState] = useState<IAboutPageState[]>([
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
  ]);
  const [map, setMap] = useState<google.maps.Map>();
  const [autoCompletePlaces, setAutoCompletePlaces] = React.useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [selectedPoi, setSelectedPoi] = useState<IPointofinterest>();
  const [poiDrawerOpen, setPoiDrawer] = useState(false);
  const [stepperStage, setStepperStage] = useState(0);
  let searchBoxRef = useRef<HTMLInputElement>(null);
  let mapRef = useRef<HTMLDivElement>(null);

  const changeZoom = (zoom: number) => {
    if (zoom >= 0) {
      setZoom(zoom);
    } else {
      setZoom(15);
    }
  };

  const changeCenter = (coord: coordinate) => {
    setCenter(coord);
    console.log('coordinates changed');
  };

  const changePoi = (poi: poi, action: string) => {
    if (action === 'add') {
      //code for adding poi
    } else if (action === 'delete') {
      //code for removing poi...
    }
  };

  const changeGeoLocation = (location: any) => {
    //code for adding location...
  };

  return (
    <MapContext.Provider
      value={{
        zoom,
        center,
        poi,
        searchBoxRef,
        mapRef,
        geolocations,
        map,
        autoCompletePlaces,
        selectedPoi,
        poiDrawerOpen,
        aboutPageState,
        stepperStage,
        setStepperStage,
        setAboutPageState,
        setPoiDrawer,
        setSelectedPoi,
        changeZoom,
        changeCenter,
        changePoi,
        changeGeoLocation,
        setMap,
        setAutoCompletePlaces,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const MainApp = () => {
  return (
    <div
      className="main-app flex flex-c h-100"
      style={{ position: 'relative' }}
    >
      <SettingsProvider>
        <MapSettingsProvider>
          <PointOfInterestDrawer />
          <MainTop />
          <MainBody />
          <MainFooter />
        </MapSettingsProvider>
      </SettingsProvider>
    </div>
  );
};

export default MainApp;

import React, { useState } from 'react';
import TaskBar from './TaskBar';
import MapArea from './MapArea';
import {
  SettingsContext,
  SettingsContextType,
} from '../Context/SettingsContext';
import { CapturedLocations } from './MapArea';

export const SettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const defaultLocation: CapturedLocations = {
    coordinates: { lat: 5.799396601612896, lng: -0.12223490000001114 },
    geolocation: { country: '', locality: '' },
    prediction: {},
    predictionString: '',
    zoom: 17,
  };
  const [overlayColor, setOverlayColor] = useState('#EB7601');
  const [controlScheme, setControlScheme] = useState('box');
  const [unit, setUnit] = useState('metric');
  const [capturedLocations, setCapturedLocations] = useState<
    CapturedLocations[]
  >([]);
  const [showingDetailsModal, setDetailsModal] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] =
    useState<CapturedLocations>(defaultLocation);
  const [filterLowCertaintyPredictions, setfilterLowCertaintyPredictions] =
    React.useState(false);
  const [filterHighCertaintyPredictions, setfilterHighCertaintyPredictions] =
    React.useState(false);
  const [overlaysVisible, setoverlaysVisible] = React.useState(true);

  const changeOverlay = (colorCode: string) => {
    setOverlayColor(colorCode);
  };

  const changeScheme = (scheme: string) => {
    setControlScheme(scheme);
  };

  const changeUnit = (unit: string) => {
    setUnit(unit);
  };

  const changeCapturedLocations = (
    location: CapturedLocations,
    zoom: number
  ) => {
    // location.zoom = zoom;
    // if (capturedLocations.length == 10) {
    //   let newArray = capturedLocations.splice(1, 9);
    //   newArray.push(location);
    //   setCapturedLocations(newArray);
    //   return;
    // }
    setCapturedLocations((locationArray) => [...locationArray, location]);
  };

  const changeDetailsModal = (status: boolean) => {
    setDetailsModal(status);
  };

  const changeSelectedLocation = (
    location: CapturedLocations,
    zoom: number
  ) => {
    location.zoom = zoom;
    setSelectedLocation(location);
  };

  return (
    <SettingsContext.Provider
      value={{
        overlayColor,
        controlScheme,
        unit,
        capturedLocations,
        showingDetailsModal,
        selectedLocation,
        filterLowCertaintyPredictions,
        filterHighCertaintyPredictions,
        overlaysVisible,
        setoverlaysVisible,
        setfilterHighCertaintyPredictions,
        setfilterLowCertaintyPredictions,
        changeSelectedLocation,
        changeDetailsModal,
        changeOverlay,
        changeScheme,
        changeUnit,
        changeCapturedLocations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const MainBody = () => {
  return (
    <div className="main-body flex flex-r" style={{ height: '100vh' }}>
      <TaskBar />
      <MapArea />
    </div>
  );
};

export default MainBody;

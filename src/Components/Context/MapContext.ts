import React, { createContext } from 'react';
import {
  IAboutPageState,
  IPointofinterest,
} from '../../Constants/globals.interfaces';

export interface poi {
  location: coordinate;
  locationName: string;
  bio: string;
}

export interface coordinate {
  lat: number;
  lng: number;
}

export type MapContextType = {
  center: coordinate;
  zoom: number;
  poi: poi[];
  geolocations: [];
  searchBoxRef: React.RefObject<HTMLInputElement>;
  mapRef: React.RefObject<any>;
  map: google.maps.Map;
  autoCompletePlaces: google.maps.places.AutocompletePrediction[];
  poiDrawerOpen: boolean;
  selectedPoi: IPointofinterest;
  aboutPageState: IAboutPageState[];
  stepperStage: number;
  setStepperStage: React.Dispatch<React.SetStateAction<number>>;
  setAboutPageState: React.Dispatch<React.SetStateAction<IAboutPageState[]>>;
  setSelectedPoi: React.Dispatch<React.SetStateAction<IPointofinterest>>;
  setPoiDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoCompletePlaces: React.Dispatch<
    React.SetStateAction<google.maps.places.AutocompletePrediction[]>
  >;
  changeZoom: (zoom: number) => void;
  changeCenter: (coordinate: coordinate) => void;
  changePoi: (poi: poi, action: string) => void;
  changeGeoLocation: (location: any) => void;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map>>;
};

export const MapContext = createContext<MapContextType | null>(null);

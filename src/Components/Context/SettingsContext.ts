import { createContext } from 'react';
import { coordinate } from './MapContext';
import { CapturedLocations } from '../views/MapArea';

export type SettingsContextType = {
  overlayColor: string;
  controlScheme: string;
  unit: string;
  capturedLocations: CapturedLocations[];
  showingDetailsModal: boolean;
  selectedLocation: CapturedLocations;
  filterLowCertaintyPredictions: boolean;
  filterHighCertaintyPredictions: boolean;
  overlaysVisible: boolean;
  setfilterLowCertaintyPredictions: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setfilterHighCertaintyPredictions: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setoverlaysVisible: React.Dispatch<React.SetStateAction<boolean>>;
  changeOverlay: (colorCode: string) => void;
  changeScheme: (scheme: string) => void;
  changeUnit: (unit: string) => void;
  changeCapturedLocations: (location: CapturedLocations, zoom: number) => void;
  changeDetailsModal: (status: boolean) => void;
  changeSelectedLocation: (location: CapturedLocations, zoom: number) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

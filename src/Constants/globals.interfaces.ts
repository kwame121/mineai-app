import { coordinate } from '../Components/Context/MapContext';
import { CapturedLocations } from '../Components/views/MapArea';

export interface ILocationCard {
  location?: CapturedLocations;
  onClick: (location?: CapturedLocations) => void;
}

export interface IPredictionCard {
  location?: CapturedLocations;
}

export interface IPointofinterest {
  location: coordinate;
  name: string;
  description: string;
  thumbnail: string;
  banner: string;
  countryCode: string;
}

export interface ISearchComponent {
  searchRef: any;
}

export interface IInfoAccordion {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  description?: string;
  expandable: boolean;
  defaultOpen?: boolean;
  thumbnail?: string;
  descriptionImage?: string;
  index?: number;
  // onDelete?: () => void;
  // onEdit?: () => void;
}

export interface INote {
  description?: string;
}

export interface IFAQComponent {
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  descriptionImage?: string;
}

export interface IHowToSteps {
  label?: string;
  description?: string;
  img?: string;
  notes?: INote[];
}

export interface IPlacesCard
  extends Partial<google.maps.places.AutocompletePrediction> {
  onClick: () => void;
}

export interface IReportParams extends CapturedLocations {
  type?: 'false_positive' | 'false_negative';
}

export interface ToastUiProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  placement?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right' | 'center';
  };
}

export interface IAboutPageState {
  open: boolean;
}

export interface IInfoCardData {
  title?: string;
  description?: string;
  img?: string;
}

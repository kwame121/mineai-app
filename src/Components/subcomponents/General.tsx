import React, { useContext, useEffect, useState } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import {
  SettingsContext,
  SettingsContextType,
} from '../Context/SettingsContext';
import { CapturedLocations } from '../views/MapArea';
import { geolocationUrl } from '../../Constants/Constants';
import axios from 'axios';
import { coordinate } from '../Context/MapContext';
import classnames from 'classnames';
import Pagination from '@mui/material/Pagination';
import { MapContext } from '../Context/MapContext';
import LocationCard from './LocationCard';
import PredictionCard from './PredictionCard';
import { AppContext, AppContextType } from '../Context/Context';

interface CapturedLocationWithGeo extends CapturedLocations {
  geolocation: {
    locality: string;
    country: string;
  };
}

const style = (hover: boolean) => {
  const style = {
    color: hover ? `white` : `#c4c4c4`,
    marginBottom: hover ? `1rem` : `0.5rem`,
    transition: `margin .2s ease-in-out`,
  };
  return style;
};

const General = () => {
  let { capturedLocations, changeSelectedLocation, changeDetailsModal } =
    useContext(SettingsContext) as SettingsContextType;

  const [step, setStep] = useState<number>(1);
  const showDetails = (location?: CapturedLocations) => {
    if (location) {
      changeSelectedLocation(location, location.zoom);
      changeDetailsModal(true);
    }
  };

  const getPageCount = (): number => {
    let pageCount: number = 0;
    pageCount = Math.ceil(capturedLocations.length / 5);
    return pageCount;
  };

  const changeStep = (step: number): void => {
    setStep(step);
  };

  useEffect(() => {}, []);

  return (
    <div className="general flex flex-c h-100 w-100" style={{}}>
      <PredictionCard
        location={capturedLocations?.[capturedLocations?.length - 1]}
      />
      <div className="general-bottom">
        <div
          className="title flex other-color-2 "
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          Recent Predictions
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={getPageCount()}
            page={step}
            onChange={(e, value) => {
              changeStep(value);
            }}
            className="custom-pagination"
          />
        </div>
        <div
          className="recent-predictions flex flex-c align-center-h"
          style={{ paddingLeft: '15px', paddingRight: '15px' }}
        >
          {capturedLocations.length == 0 && (
            <div
              className="flex flex-c no-predictions other-color-2 align-center-v"
              style={{ fontWeight: '500' }}
            >
              No Predictions Yet
            </div>
          )}
          {capturedLocations
            .slice()
            .reverse()
            .slice((step - 1) * 5, step * 5)
            .map((location: CapturedLocations, index) => {
              return (
                <LocationCard
                  location={location}
                  onClick={showDetails}
                  key={`${location.coordinates}`}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default General;

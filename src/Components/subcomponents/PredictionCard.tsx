import React, { useContext } from 'react';
import { IPredictionCard } from '../../Constants/globals.interfaces';
import {
  SettingsContextType,
  SettingsContext,
} from '../Context/SettingsContext';
import NearMeIcon from '@mui/icons-material/NearMe';
import { returnPredictionString } from './subcomponents.service';
import classnames from 'classnames';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { AppContext, AppContextType } from '../Context/Context';

const PredictionTitle = styled(Box)({
  //   justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1.5rem!important',
});

const PredictionCard = ({ location }: IPredictionCard) => {
  let { capturedLocations, overlayColor } = React.useContext(
    SettingsContext
  ) as SettingsContextType;
  let { currentViewState, setCurrentViewState } = useContext(
    AppContext
  ) as AppContextType;
  return (
    <div
      className="general-top flex flex-c "
      style={{ paddingLeft: '15px', paddingRight: '15px' }}
    >
      <PredictionTitle className="title flex other-color-2">
        <div>Predictions</div>
      </PredictionTitle>
      <div className="general-card flex flex-c other-gray-2">
        <div className="location flex flex-r align-center-h secondary-color">
          <div className="left ">
            {capturedLocations.length > 0
              ? location?.geolocation.locality + ', '
              : 'No Location'}{' '}
            {capturedLocations.length > 0 ? location?.geolocation.country : ''}
          </div>
          <div className="right ">
            <NearMeIcon
              className="secondary-color"
              style={{ fontSize: '1.5rem' }}
            />
          </div>
        </div>
        <div
          className={classnames({
            'status secondary-color': true,
            'positive-status': location?.predictionString === 'positive',
          })}
          style={{
            borderLeftColor: `${
              location?.predictionString === 'positive'
                ? overlayColor
                : 'initial'
            }`,
          }}
        >
          {capturedLocations.length > 0
            ? returnPredictionString(location?.predictionString || '')
            : 'No Prediction'}
        </div>
        <div className="general-card-details flex flex-c">
          <div className="detail-item flex flex-r other-color-2">
            <div className="left" style={{ fontWeight: '500' }}>
              Zoom Level
            </div>
            <div className="right" style={{ fontWeight: '500' }}>
              {/* var googleearthaltitude = Math.pow(2.0,25.0-mapzoom)-Math.pow(2.0,21.4 - mapzoom); on zoom range 12->20 */}
              {capturedLocations.length > 0 ? location?.zoom : 0}
            </div>
          </div>
          <div className="detail-item flex flex-r other-color-2">
            <div className="left" style={{ fontWeight: '500' }}>
              Latitude
            </div>
            <div className="right" style={{ fontWeight: '500' }}>
              ≈{' '}
              {capturedLocations.length > 0
                ? location?.coordinates.lat.toFixed(5)
                : 0}
            </div>
          </div>
          <div className="detail-item flex flex-r other-color-2">
            <div className="left" style={{ fontWeight: '500' }}>
              Longitude
            </div>
            <div className="right" style={{ fontWeight: '500' }}>
              ≈{' '}
              {capturedLocations.length > 0
                ? location?.coordinates.lng.toFixed(5)
                : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;

import React from 'react';
import { ILocationCard } from '../../Constants/globals.interfaces';
import {
  SettingsContext,
  SettingsContextType,
} from '../Context/SettingsContext';

const LocationCard = ({ location, onClick }: ILocationCard) => {
  const { overlayColor } = React.useContext(
    SettingsContext
  ) as SettingsContextType;
  const imgUrl =
    'https://maps.googleapis.com/maps/api/staticmap?center=' +
    location?.coordinates.lat +
    ',' +
    location?.coordinates.lng +
    '&zoom=' +
    location?.zoom +
    '&size=' +
    250 +
    'x' +
    250 +
    '&maptype=satellite&key=' +
    process.env.REACT_APP_API_KEY;
  return (
    <div
      className="prediction-card flex flex-r align-center-h "
      onClick={() => {
        onClick(location);
      }}
    >
      <div
        className="left"
        style={{
          borderColor: `${
            location?.prediction == 'positive' ? overlayColor : 'inherit'
          }`,
          paddingLeft: '15px',
        }}
      >
        <div
          className="image-area"
          style={{
            backgroundImage: `url(${imgUrl})`,
            borderRadius: '0.4rem',
            borderWidth:
              location.predictionString == 'positive' ? '0px' : '0px',

            borderColor:
              location.predictionString == 'positive'
                ? `${overlayColor}`
                : 'unset',
          }}
        ></div>
      </div>
      <div className="right flex flex-c" style={{ paddingRight: '15px' }}>
        <div className="top other-color-2" style={{ fontSize: '17px' }}>
          {location?.geolocation.locality}, {location?.geolocation.country}
        </div>
        <div
          className="bottom other-color-2"
          style={{
            fontWeight: '600',
            color:
              location?.predictionString == 'positive'
                ? overlayColor
                : '#c4c4c4',
          }}
        >
          {location?.predictionString === 'positive' ? 'Mining' : 'Non-Mining'}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

import React from 'react';
import { IPointofinterest } from '../../Constants/globals.interfaces';
import { styled, Button } from '@mui/material';
import { MapContext, MapContextType } from '../Context/MapContext';
import { SettingsContext } from '../Context/SettingsContext';
import { AppContext } from '../Context/Context';

const PoiWrapper = styled(Button)({
  display: 'flex',
  padding: '10px',
  textAlign: 'left',
  marginTop: '10px',
  textTransform: 'initial',
  fontFamily: 'inherit',
  width: '100%',
  justifyContent: 'flex-start',
  marginBottom: '10px',
  '&:hover': {
    backgroundColor: '#232323',
    borderRadius: '10px',
  },
});

const ImageWrapper = styled('div')({
  borderRadius: '10px',
  width: '50px',
  height: '50px',
  backgroundSize: 'cover',
});

const ImageRight = styled('div')({
  marginLeft: '13px',
  flexDirection: 'column',
});

const PoiTitle = styled('div')({
  fontSize: '16px',
  color: 'white',
});

const PoiSubText = styled('div')({
  fontSize: '14px',
  color: 'white',
});

const PointOfInterestComponent = (props: IPointofinterest) => {
  const { setPoiDrawer, setSelectedPoi } = React.useContext(
    MapContext
  ) as MapContextType;
  const { setCurrentViewState, changeView } = React.useContext(AppContext);
  return (
    <PoiWrapper
      onClick={() => {
        setSelectedPoi(props);
        setCurrentViewState('expanded');
        changeView(9);
        setPoiDrawer(true);
      }}
    >
      <ImageWrapper
        style={{ backgroundImage: `url(images/${props.thumbnail})` }}
      />
      <ImageRight>
        <PoiTitle>{props.name}</PoiTitle>
        <PoiSubText>{props.countryCode}</PoiSubText>
      </ImageRight>
    </PoiWrapper>
  );
};

export default PointOfInterestComponent;

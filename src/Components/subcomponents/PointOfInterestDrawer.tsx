import React from 'react';
import { Drawer, Button, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { styled } from '@mui/material';
import { MapContext, MapContextType } from '../Context/MapContext';
import { greenColor } from '../../Constants/Constants';
import CloseIcon from '@mui/icons-material/Close';

const ImageBackground = styled('div')({
  height: '40%',
  backgroundSize: 'cover',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
});

const TitleWrapper = styled(Typography)({
  fontSize: '20px',
  fontFamily: 'inherit',
  color: 'white',
  padding: '15px',
});

const SubtitleWrapper = styled(Typography)({
  fontSize: '16px',
  color: 'white',
  padding: '15px',
  paddingTop: 'unset',
  paddingBottom: 'unset',
});

const DescriptionWrapper = styled(Typography)({
  fontSize: '15px',
  color: 'white',
  padding: '15px',
});

const ActionAreaWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
});

const JumptoButton = styled(Button)({
  textTransform: 'initial',
  backgroundColor: greenColor,
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '12px',
});

const CloseButtonWrapper = styled('div')({
  padding: '15px',
});

const CloseButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  minWidth: 'unset',
  padding: '25px',
});

const PointOfInterestDrawer = () => {
  const { selectedPoi, map, setPoiDrawer, poiDrawerOpen } = React.useContext(
    MapContext
  ) as MapContextType;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTinyScreen = useMediaQuery({ query: '(max-width: 400px)' });
  return (
    <Drawer
      anchor={'right'}
      open={poiDrawerOpen}
      BackdropProps={{ style: { opacity: '50%' } }}
      PaperProps={{
        style: {
          width: isTabletOrMobile ? (isTinyScreen ? '80%' : '60%') : '35%',
        },
      }}
      style={{ zIndex: '2000' }}
      onClose={() => {
        setPoiDrawer(false);
      }}
    >
      <div
        className="taskbar flex flex-c  w-100 primary-bg"
        style={{
          width: '100%',
          height: '100%',
          padding: 'unset',
          overflowY: 'scroll',
        }}
      >
        <ImageBackground
          style={{ backgroundImage: `url(images/${selectedPoi?.thumbnail})` }}
        >
          <CloseButtonWrapper>
            <CloseButton
              onClick={() => {
                setPoiDrawer(false);
              }}
            >
              <CloseIcon />
            </CloseButton>
          </CloseButtonWrapper>
        </ImageBackground>
        <TitleWrapper>{selectedPoi?.name}</TitleWrapper>
        <SubtitleWrapper>{selectedPoi?.countryCode}</SubtitleWrapper>
        <DescriptionWrapper>{selectedPoi?.description}</DescriptionWrapper>
        <ActionAreaWrapper>
          <JumptoButton
            onClick={() => {
              if (map) {
                map.setCenter(selectedPoi.location);
                map.setZoom(15);
              }
            }}
          >
            Jump to Location
          </JumptoButton>
        </ActionAreaWrapper>
      </div>
    </Drawer>
  );
};

export default PointOfInterestDrawer;

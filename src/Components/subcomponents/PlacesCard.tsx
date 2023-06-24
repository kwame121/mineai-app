import React from 'react';
import { styled } from '@mui/material';
import { Place } from '@mui/icons-material';
import { IPlacesCard } from '../../Constants/globals.interfaces';

const PlaceCardWrapper = styled('div')({
  display: 'flex',
  marginTop: '10px',
  marginBottom: '10px',
  padding: '10px',
  alignItems: 'center',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#232323',
    cursor: 'pointer',
  },
});

const IconWrapper = styled('div')({
  background: 'gray',
  padding: '12px',
  borderRadius: '50%',
  marginRight: '10px',
});

const PlaceContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const PlaceText = styled('span')({
  fontSize: '15px',
  color: 'white',
});

const PlacesCard = (props: IPlacesCard) => {
  return (
    <PlaceCardWrapper onClick={props.onClick}>
      <IconWrapper style={{ backgroundColor: '#0E0E0E' }}>
        <Place className="other-color" />
      </IconWrapper>
      <PlaceContent>
        <PlaceText>{props?.structured_formatting?.main_text}</PlaceText>
        <PlaceText>{props?.description}</PlaceText>
      </PlaceContent>
    </PlaceCardWrapper>
  );
};

export default PlacesCard;

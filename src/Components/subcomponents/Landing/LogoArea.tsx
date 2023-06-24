import React from 'react';
import { AboutHeader } from '../About';
import SpaIcon from '@mui/icons-material/Spa';

interface ILogoArea {
  theme?: 'light' | 'dark';
}

const LogoArea = (props: ILogoArea) => {
  return (
    <AboutHeader>
      <SpaIcon
        style={{
          fontSize: '25px',
          color: '#478966 ',
        }}
      />
      <div
        style={{
          fontFamily: "'moon'",
          marginLeft: '10px',
          fontSize: '24px',
          fontWeight: '800',
          color: props?.theme == 'light' ? 'black' : 'white',
        }}
      >
        ARGUS
      </div>
    </AboutHeader>
  );
};

export default LogoArea;

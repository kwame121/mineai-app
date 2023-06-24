import React from 'react';
import { greenColor } from '../../../Constants/Constants';
import { Grid, styled } from '@mui/material';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import LogoArea from './LogoArea';

const FooterWrapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  paddingTop: '50px',
  paddingBottom: '50px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#0E0E0E',
  [theme.breakpoints.up('sm')]: {
    minHeight: '200px',
  },
}));

const ContactDescription = styled(Grid)(({ theme }) => ({
  //   fontSize: '0.7rem',
  color: 'white',
  marginLeft: '10px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1rem',
  },
}));

const Footer = () => {
  return (
    <FooterWrapper container>
      <Grid item xs={12} md={12}>
        <LogoArea theme={'dark'} />
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: '15px',
          alignItems: 'center',
        }}
      >
        <a href="https://www.linkedin.com/in/kwame-adaboh-9a3b2b18a" style={{}}>
          <LinkedIn
            style={{ fontSize: '35px', color: 'white', marginRight: '10px' }}
          />
        </a>
        <a href="mailto:kwameadaboh@gmail.com">
          <Email style={{ fontSize: '35px', color: 'white' }} />
        </a>
      </Grid>
    </FooterWrapper>
  );
};

export default Footer;

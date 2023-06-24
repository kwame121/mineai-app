import React from 'react';
import { styled } from '@mui/material';
import LogoArea from './LogoArea';
import { StartButton } from '../../Landing';
import { useNavigate } from 'react-router';

const NavbarContainer = styled('div')(({ theme }) => ({
  height: '4rem',
  zIndex: '10000',
  width: '100%',
  backgroundColor: 'white',
  [theme.breakpoints.up('sm')]: {
    height: '5rem',
  },
}));

const HeaderContainer = styled('header')(({ theme }) => ({
  height: '4rem',
  position: 'fixed',
  background: 'white',
  width: '100%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add bottom box shadow
  [theme.breakpoints.up('sm')]: {
    height: '5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
}));

const Container = styled('div')(({ theme }) => ({
  paddingLeft: '15px',
  paddingRight: '15px',
  display: 'flex',
  alignItems: 'center',
}));

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <HeaderContainer>
        <Container>
          <LogoArea theme={'light'} />
          <StartButton
            onClick={() => {
              navigate('/app');
            }}
            style={{ marginLeft: 'auto' }}
          >
            Get Started
          </StartButton>
        </Container>
      </HeaderContainer>
    </NavbarContainer>
  );
};

export default Navbar;

import React, { FC, useContext, useState } from 'react';
import General from '../subcomponents/General';
import Settings from '../subcomponents/Settings';
import { AppContext, AppContextType } from '../Context/Context';
import SearchComponent from '../subcomponents/SearchComponent';
import { Drawer } from '@mui/material';
import { MapContext, MapContextType } from '../Context/MapContext';
import { useMediaQuery } from 'react-responsive';
import About from '../subcomponents/About';

const TaskBar = () => {
  const { selectedView, currentViewState, setCurrentViewState, changeView } =
    useContext(AppContext) as AppContextType;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTinyScreen = useMediaQuery({ query: '(max-width: 400px)' });

  return (
    <Drawer
      anchor={'left'}
      open={currentViewState == 'split'}
      BackdropProps={{ style: { opacity: '50%' } }}
      PaperProps={{
        style: {
          width: isTabletOrMobile ? (isTinyScreen ? '80%' : '60%') : '35%',
          left: '56px',
        },
      }}
      onClose={() => {
        console.log('stuff');
        setCurrentViewState('expanded');
        changeView(9);
      }}
      keepMounted
    >
      <div
        className="taskbar flex flex-c secondary-bg w-100"
        style={{
          width: '100%',
          height: '100%',
          padding: 'unset',
        }}
      >
        {selectedView == 0 && <SearchComponent />}
        {selectedView == 1 && <General />}
        {selectedView == 2 && <Settings />}
        {selectedView == 4 && <About />}
      </div>
    </Drawer>
  );
};

export default TaskBar;

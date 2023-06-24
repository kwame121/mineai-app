import React, { useState } from 'react';
import Sidebar from './includes/Sidebar';
import MainApp from './views/MainApp';
import { AppContext } from './Context/Context';
import { ToastUiProps } from '../Constants/globals.interfaces';
import { Snackbar, Box } from '@mui/material';
import CustomAlert from './Alert/CustomAlert';

const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [selectedView, setSelectedView] = useState(4);
  const [toastShowing, setToastShowing] = React.useState(false);
  const [toastProps, setToastProps] = React.useState<ToastUiProps>({});
  const showToast = (props: ToastUiProps) => {
    setToastProps(props);
    setToastShowing(true);
  };
  const [currentViewState, setCurrentViewState] = useState<
    'split' | 'expanded'
  >('split');

  const changeView = (view: number) => {
    setSelectedView(view);
  };

  return (
    <AppContext.Provider
      value={{
        selectedView,
        changeView,
        currentViewState: currentViewState,
        setCurrentViewState: setCurrentViewState,
        showToast: showToast,
      }}
    >
      <Snackbar
        open={toastShowing}
        autoHideDuration={3000}
        onClose={() => {
          setToastShowing(false);
        }}
        anchorOrigin={{
          horizontal: toastProps.placement?.horizontal || 'left',
          vertical: toastProps.placement?.vertical || 'top',
        }}
      >
        <Box>
          <CustomAlert {...toastProps} />
        </Box>
      </Snackbar>
      {children}
    </AppContext.Provider>
  );
};

const Main = () => {
  return (
    <div className="app-main h-100 w-100 flex flex-r">
      <AppProvider>
        <Sidebar />
        <MainApp />
      </AppProvider>
    </div>
  );
};

export default Main;

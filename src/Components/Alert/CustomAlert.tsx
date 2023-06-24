import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { ToastUiProps } from '../../Constants/globals.interfaces';

type AlertProps = Partial<ToastUiProps>;

const CustomAlert = (props: AlertProps) => {
  return <MuiAlert severity={props.type}>{props.message}</MuiAlert>;
};

export default CustomAlert;

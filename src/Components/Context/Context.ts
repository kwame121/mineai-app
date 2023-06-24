import { createContext, useState } from 'react';
import { ToastUiProps } from '../../Constants/globals.interfaces';

export type AppContextType = {
  selectedView: number;
  changeView: (view: number) => void;
  currentViewState: 'expanded' | 'split';
  setCurrentViewState: React.Dispatch<
    React.SetStateAction<'expanded' | 'split'>
  >;
  showToast: (props: ToastUiProps) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

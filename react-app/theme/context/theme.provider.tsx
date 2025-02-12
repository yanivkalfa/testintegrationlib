import React, {useState, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootState, selectAppConfigsValue} from '../../store/store';

import {updateConfig} from '../../store/configsSlice';
import {ThemeContext} from './theme.context';
import {Props} from './theme.types';

export const ThemeProvider: React.FC<Props> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(
    (state: RootState) => selectAppConfigsValue(state, 'theme') as string,
  );

  const setTheme = (value: string) => {
    dispatch(updateConfig({name: 'theme', value}));
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

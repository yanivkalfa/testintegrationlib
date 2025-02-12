import {createContext} from 'react';
import {ThemeContextProps} from './theme.types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

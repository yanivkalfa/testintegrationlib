import {useContext, useMemo} from 'react';
import {ThemeContext} from '../context/theme.context';
import {ThemeContextProps} from '../context/theme.types';
import {DEFAULT} from '../../config/consts';
import getGlobalStyles from '../global.styles';
import {colorScheme} from '../global.colors';

export const useTheme = () => {
  const context = useContext<ThemeContextProps | undefined>(ThemeContext);
  const theme = context?.theme || DEFAULT;
  return useMemo(() => {
    return getGlobalStyles(colorScheme[theme] ?? colorScheme.default);
  }, [theme]);
};

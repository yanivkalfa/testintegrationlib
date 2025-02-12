import {ReactNode} from 'react';

export type ThemeContextProps = {
  theme: string;
  setTheme: (value: string) => void;
};

export type Props = {
  children: ReactNode;
};

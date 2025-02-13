import {ColorScheme} from './global.types';

export const palette = {
  primary: {
    main: 'rgba(21, 101, 255, 1)',
  },
  success: {
    main: 'rgba(54, 184, 67, 1)',
  },
  error: {
    main: 'rgba(255, 84, 84, 1)',
  },
  warning: {
    main: 'rgba(253, 205, 35, 1)',
  },
  textBlack: {
    main: 'rgb(15, 15, 15)',
  },
  text: {
    primary: 'rgba(21, 101, 255, 1)',
    secondary: 'rgba(77, 79, 140, 1)',
    disabled: 'rgba(137, 137, 148, 1)',
  },
  background: {
    default: 'rgba(235, 238, 244, 1)',
    paper: 'rgba(255, 255, 255, 1)',
  },
  grey: {
    '100': 'rgba(249, 250, 252, 1)',
    '150': 'rgb(245, 245, 245)',
    '200': 'rgb(237, 237, 237)',
    '300': 'rgba(235, 238, 244, 1)',
    '400': 'rgba(194, 204, 223, 1)',
    '500': 'rgba(137, 137, 148, 1)',
    '600': 'rgba(108, 108, 122, 1)',
    '700': 'rgba(108, 108, 122, 1)',
  },
  prodBackground: {default: 'rgba(92, 235, 172, 1)'},
  preprodBackground: {default: 'rgba(145, 226, 255, 1)'},
  devBackground: {default: 'rgba(255, 255, 128, 1)'},
};

const defaultColorScheme: ColorScheme = {
  navBar: {
    backgroundColor: palette.grey[300],
    color: palette.textBlack.main,
  },
  container: {
    backgroundColor: '#eef0fc',
    color: palette.textBlack.main,
  },
  containerTitle: {},
  containerTitleText: {
    color: palette.textBlack.main,
  },
  section: {
    backgroundColor: palette.background.paper,
  },
  sectionHeader: {
    backgroundColor: palette.grey[400],
  },
  sectionHeaderText: {
    color: palette.text.primary,
  },
  sectionBody: {},
  sectionBodyText: {
    color: palette.textBlack.main,
  },
  sectionBodyTitle: {
    color: palette.text.primary,
  },
  sectionBodyTitleText: {
    color: palette.text.primary,
  },
  sectionHeaderMachal: {
    backgroundColor: palette.grey[200],
  },
  sectionHeaderMachalText: {
    color: palette.text.primary,
  },
  sectionHeaderWounded: {
    backgroundColor: palette.preprodBackground.default,
  },
  sectionHeaderWoundedText: {
    color: palette.textBlack.main,
  },
  primaryButton: {
    backgroundColor: palette.primary.main,
    borderColor: palette.primary.main,
  },
  primaryButtonText: {
    color: palette.background.paper,
  },
  secondaryButton: {
    backgroundColor: '#eef0fc',
    borderColor: palette.grey[300],
  },
  secondaryButtonText: {
    color: palette.grey[300],
  },
  buttonDisabled: {
    backgroundColor: palette.grey[500],
    borderColor: palette.grey[500],
  },
  buttonDisabledText: {
    color: palette.background.paper,
  },
  horizontalDivider: {
    borderBottomColor: palette.grey[400],
  },
  verticalDividier: {
    borderLeftColor: palette.grey[400],
  },
  inputGray: {
    backgroundColor: palette.grey[150],
    borderColor: palette.grey[400],
  },
  inputWhite: {
    backgroundColor: palette.background.paper,
    borderColor: palette.grey[700],
  },
};

export const colorScheme: {[key: string]: ColorScheme} = {
  default: defaultColorScheme,
};

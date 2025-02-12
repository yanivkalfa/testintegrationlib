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
  text: {
    primary: 'rgba(59, 59, 77, 1)',
    secondary: 'rgba(77, 79, 140, 1)',
    disabled: 'rgba(137, 137, 148, 1)',
  },
  background: {
    default: 'rgba(235, 238, 244, 1)',
    paper: 'rgba(255, 255, 255, 1)',
  },
  grey: {
    '100': 'rgba(249, 250, 252, 1)',
    '200': 'rgba(245, 247, 253, 1)',
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
    backgroundColor: '#',
    color: '#',
  },
  body: {
    backgroundColor: '#f5f5fa',
    color: '#',
  },
  bodyTitle: {
    color: '#',
  },
  section: {
    backgroundColor: '#',
    color: '#',
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    color: '#',
  },
  sectionBody: {
    backgroundColor: '#',
    color: '#',
  },
  sectionBodyTitle: {
    color: '#',
  },
  sectionHeader: {
    backgroundColor: '#',
    color: '',
  },
  sectionHeaderMachal: {
    backgroundColor: '#',
    color: '#',
  },
  sectionHeaderWounded: {
    backgroundColor: '#',
    color: '#',
  },
  buttonApprove: {
    backgroundColor: '#',
    borderColor: '#',
  },
  buttonApproveText: {
    color: '#',
  },
  buttonCancel: {
    backgroundColor: '#',
    borderColor: '#',
  },
  buttonCancelText: {
    color: '#',
  },
};

export const colorScheme: {[key: string]: ColorScheme} = {
  default: defaultColorScheme,
};

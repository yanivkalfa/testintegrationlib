import {iconMap} from './Icons';

export type SvgIconProps = {
  name: keyof typeof iconMap;
  width?: number;
  height?: number;
};

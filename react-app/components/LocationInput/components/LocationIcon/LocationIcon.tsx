import React from 'react';
import Svg, {Path} from 'react-native-svg';

type LocationIconProps = {
  color?: string;
};

const LocationIcon: React.FC<LocationIconProps> = ({color = '#1565FF'}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4.33301 12C4.33301 14.0334 5.14074 15.9834 6.57852 17.4212C8.0163 18.859 9.96635 19.6667 11.9997 19.6667C14.033 19.6667 15.983 18.859 17.4208 17.4212C18.8586 15.9834 19.6663 14.0334 19.6663 12C19.6663 9.96671 18.8586 8.01667 17.4208 6.57889C15.983 5.14111 14.033 4.33337 11.9997 4.33337C9.96635 4.33337 8.0163 5.14111 6.57852 6.57889C5.14074 8.01667 4.33301 9.96671 4.33301 12Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 1.45837V4.33337"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 19.6667V22.5417"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.542 12H19.667"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.33301 12H1.45801"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LocationIcon;

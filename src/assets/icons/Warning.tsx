import * as React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface WarningProps extends SvgProps {
  style?: ViewStyle;
}

function Warning(props: WarningProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
      <Path
        d="M33.14 75.676L12.55 63.771A13.66 13.66 0 015.7 51.904V28.096a13.664 13.664 0 016.85-11.867L33.14 4.324a13.776 13.776 0 0113.701 0l20.59 11.905a13.662 13.662 0 016.85 11.867v23.808a13.663 13.663 0 01-6.85 11.867L46.84 75.676a13.778 13.778 0 01-13.701 0z"
        fill="#F6B100"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.637 44.145a3.744 3.744 0 01-6.39-2.647V24.053a3.742 3.742 0 117.487 0v17.445c0 .992-.395 1.945-1.097 2.647zM44.67 55.01a4.68 4.68 0 11-9.36 0 4.68 4.68 0 019.36 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Warning;

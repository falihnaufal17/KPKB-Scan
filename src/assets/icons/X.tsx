import * as React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface XProps extends SvgProps {
  style?: ViewStyle;
}

function X(props: XProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.5 1.5l-15 15m0-15l15 15"
        stroke="#1E1E1E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default X;

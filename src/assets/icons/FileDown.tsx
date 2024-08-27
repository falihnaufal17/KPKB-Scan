import * as React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface FileDownInterface extends SvgProps {
  style?: ViewStyle;
}

function FileDown(props: FileDownInterface) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.332 12.435l-2.125 1.84a.622.622 0 01-.09.06l-.075.038a.472.472 0 01-.404 0l-.067-.038-.06-.045-2.312-1.848a.576.576 0 01.078-.944.563.563 0 01.625.054l1.377 1.114V8.791a.561.561 0 111.122 0v3.816l1.205-1.04a.554.554 0 01.748.06.576.576 0 01-.022.808zm8.23.269a4.811 4.811 0 01-4.766 4.841H6.204a4.811 4.811 0 01-4.766-4.841V6.299a4.811 4.811 0 014.766-4.841h4.834a.485.485 0 01.142 0h.06c.058.025.111.06.157.104l5.986 6.084a.568.568 0 01.142.539.49.49 0 010 .112l.037 4.407zm-5.986-7.086a1.916 1.916 0 001.893 1.923h2.178L11.56 3.403l.015 2.215zm4.886 7.086V8.678H13.47a3.045 3.045 0 01-2.994-3.06V2.625H6.204A3.674 3.674 0 002.56 6.299v6.405a3.674 3.674 0 003.644 3.704h6.6a3.673 3.673 0 003.644-3.704h.014z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FileDown;

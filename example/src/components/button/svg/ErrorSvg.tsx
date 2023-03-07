import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { SvgContext } from './SvgUtils';

export const ErrorSvg = (props: SvgProps) => {
  return (
    <SvgContext.Consumer>
      {(context) => (
        <>
          <Svg viewBox={'0 0 48 48'} {...context} {...props}>
            <Path d="M24.15 26.4q.85 0 1.425-.575.575-.575.575-1.425v-9.2q0-.8-.6-1.375t-1.4-.575q-.85 0-1.425.575-.575.575-.575 1.425v9.2q0 .8.6 1.375t1.4.575ZM24 34.7q1 0 1.625-.625t.625-1.625q0-.95-.625-1.625T24 30.15q-1 0-1.625.675t-.625 1.625q0 1 .625 1.625T24 34.7Zm0 10q-4.4 0-8.175-1.575Q12.05 41.55 9.25 38.75q-2.8-2.8-4.375-6.575Q3.3 28.4 3.3 24q0-4.35 1.575-8.125Q6.45 12.1 9.25 9.3q2.8-2.8 6.575-4.425Q19.6 3.25 24 3.25q4.35 0 8.125 1.625Q35.9 6.5 38.7 9.3q2.8 2.8 4.425 6.575Q44.75 19.65 44.75 24q0 4.4-1.625 8.175Q41.5 35.95 38.7 38.75q-2.8 2.8-6.575 4.375Q28.35 44.7 24 44.7Z" />
          </Svg>
        </>
      )}
    </SvgContext.Consumer>
  );
};

import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { SvgContext } from './SvgUtils';

export const FullScreenEnterSvg = (props: SvgProps) => {
  return (
    <SvgContext.Consumer>
      {(context) => (
        <>
          <Svg viewBox={'0 0 48 48'} {...context} {...props}>
            <Path d="M10.95 39.4q-1 0-1.675-.675T8.6 37.05v-7.2q0-1 .675-1.675t1.675-.675q1 0 1.675.675t.675 1.675v4.85h4.85q1 0 1.675.675t.675 1.675q0 1-.675 1.675t-1.675.675Zm0-18.9q-1 0-1.675-.675T8.6 18.15v-7.2q0-1 .675-1.7t1.675-.7h7.2q1 0 1.675.7t.675 1.7q0 1-.675 1.675t-1.675.675H13.3v4.85q0 1-.675 1.675t-1.675.675Zm18.9 18.9q-1 0-1.675-.675T27.5 37.05q0-1 .675-1.675t1.675-.675h4.85v-4.85q0-1 .675-1.675t1.675-.675q1 0 1.7.675t.7 1.675v7.2q0 1-.7 1.675t-1.7.675Zm7.2-18.9q-1 0-1.675-.675T34.7 18.15V13.3h-4.85q-1 0-1.675-.675T27.5 10.95q0-1 .675-1.7t1.675-.7h7.2q1 0 1.7.7t.7 1.7v7.2q0 1-.7 1.675t-1.7.675Z" />
          </Svg>
        </>
      )}
    </SvgContext.Consumer>
  );
};

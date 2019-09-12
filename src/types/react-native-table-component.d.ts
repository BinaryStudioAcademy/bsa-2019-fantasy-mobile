declare module 'react-native-table-component' {
  import React from 'react';
  import { StyleProp, ViewStyle, TextStyle } from 'react-native';

  type Props = Partial<{
    data: any[];
    style: StyleProp<ViewStyle>;
    borderStyle: { borderWidth: number; borderColor: string };
    textStyle: StyleProp<TextStyle>;
    flexArr: number[];
    widthArr: number[];
    heightArr: number[];
  }>;

  export function Table(props: Props & { children: any }): JSX.Element | null;
  export function Row(props: Props): JSX.Element | null;
  export function Rows(props: Props): JSX.Element | null;
  export function Col(props: Props): JSX.Element | null;
  export function Cols(props: Props): JSX.Element | null;
}

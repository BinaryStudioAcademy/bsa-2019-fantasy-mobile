import { memo } from 'react';

const PercentageStat = ({ text }: any) => {
  return text;
};

// Prevent component from rerendering
const arePropsEqual = (prevProps: any, nextProps: any) => {
  return true;
};

export default memo(PercentageStat, arePropsEqual);

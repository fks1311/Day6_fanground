const deviceSizes = {
  mobile: `639px`,
  tablet: `1047px`,
  desktop: `1048px`,
};

const breakpoints = {
  small: `screen and (max-width: ${deviceSizes.mobile})`,
  middle: `screen and (max-width: ${deviceSizes.tablet})`,
  large: `screen and (max-width:${deviceSizes.desktop})`,
};

export const theme = {
  breakpoints,
};

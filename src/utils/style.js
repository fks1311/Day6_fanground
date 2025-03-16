const deviceSizes = {
  mobile: `767px`,
  tablet: `1023px`,
  desktop: `1024px`,
};

const breakpoints = {
  small: `screen and (max-width: ${deviceSizes.mobile})`,
  middle: `screen and (max-width: ${deviceSizes.tablet})`,
  large: `screen and (min-width:${deviceSizes.desktop})`,
};

export const theme = {
  breakpoints,
};

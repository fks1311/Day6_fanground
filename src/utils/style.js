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

// const breakpoints = {
//   lessMobile: "390px",
//   mobile: "758px",
//   tablet: "1024px",
//   desktop: "1025px",
// };

// const media = {
//   lessMobile: `screen and (max-width: ${breakpoints.lessMobile})`,
//   mobile: `screen and (max-width: ${breakpoints.mobile})`,
//   tablet: `screen and (max-width: ${breakpoints.tablet})`,
//   desktop: `screen and (min-width: ${breakpoints.tablet}`,
// };

// const breakpoints = {
//   mobile: `768px`,
//   tablet: `1280px`,
//   desktop: `1281px`,
// };

// const devices = {
//   mobile: `screen and (max-width: ${breakpoints.mobile})`,
//   tablet: `screen and (max-width: ${breakpoints.tablet})`,
//   desktop: `screen and (min-width: ${breakpoints.desktop})`,
// };

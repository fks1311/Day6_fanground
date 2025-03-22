const deviceSizes = {
  smaller: `576px`,
  tablet: `980px`,
  laptop: `1239px`,
  desktop: `1240px`,
};

const media = {
  smaller: `screen and (max-width: ${deviceSizes.smaller})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`, // 최대 768 이하
  laptop: `screen and (max-width: ${deviceSizes.laptop})`, // 최대 1279 이하
  desktop: `screen and (min-width:${deviceSizes.desktop})`, // 최소 1280 이상
};

export const theme = {
  media,
};

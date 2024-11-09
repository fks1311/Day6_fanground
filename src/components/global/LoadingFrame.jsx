import styled from "styled-components";
const { forwardRef } = require("react");

export const LoadingFrame = forwardRef((props, ref) => {
  return <ViewContainer>{props.children}</ViewContainer>;
});

const ViewContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #2d3c59;
  background-image: linear-gradient(
    153deg,
    #2d3c59 0%,
    #212e40 16%,
    #326c73 56%,
    #4e9da6 75%,
    #73c6d9 100%
  );
`;

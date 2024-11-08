import styled from "styled-components";
const { forwardRef } = require("react");

export const DefaultPage = forwardRef((props, ref) => {
  return <ViewContainer>{props.children}</ViewContainer>;
});

const ViewContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

import styled from "styled-components";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Nav } from "./Nav";

export const DefaultFrame = forwardRef((props, ref) => {
  return (
    <Frame className="frame">
      <Nav />
      {props.children}
    </Frame>
  );
});

const Frame = styled(motion.div)`
  position: relative;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
`;

import styled from "styled-components";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export const DefaultFrame = forwardRef((props, ref) => {
  const { width, height } = useWindowSize();

  return (
    <Frame className="frame">
      {/* <Confetti width={width} height={height} numberOfPieces={2000} recycle={false} tweenDuration={10000} /> */}
      <Nav />
      {/* <Trophy>🏆 데식이들 대상을 축하합니다 🏆</Trophy> */}
      {props.children}
    </Frame>
  );
});

const Frame = styled(motion.div)`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Trophy = styled.div`
  position: absolute;
  top: 5rem;
  font-size: 5rem;
`;

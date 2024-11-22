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
      <Confetti width={width} height={height} numberOfPieces={2000} recycle={false} tweenDuration={10000} />
      <Nav />
      {/* <Trophy>🏆 데식이들 대상을 축하합니다 🏆</Trophy> */}
      {props.children}
    </Frame>
  );
});

const Frame = styled(motion.div)`
  height: ${window.innerHeight}px;
  position: relative;
  display: flex;
  justify-content: center;
  .slick-slider,
  .slick-initialized,
  .slick-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 100%;
    button {
      display: none;
    }
  }
`;

const Trophy = styled.div`
  position: absolute;
  top: 5rem;
  font-size: 5rem;
  z-index: 1;
`;

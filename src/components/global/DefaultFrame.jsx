import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Nav } from "./Nav";
import { NavView } from "./NavView";
import { useOpenContext } from "./ContextProvider";

export const DefaultFrame = forwardRef((props, ref) => {
  const { isOpen, setIsOpen } = useOpenContext(false);

  return (
    <Frame>
      <Nav />
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Layout>{props.children}</Layout>
    </Frame>
  );
});

const Frame = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  @media ${({
      theme: {
        media: { desktop },
      },
    }) => desktop} {
    height: ${window.innerHeight}px;
  }
`;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

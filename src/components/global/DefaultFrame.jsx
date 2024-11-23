import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Nav } from "./Nav";
import { NavView } from "./NavView";
import { useOpenContext } from "./ContextProvider";

export const DefaultFrame = forwardRef((props, ref) => {
  // const [navHeight, setNavHeight] = useState();
  const { isOpen, setIsOpen } = useOpenContext(false);

  return (
    <Frame className="frame">
      <Nav />
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Layout className="layout">{props.children}</Layout>
    </Frame>
  );
});

const Frame = styled(motion.div)`
  height: ${window.innerHeight}px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

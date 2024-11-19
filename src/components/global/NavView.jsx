import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import day6Logo from "assets/day6Logo.png";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export const NavView = ({ isOpen, setIsOpen }) => {
  const Lists = ["Profile", "MV", "ALBUM", "Youtube"];
  const [isLoad, setIsLoad] = useState(true);
  const [showItems, setShowItems] = useState(false);

  const imageVariants = {
    init: {
      WebkitMaskImage: hiddenMask,
      maskImage: hiddenMask,
    },
    show: {
      WebkitMaskImage: visibleMask,
      maskImage: visibleMask,
      transition: { duration: 1 },
    },
  };

  const itemVariants = {
    init: {
      opacity: 0,
      x: 200,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
      setShowItems(true);
    }, 1500);
  });

  return (
    <Layout>
      <Icon>
        <MdClose size={80} onClick={() => setIsOpen(!isOpen)} />
      </Icon>
      <AnimatePresence>
        <Content>
          {isLoad ? <Image src={day6Logo} variants={imageVariants} initial="init" animate="show" /> : null}
          {showItems ? (
            <Item variants={itemVariants} initial="init" animate="show">
              {Lists.map((item, idx) => (
                <Items key={idx}>{item}</Items>
              ))}
            </Item>
          ) : null}
        </Content>
      </AnimatePresence>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Icon = styled.div`
  width: inherit;
  display: flex;
  justify-content: flex-end;
  svg {
    margin-top: 1rem;
    margin-right: 4rem;
    cursor: pointer;
  }
`;
const Content = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  align-items: center;
  width: inherit;
`;
const Image = styled(motion.img)`
  position: absolute;
`;
const Item = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  font-size: 3rem;
  font-weight: 700;
`;
const Items = styled(motion.div)`
  cursor: pointer;
`;

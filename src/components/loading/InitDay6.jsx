import styled from "styled-components";
import day6Logo from "assets/day6Logo.png";
import { AnimatePresence, motion } from "framer-motion";

export const InitDay6 = ({ initDay6, setInitDay6 }) => {
  const day6logoVariants = {
    initial: { scale: 0 },
    animate: { scale: 1.5 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {initDay6 && (
        <AnimateLogoDay6
          src={day6Logo}
          variants={day6logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 2 }}
        />
      )}
    </AnimatePresence>
  );
};

const AnimateLogoDay6 = styled(motion.img)`
  position: absolute;
`;

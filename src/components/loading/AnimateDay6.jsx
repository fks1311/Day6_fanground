import styled from "styled-components";
import Day6 from "assets/day6.jpg";
import { AnimatePresence, motion } from "framer-motion";

export const AnimateDay6 = ({ animateDay6, setanimateDay6 }) => {
  const day6logoVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {animateDay6 && (
        <AnimateLogoDay6
          src={Day6}
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
  width: 300px;
  height: 300px;
  position: absolute;
`;

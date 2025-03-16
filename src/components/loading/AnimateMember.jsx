import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import sj from "assets/sj.jpeg";
import yk from "assets/yk.jpeg";
import wp from "assets/wp.jpeg";
import dw from "assets/dw.jpeg";

export const AnimateMember = ({ animateMember, setAnimateMember }) => {
  const profile_img = [{ img: sj }, { img: yk }, { img: wp }, { img: dw }];

  const parentVariants = {
    init: { opacity: 0 },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };
  const childVariants = {
    init: { opacity: 0 },
    exit: { opacity: 1 },
  };

  return (
    <View>
      <AnimatePresence>
        {animateMember && (
          <Member variants={parentVariants} initial="init" animate="exit">
            {profile_img.map((data, idx) => (
              <Profile key={idx} src={data.img} variants={childVariants} />
            ))}
          </Member>
        )}
      </AnimatePresence>
    </View>
  );
};

const View = styled.div`
  position: absolute;
`;
const Member = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Profile = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

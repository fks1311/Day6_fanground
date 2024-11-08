import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import 성진 from "assets/성진.jpeg";
import 영케이 from "assets/영케이.jpeg";
import 원필 from "assets/원필.jpeg";
import 도운 from "assets/도운.jpeg";

export const AnimateMember = ({ animateMember, setAnimateMember }) => {
  const profile_img = [
    { img: 성진 },
    { img: 영케이 },
    { img: 원필 },
    { img: 도운 },
  ];

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

import React, { useState } from "react";
import { DefaultFrame } from "components/global/DefaultFrame";
import { motion } from "framer-motion";
import styled from "styled-components";
import { profiles } from "utils/Profile";

export const Profile = () => {
  const [curProfile, setCurProfile] = useState(undefined);

  const layoutVariants = {
    init: {
      opacity: 0,
      y: 15,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
      },
    },
  };

  const postVariants = {
    init: {
      display: "flex",
      width: "100%",
      transition: {
        opacity: { duration: 0.3 },
        width: { duration: 1 },
      },
    },
    show: {
      display: "flex",
      width: "50%",
      transition: {
        opacity: { duration: 0.5 },
        width: { duration: 0 },
      },
      "@media (max-width: 1279px)": {
        width: "100%",
      },
    },
    hidden: {
      display: "none",
      width: "0%",
      transition: {
        opacity: { duration: 0.5 },
        width: { duration: 0.5 },
      },
    },
  };

  const profileVariants = {
    init: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 3.5,
      },
    },
  };

  return (
    <DefaultFrame>
      <Layout variants={layoutVariants} initial="init" animate="show">
        {profiles.map((data, idx) => (
          <React.Fragment key={idx}>
            <Post
              $curProfile={curProfile}
              $curIdx={idx}
              variants={postVariants}
              initial="init"
              animate={curProfile === undefined ? "init" : curProfile === idx ? "show" : "hidden"}
              onClick={() => setCurProfile(curProfile === undefined ? idx : undefined)}
            >
              <Image src={data.img} $curProfile={curProfile} $curIdx={idx} />
            </Post>
          </React.Fragment>
        ))}
        {curProfile !== undefined && (
          <ProfileContent variants={profileVariants} initial="init" animate="show">
            <English_Name>{profiles[curProfile].english_name}</English_Name>
            <DividedProfile>
              <span>이름</span> {profiles[curProfile].born_name}
            </DividedProfile>
            <DividedProfile>
              <span>생년월일</span>
              {profiles[curProfile].birth}
            </DividedProfile>
            <DividedProfile>
              <span>포지션</span>
              {profiles[curProfile].position}
            </DividedProfile>
            <DividedProfile>
              <span>데뷔</span>
              <Debut>
                {profiles[curProfile].debut.map((data, idx) => (
                  <p key={idx}>
                    <span>{data.group}</span>: <span style={{}}>{data.date}</span>
                  </p>
                ))}
              </Debut>
            </DividedProfile>
          </ProfileContent>
        )}
      </Layout>
    </DefaultFrame>
  );
};

const Layout = styled(motion.div)`
  width: 95%;
  display: flex;
  align-items: center;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Post = styled(motion.div)`
  // display: ${({ $curProfile, $curIdx }) =>
    $curProfile === undefined ? `flex` : $curProfile === $curIdx ? `flex` : `none`};
  // width: ${({ $curProfile, $curIdx }) =>
    $curProfile === undefined ? `100%` : $curProfile === $curIdx ? `50%` : `0%`};
  flex-direction: column;
  gap: 0.5rem;
  height: 98%;
  padding: 0.3rem;
`;

const Image = styled(motion.img)`
  width: ${({ $curProfile, $curIdx }) =>
    $curProfile === undefined ? `100%` : $curProfile === $curIdx ? `100%` : `0%`};
  height: 100%;
  border-radius: 10px;
`;

const ProfileContent = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-left: 1rem;
  padding-bottom: 5rem;
  font-family: SUIT-SemiBold;
  font-size: 1rem;
`;
const English_Name = styled.div`
  font-family: SUIT-Bold;
  font-size: 3rem;
`;
const DividedProfile = styled.div`
  display: flex;
  margin-left: 0.8rem;
  span {
    display: inline-block;
    width: 70px;
  }
`;

const Debut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    width: 100px;
  }
`;

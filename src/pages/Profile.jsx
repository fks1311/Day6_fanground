import { DefaultFrame } from "components/global/DefaultFrame";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { profiles } from "utils/Profile";

export const Profile = () => {
  const [cur, setCur] = useState(undefined);

  // motion variants
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

  const contentVariants = {
    init: {},
    show: {},
  };

  return (
    <DefaultFrame>
      <Layout variants={layoutVariants} initial="init" animate="show">
        {profiles.map((data, idx) => (
          <Post key={idx} $cur={cur} onClick={() => setCur(cur === undefined ? idx : undefined)}>
            <>
              <Image src={data.img} $cur={cur} $idx={idx} alt="image" />
              <Content $cur={cur} $idx={idx} className="content">
                <English_Name>{profiles[idx].english_name}</English_Name>
                <Info>
                  <span>{profiles[idx].born_name}</span>
                  <span>{profiles[idx].birth}</span>
                  <span>{profiles[idx].position}</span>
                  <Debut>
                    {profiles[idx].debut.map((data, idx) => (
                      <p key={idx}>
                        <span>{data.group}</span>: <span style={{}}>{data.date}</span>
                      </p>
                    ))}
                  </Debut>
                </Info>
              </Content>
            </>
          </Post>
        ))}
      </Layout>
    </DefaultFrame>
  );
};

const Layout = styled(motion.div)`
  height: 100%;
  width: 95%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
  }
`;

// post
const Post = styled(motion.div)`
  height: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  @media (max-width: 700px) {
    min-height: 400px;
    min-width: 270px;
  }
`;

// profile image
const Image = styled(motion.img)`
  width: 100%;
  height: ${({ $cur, $idx }) => ($cur === undefined ? "100%" : $cur === $idx ? "80%" : "100%")};
  z-index: 1;
  border-radius: 10px;
  transition-duration: 1s;
`;

// member info
const Content = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  font-family: SUIT-Regular;
  border-radius: 10px;
  // background-color: #4f959d;
  background-image: linear-gradient(153deg, #2d3c59 0%, #212e40 16%, #326c73 56%, #4e9da6 75%, #73c6d9 100%);
  z-index: ${({ $cur, $idx }) => ($cur === $idx ? "2" : "0")};
  transition-duration: 1s;
  @media ${({ theme }) => theme.media.laptop}, ${({ theme }) => theme.media.desktop} {
    height: 35%;
    font-size: 0.8rem;
  }
  @media ${({ theme }) => theme.media.tablet}, (max-width: 700px) {
    min-height: 45%;
    padding: 0.3rem;
    font-size: 0.8rem;
  }
`;
const English_Name = styled.div`
  color: white;
  font-family: SUIT-Bold;
  font-size: 1rem;
  text-align: center;
`;
const Info = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.5rem;
  padding: 0rem 3rem;
  margin-top: 1rem;
  color: #fdfbee;
`;
const Debut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  span {
    width: 100px;
  }
`;

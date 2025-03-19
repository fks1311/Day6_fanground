import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import YouTube from "react-youtube";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { DefaultFrame } from "components/global/DefaultFrame";
import { useMusicVideoJsonList } from "utils/collectFunctions";

export const MV = () => {
  const [isImg, setIsImg] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const { isLoading, data } = useMusicVideoJsonList("day6");

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
        delayChildren: 0.5,
      },
    },
  };

  const listVariants = {
    init: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
  };

  const isImgVariants = {
    init: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  const combineVariants = {
    init: { ...listVariants.init, ...isImgVariants.init },
    show: { ...listVariants.show, ...isImgVariants.show },
  };

  return (
    <DefaultFrame>
      {isLoading ? (
        <></>
      ) : (
        <Layout variants={layoutVariants} initial="init" animate="show">
          <Video>
            <Title>{data.data[currentId].title}</Title>
            <div style={{ borderRadius: "10px", overflow: "hidden", width: "100%" }}>
              <YouTube
                className="youtube"
                videoId={data.data[currentId].videoId}
                opts={{
                  width: "100%",
                  height: "700",
                }}
              />
            </div>
          </Video>
          <VideoList>
            <Icon onClick={() => setIsImg(!isImg)}>
              {isImg ? <AiOutlineAppstore size={30} /> : <BsList size={30} />}
            </Icon>
            <Lists $isImg={isImg} variants={combineVariants} layout>
              {data.data.map((data, idx) => (
                <Item key={idx} $isImg={isImg} onClick={() => setCurrentId(idx)}>
                  <img src={`https://img.youtube.com/vi/${data.videoId}/hqdefault.jpg`} />
                  <div>
                    <p>{data.title}</p>
                    <span>{data.channelTitle}</span>
                    <span>{data.publishTime}</span>
                  </div>
                </Item>
              ))}
            </Lists>
          </VideoList>
        </Layout>
      )}
    </DefaultFrame>
  );
};

const Layout = styled(motion.div)`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    flex-direction: column;
  }
`;

const Video = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    .youtube {
      width: 75vw;
      height: 60vh;
    }
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    .youtube {
      width: 70vw;
      height: 50vh;
    }
  }
  @media ${({
      theme: {
        media: { smaller },
      },
    }) => smaller} {
    .youtube {
      height: 40vh;
    }
  }
`;
const Title = styled.div`
  padding: 2rem;
  font-size: 1.5rem;
  font-family: SUIT-Bold;
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    overflow: hidden;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
  }
`;
const Lists = styled(motion.div)`
  display: ${({ $isImg }) => ($isImg ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
  div {
    display: flex;
  }
  font-size: 14px;
  font-family: SUIT-Bold;
  line-height: 1.3rem;
  p {
  }
  span {
    font-size: 12px;
    font-family: SUIT-Regular;
  }
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    flex-direction: row;
    overflow-x: scroll;
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Item = styled(motion.div)`
  flex-direction: ${({ $isImg }) => ($isImg ? "" : "column")};
  padding: 0.8rem;
  gap: 0.5rem;
  img {
    height: 80px;
    width: ${({ $isImg }) => ($isImg ? "120px" : "130px")};
    border-radius: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &:hover {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

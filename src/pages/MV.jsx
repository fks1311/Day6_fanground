import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import YouTube from "react-youtube";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { DefaultFrame } from "components/global/DefaultFrame";

export const MV = () => {
  const [isImg, setIsImg] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const { isLoading, data } = useQuery({
    queryKey: ["day6"],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      return response;
    },
  });

  return (
    <DefaultFrame>
      {isLoading ? (
        <></>
      ) : (
        <Layout>
          <Video>
            <Title>{data.data[currentId].title}</Title>
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
              <YouTube
                videoId={data.data[currentId].videoId}
                opts={{
                  width: "1200",
                  height: "700",
                }}
              />
            </div>
          </Video>
          <VideoList>
            <Icon onClick={() => setIsImg(!isImg)}>
              {isImg ? <AiOutlineAppstore size={30} /> : <BsList size={30} />}
            </Icon>
            <Lists $isImg={isImg}>
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

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const Video = styled.div`
  // flex: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  padding: 2rem;
  font-size: 1.5rem;
  font-family: SUIT-Bold;
`;

const VideoList = styled.div`
  // flex: 0.8;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  // padding: 2rem;
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;
const Lists = styled.div`
  display: ${({ $isImg }) => ($isImg ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
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
`;

const Item = styled.div`
  flex-direction: ${({ $isImg }) => ($isImg ? "" : "column")};
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
    // gap: 0.2rem;
  }
`;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import YouTube from "react-youtube";
import { AiOutlineAppstore } from "react-icons/ai";
import { DefaultFrame } from "components/global/DefaultFrame";
import decodeHTMLEntities from "utils/decodeHTMLEntities";

export const MV = () => {
  const [currentId, setCurrentId] = useState(0);
  const youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search";
  const params = {
    key: process.env.REACT_APP_API_KEY,
    part: "snippet",
    q: "Day6 M/V | DAY 6 | JYP Entertainment",
    type: "video",
    maxResults: 50,
  };

  const { isLoading, data } = useQuery({
    queryKey: ["day6"],
    queryFn: async () => {
      const response = await axios.get(youtubeApiUrl, { params });
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
            <Title>{decodeHTMLEntities(data.data.items[currentId].snippet.title)}</Title>
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
              <YouTube
                videoId={data.data.items[currentId].id.videoId}
                opts={{
                  width: "1200",
                  height: "700",
                }}
              />
            </div>
          </Video>
          <VideoList>
            <Icon>
              <AiOutlineAppstore size={30} />
            </Icon>
            <Lists>
              {data.data.items.map((data, idx) => (
                <Item key={idx} onClick={() => setCurrentId(idx)}>
                  <img src={data.snippet.thumbnails.default.url} />
                  <div>
                    <p>{decodeHTMLEntities(data.snippet.title)}</p>
                    <span>{data.snippet.channelTitle}</span>
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
  justify-content: space-evenly;
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
  display: flex;
  flex-direction: column;
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
  gap: 0.5rem;
  img {
    border-radius: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

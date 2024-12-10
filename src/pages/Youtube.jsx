import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { DefaultFrame } from "components/global/DefaultFrame";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { useInfiniteQueryYoutube } from "utils/collectFunctions";

export const Youtube = () => {
  const [page, setPage] = useState(0);
  const youtubePlaylistsApiUrl = "https://www.googleapis.com/youtube/v3/playlists";
  const youtubeChnnelsApiUrl = "https://www.googleapis.com/youtube/v3/channels";
  const forHandle = [
    { channel: "@DAY6Official", id: "UCp-pqXsizklX3ZHvLxXyhxw" },
    { channel: "@ParksungJjin_2YA", id: "UCcv0r75ndl3rG9oQKhygHRw" },
  ];

  // channels
  const channels = useQueries({
    queries: forHandle.map((data) => ({
      queryKey: [data.channel],
      queryFn: async () =>
        await axios.get(youtubeChnnelsApiUrl, {
          params: {
            key: process.env.REACT_APP_API_KEY,
            part: "statistics, snippet",
            forHandle: data.channel,
            maxResults: 50,
          },
        }),
    })),
    combine: (results) => {
      return {
        data: results.filter((res) => res?.data?.data?.items).flatMap((res) => res.data.data.items),
      };
    },
  });

  // playlists
  const playlistParams = (channelId) => ({
    key: process.env.REACT_APP_API_KEY,
    part: "snippet",
    channelId,
    maxResults: 50,
  });

  const useCommonUseInfiniteQuery = (channelId, queryKey) => {
    const params = playlistParams(channelId);
    return useInfiniteQueryYoutube(youtubePlaylistsApiUrl, params, queryKey);
  };

  const {
    isLoading: day6InfinitedLoading,
    data: day6InfinitedData,
    fetchNextPage: day6Fetch,
  } = useCommonUseInfiniteQuery(forHandle[0].id, "Day6");

  const {
    isLoading: parkInfinitedLoading,
    data: parkInfinitedData,
    fetchNextPage: parkFetch,
  } = useCommonUseInfiniteQuery(forHandle[1].id, "park");

  const flatDay6 = day6InfinitedData?.pages?.flatMap((res) => res?.items || []) || [];
  const flatPark = parkInfinitedData?.pages?.flatMap((res) => res?.items || []) || [];
  const assign = [[...flatDay6], [...flatPark]];

  const loading = day6InfinitedLoading || parkInfinitedLoading;

  return (
    <DefaultFrame>
      {loading ? (
        <></>
      ) : (
        <Layout>
          <SlideChannelFrame>
            <SlideArrowBtn onClick={() => setPage(0)} />
            <Content>
              <ChannelInfo>
                <img src={channels.data[page].snippet.thumbnails.default?.url} />
                <div>
                  <p className="title">{channels.data[page].snippet.title}</p>
                  <div>
                    <p>{channels.data[page].snippet.customUrl}</p>
                    <p>
                      <span>구독자 {channels.data[page].statistics.subscriberCount}</span>
                      <span>동영상 {channels.data[page].statistics.videoCount}</span>
                    </p>
                  </div>
                </div>
              </ChannelInfo>
              <PlayLists>
                {assign[page].map((item, idx) => (
                  <div key={idx}>
                    <div className="img-out-frame">
                      <img src={item.snippet.thumbnails.medium?.url} />
                    </div>
                    <p>{item.snippet.title}</p>
                  </div>
                ))}
              </PlayLists>
              <RefetchBtnFrame>
                <SlideArrowBtn />
              </RefetchBtnFrame>
            </Content>
            <SlideArrowBtn onClick={() => setPage(1)} />
          </SlideChannelFrame>
          <SlideBtnFrame>
            {forHandle.map((data, idx) => (
              <div key={idx} onClick={() => setPage(idx)} />
            ))}
          </SlideBtnFrame>
          {/* <Layout>
            {channels.data.map((channel, idx) => (
              <Channel key={idx}>
                <ChannelInfo>
                  <img src={channel.snippet.thumbnails.default?.url} />
                  <div>
                    <p className="title">{channel.snippet.title}</p>
                    <div>
                      <p>{channel.snippet.customUrl}</p>
                      <p>
                        <span>구독자 {channel.statistics.subscriberCount}</span>
                        <span>동영상 {channel.statistics.videoCount}</span>
                      </p>
                    </div>
                  </div>
                </ChannelInfo>
                <Playlists className="playlists">
                  {assign.map(
                    (data, idx) =>
                      channel.id === data.snippet.channelId && (
                        <div key={idx}>
                          <img src={data.snippet.thumbnails.medium?.url} />
                          <p>{data.snippet.title}</p>
                        </div>
                      )
                  )}
                </Playlists>
              </Channel>
            ))}
          </Layout> */}
        </Layout>
      )}
    </DefaultFrame>
  );
};

const Layout = styled(motion.div)`
  width: 80%;
  height: 95%;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const SlideChannelFrame = styled.div`
  height: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;
const RefetchBtnFrame = styled.div`
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
`;
const SlideArrowBtn = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: #009990;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 1rem;
  height: 100px;
  .title {
    font-size: 40px;
    font-family: SUIT-SemiBold;
  }
  img {
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  p {
    display: flex;
  }
  span {
    margin-right: 0.5rem;
  }
  font-size: 14px;
  font-family: SUIT-Regular;
`;
const PlayLists = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 1rem;
  max-height: 100%;
  overflow: hidden;
  overflow-y: auto;
  .img-out-frame {
    border-radius: 10px;
    overflow: hidden;
  }
`;

// bottom-slide button
const SlideBtnFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  div {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background-color: #009990;
  }
`;

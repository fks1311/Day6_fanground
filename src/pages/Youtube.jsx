import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { DefaultFrame } from "components/global/DefaultFrame";
import { useInfiniteQueryYoutube } from "utils/collectFunctions";

export const Youtube = () => {
  const [page, setPage] = useState(0);
  const [trigger, setTrigger] = useState(0);
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
  const assignArray = [[...flatDay6], [...flatPark]];
  const curPlaylistCounts = [flatDay6.length, flatPark.length];
  const totalPlaylistCounts = [
    day6InfinitedData?.pages?.[0].pageInfo?.totalResults, // 총 카운트
    parkInfinitedData?.pages?.[0].pageInfo?.totalResults,
  ];

  const onClickRefetch = () => {
    page === 0 ? day6Fetch() : parkFetch();
  };

  const loading = day6InfinitedLoading || parkInfinitedLoading;

  const layoutVariants = {
    init: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
      },
    },
  };

  const playlistsVariants = {
    init: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      visibility: "visible",
      transition: {
        duration: 3,
      },
    },
  };

  return (
    <DefaultFrame>
      {loading ? (
        <></>
      ) : (
        <Layout variants={layoutVariants} initial="init" animate="show">
          <SlideChannelFrame>
            {page !== 0 && (
              <SlideArrowBtn
                onClick={() => {
                  setPage((prev) => prev - 1);
                  setTrigger((prev) => prev + 1);
                }}
              >
                <IoIosArrowDropleft size={20} />
              </SlideArrowBtn>
            )}
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
              <PlayLists key={trigger} variants={playlistsVariants} initial="init" animate="show">
                {assignArray[page].map((item, idx) => (
                  <PlayItem key={idx}>
                    <div className="img-out-frame">
                      <img src={item.snippet.thumbnails.medium?.url} />
                    </div>
                    <p>{item.snippet.title}</p>
                  </PlayItem>
                ))}
              </PlayLists>
              {totalPlaylistCounts[page] !== curPlaylistCounts[page] && (
                <RefetchBtnFrame onClick={onClickRefetch}>
                  <IoIosArrowDropdown size={20} />
                </RefetchBtnFrame>
              )}
            </Content>
            {forHandle.length !== page + 1 && (
              <SlideArrowBtn
                onClick={() => {
                  setPage((prev) => prev + 1);
                  setTrigger((prev) => prev + 1);
                }}
              >
                <IoIosArrowDropright size={20} />
              </SlideArrowBtn>
            )}
          </SlideChannelFrame>
          <SlideBottomBtnFrame>
            {forHandle.map((data, idx) => (
              <BottomBtn
                key={idx}
                $curPage={idx === page}
                onClick={() => {
                  setPage(idx);
                  setTrigger((prev) => prev + 1);
                }}
              />
            ))}
          </SlideBottomBtnFrame>
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
const SlideChannelFrame = styled(motion.div)`
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
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
const PlayLists = styled(motion.div)`
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
const PlayItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 14px;
  font-family: SUIT-SemiBold;
  text-decoration-line: none;
  color: black;
`;

// common button
const SlideArrowBtn = styled.div``;

// bottom-slide button
const SlideBottomBtnFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const BottomBtn = styled.div`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: ${({ $curPage }) => ($curPage ? `#3C3D37` : `rgb(60, 61, 55, 0.3)`)};
`;

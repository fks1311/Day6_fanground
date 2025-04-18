import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { DefaultFrame } from "components/global/DefaultFrame";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import YouTube from "react-youtube";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInfiniteQueryYoutube } from "utils/collectFunctions";
import useWindowsize from "utils/useWindowsize";

export const Album_Track = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [curMV, setCurMV] = useState();
  const [track, setTrack] = useState(false);
  const [playlist, setPlaylist] = useState(false);
  const curAccordionHeight = useRef();
  const curTrackListHeight = useRef();
  const [curAccordion, setCurAccordion] = useState();
  const [curTrackList, setCurTrackList] = useState();
  const [videoKey, setVideoKey] = useState(curMV); // 비디오 컴포넌트가 상태 변경을 제대로 인식하지 못하여 강제로 재렌더링 하도록 작업 진행
  const windowsize = useWindowsize();

  useEffect(() => {
    playlist && fetchNextPage(); // useInfiniteQuery 트리거
    setCurAccordion(curAccordionHeight?.current?.clientHeight);
    setCurTrackList(curTrackListHeight?.current?.clientHeight);
    setVideoKey(curMV);
  }, [track, playlist, curMV]);

  const youtubePlaylistItemsApiUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  const youtubePlaylistsApiUrl = "https://www.googleapis.com/youtube/v3/playlists";

  // mv
  const { isLoading: mvLoading, data: mvData } = useQuery({
    queryKey: ["mv"],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      const filter = response.data.filter((f, i) => f.album === decodeURI(location.state.album));
      setCurMV(filter[0].videoId);
      return filter;
    },
  });

  // playlists
  const playListParams = {
    key: process.env.REACT_APP_API_KEY,
    part: "snippet",
    channelId: "UCp-pqXsizklX3ZHvLxXyhxw",
    maxResults: 50,
  };
  const {
    isLoading: infinitedLoading,
    data: infinitedData,
    fetchNextPage,
  } = useInfiniteQueryYoutube(youtubePlaylistsApiUrl, playListParams, "infinited");

  const allPlaylists = infinitedData?.pages?.flatMap((res) => res.items);
  const filterAllPlaylists = allPlaylists?.filter((f) => f.snippet.title.includes(decodeURI(location.state.album)));

  // playlistItems
  const plitems = useQueries({
    queries:
      !infinitedLoading && filterAllPlaylists
        ? filterAllPlaylists.map((data) => ({
            queryKey: [data.id],
            queryFn: async () =>
              await axios.get(youtubePlaylistItemsApiUrl, {
                params: {
                  key: process.env.REACT_APP_API_KEY,
                  part: "snippet",
                  playlistId: data.id,
                  maxResults: 50,
                },
              }),
          }))
        : [],
    combine: (result) => {
      return {
        data: result.filter((res) => res?.data?.data?.items).flatMap((res) => res.data.data.items),
      };
    },
  });

  const loading = mvLoading || infinitedLoading;

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
        delayChildren: 0.5,
      },
    },
  };

  return (
    <DefaultFrame>
      {loading ? (
        <></>
      ) : (
        <Layout variants={layoutVariants} initial="init" animate="show">
          <BackBtn onClick={() => navigate(-1)}>
            <IoArrowBackCircleOutline size={20} />
            Back
          </BackBtn>
          <AlbumFrame>
            <AlbumTitle gradients={mvData[0].gradients}>{decodeURI(location.state.album)}</AlbumTitle>
            <AlbumInfo className="info">
              <AlbumMusicVideo>
                <YouTube
                  key={videoKey}
                  className="youtube"
                  videoId={curMV}
                  opts={{
                    width: "100%",
                    height: windowsize?.width <= 580 ? "450" : "650",
                  }}
                />
              </AlbumMusicVideo>
              <Accordion ref={curAccordionHeight}>
                <TrackList gradients={mvData[0].gradients} $track={track} ref={curTrackListHeight} layout>
                  <Subject gradients={mvData[0].gradients} onClick={() => setTrack(!track)} layout>
                    TRACK LIST
                    <IoIosArrowDropdown />
                  </Subject>
                  <Content layout direction={windowsize <= 980 ? "row" : undefined}>
                    <Cover src={`https://fks1311.github.io/day6_cdn_data/public${mvData[0].cover}`} $track={track} />
                    <Track>
                      {mvData[0].track_list.map((data, idx) => (
                        <Lists $gap={data === mvData[0].title} key={idx}>
                          <span>
                            {idx + 1}. {data}
                          </span>
                          <span>{data === mvData[0].title && "✦ Title"}</span>
                        </Lists>
                      ))}
                    </Track>
                  </Content>
                </TrackList>
                <RelatedList
                  gradients={mvData[0].gradients}
                  $playlist={playlist}
                  accordion={curAccordion}
                  $trackHeight={curTrackList}
                  layout
                >
                  <Subject gradients={mvData[0].gradients} onClick={() => setPlaylist(!playlist)} layout>
                    Related Playlists
                    <IoIosArrowDropdown />
                  </Subject>
                  <Content direction={`column`} layout>
                    {plitems.data.map((data, idx) => (
                      <PlayList key={idx} onClick={() => setCurMV(data.snippet.resourceId.videoId)}>
                        <span>{idx + 1}</span>
                        <img src={data.snippet.thumbnails.default?.url} />
                        <span>{data.snippet.title}</span>
                      </PlayList>
                    ))}
                  </Content>
                </RelatedList>
              </Accordion>
            </AlbumInfo>
          </AlbumFrame>
        </Layout>
      )}
    </DefaultFrame>
  );
};
const Layout = styled(motion.div)`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const BackBtn = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  align-items: flex-start;
  // justify-content: center;
  justify-content: flex-start;
  margin-top: 2rem;
  gap: 0.5rem;
  font-family: SUIT-Regular;
  font-size: 1rem;
`;

const AlbumFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: SUIT-Bold;
  font-size: 20px;
`;
const AlbumTitle = styled.div`
  width: 100%;
  padding: 2rem;
  color: white;
  font-size: 2.5rem;
  font-family: SUIT-Bold;
  text-align: center;
  border-radius: 10px;
  background-image: ${({ gradients }) => gradients};
`;

const AlbumInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    flex-direction: column;
    flex: 1;
  }
`;
const AlbumMusicVideo = styled.div`
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  width: 70vw;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    width: 60vw;
    .youtube {
      width: 60vw;
    }
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    width: 75vw;
    .youtube {
      width: 75vw;
    }
    flex: 1;
  }
  @media ${({
      theme: {
        media: { smaller },
      },
    }) => smaller} {
    height: 50vh;
    .youtube {
      height: 50vh;
    }
  }
`;

const Accordion = styled(motion.div)`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    flex: 0;
  }
`;
const Subject = styled(motion.div)`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
  background-image: ${({ gradients }) => gradients};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: 1rem;
  padding: 1rem;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    flex-direction: column;
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    flex-direction: ${({ direction }) => direction};
    gap: 2rem;
  }
`;

const TrackList = styled(motion.div)`
  width: 100%;
  max-height: ${({ $track }) => ($track ? `360px` : `50px`)};
  overflow-y: ${({ $track }) => $track && `auto`};
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 10px;
  background-image: ${({ gradients }) => gradients};
`;
const Cover = styled.img`
  max-height: ${({ $track }) => ($track ? `50%` : `0px`)};
  width: 45%;
  border-radius: 10px;
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    height: 55%;
    width: 25%;
  }
  @media ${({
      theme: {
        media: { smaller },
      },
    }) => smaller} {
    height: 35%;
  }
`;
const Track = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Lists = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ $gap }) => $gap && `0.5rem`};
  font-family: ${({ $gap }) => ($gap ? `SUIT-Bold` : `SUIT-Regular`)};
  span {
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;

const RelatedList = styled(motion.div)`
  width: 100%;
  max-height: ${({ $playlist, accordion, $trackHeight }) =>
    $playlist ? (accordion > 656 ? `calc(${656 - $trackHeight - 14}px)` : `590px`) : `50px`};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  color: white;
  border-radius: 10px;
  background-image: ${({ gradients }) => gradients};
  // transition: 1s ease;
`;
const PlayList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  font-family: SUIT-Regular;
  line-height: 1.5rem;
  img {
    border-radius: 10px;
  }
`;

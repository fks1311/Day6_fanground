import { DefaultFrame } from "components/global/DefaultFrame";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useQueryYoutube } from "utils/collectFunctions";

export const Playlists_Track = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playlistId = location.pathname.substring(7);
  const [curMV, setCurMV] = useState(0);
  const windowsize = useWindowSize();

  const youtubePlaylistItemsApiUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  const params = {
    key: process.env.REACT_APP_API_KEY,
    part: "snippet",
    playlistId,
    maxResults: 50,
  };

  const { isLoading, data } = useQueryYoutube(youtubePlaylistItemsApiUrl, params, playlistId);
  const flatData = data?.items;

  return (
    <DefaultFrame>
      {isLoading ? (
        <></>
      ) : (
        <Layout>
          <Back onClick={() => navigate(-1)}>{"< Back"}</Back>
          <PlayListFrame>
            <VideoFrame>
              <YouTube
                className="youtube"
                videoId={flatData[curMV].snippet.resourceId.videoId}
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                opts={{
                  width: "100%",
                  height: windowsize.width >= 1240 ? "100%" : "500",
                }}
              />
            </VideoFrame>
            <Playlists>
              <PlaylistTitle>
                <div>{location.state.title}</div>
              </PlaylistTitle>
              <List>
                {flatData.map((list, idx) => (
                  <Items key={idx} onClick={() => setCurMV(idx)}>
                    <span>{idx + 1}</span>
                    <img src={list?.snippet?.thumbnails?.default?.url} />
                    <span>{list?.snippet?.title}</span>
                  </Items>
                ))}
              </List>
            </Playlists>
          </PlayListFrame>
        </Layout>
      )}
    </DefaultFrame>
  );
};

const Layout = styled.div`
  width: 80%;
  // height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    height: 90%;
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    height: 75%;
  }
`;

const Back = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-family: SUIT-SemiBold;
`;
const PlayListFrame = styled.div`
  display: flex;
  gap: 1rem;
  height: 90%;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    flex-direction: column;
  }
`;

const VideoFrame = styled.div`
  flex: 1;
  .youtube {
    height: 100%;
  }
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    flex: 0;
  }
  @media ${({
      theme: {
        media: { tablet },
      },
    }) => tablet} {
    .youtube {
      // width: 50vw;
      height: 60vh;
    }
  }
`;
const Playlists = styled.div`
  flex: 0.5;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    // height: 700px;
    flex: 1;
  }
`;

const PlaylistTitle = styled.div`
  height: 10%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-family: SUIT-SemiBold;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${({
      theme: {
        media: { laptop },
      },
    }) => laptop} {
    height: 15%;
  }
`;
const List = styled.div`
  height: 590px;
  display: flex;
  flex-direction: column;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-size: 14px;
  font-family: SUIT-Regular;
  line-height: 1.5rem;
  img {
    border-radius: 10px;
  }
  &:hover {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

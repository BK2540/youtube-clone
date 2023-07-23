import { Download, ReplyAllOutlined, ReplyOutlined, ShareOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material';
import styled from 'styled-components'
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchSuccess, fetchStart, fetchFailure } from '../redux/videoSlice';
import { format } from 'timeago.js';
import Recomments from '../components/Recomments';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const Info = styled.span`
color: ${({theme}) => theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({theme}) => theme.text};
`;

const Button = styled.button`
display: flex;
align-items: center;
gap: 5px;
background-color: ${({theme}) => theme.bgLighter};
border-radius: 32px;
border: none;
outline: none;
color: ${({theme}) => theme.text};
padding: 5px 15px;
cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.1px solid ${({ theme }) => theme.soft};
`;



const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`;

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
font-weight: 500;
`;

const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({ theme }) => theme.textSoft};
font-size: 12px;
`;

const Description = styled.p`
font-size: 14px;
`;

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;



const Video = () => {
 
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true); // State to handle data loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:8800/api/videos/find/${path}`);
        const channelRes = await axios.get(`http://localhost:8800/api/users/find/${videoRes.data.userId}`);

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(false); // Data is loaded, set loading state to false
      } catch (err) {
        setLoading(false); // Handling errors, set loading state to false
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`http://localhost:8800/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`)
      : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
        <Content>
          <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
          </VideoWrapper>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>{currentVideo?.views}views {format(currentVideo?.createdAt)}</Info>
            <Buttons>
                <Button onClick={handleLike}>
                {currentVideo?.like?.includes(currentUser?._id) 
                ? (<ThumbUp/>) 
                : (<ThumbUpAltOutlined/>)}{" "}
                {currentVideo?.likes?.length}
                </Button>

                <Button onClick={handleDislike}>
                  {currentVideo?.dislikes?.includes(currentUser?._id) 
                  ? (<ThumbDown/> )
                  : (<ThumbDownAltOutlined/>)}{" "} dislike
                </Button>
                <Button>
                  <ReplyOutlined/> Share
                </Button>
                <Button>
                  <Download/> Download
                </Button>
            </Buttons>
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
            <Image src={channel?.img} />
              <ChannelDetail>
                <ChannelName>{channel?.name}</ChannelName>
                <ChannelCounter>{channel?.subscribers} Subscribers</ChannelCounter>
                <Description>{currentVideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
               <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
          </Channel>
          <Hr/>
          <Comments videoId={currentVideo?._id}/>
        </Content>
        <Recomments tags={currentVideo?.tags}/>
    </Container>
  )
}

export default Video
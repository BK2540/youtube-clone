import styled from 'styled-components';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { AccountCircleOutlined, ArticleOutlined, ExploreOutlined, FlagOutlined, HelpOutlineOutlined, HistoryOutlined, Home, LibraryMusicOutlined, LiveTvOutlined, MovieOutlined, SettingsBrightnessOutlined, SettingsOutlined, SportsBasketballOutlined, SportsEsportsOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Container = styled.div`
    flex: 1;
    display: flex;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    height: 100vh;
    font-size: 12px;
    position: sticky;
    top: 0;
`;

const Wrapper = styled.div`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 18px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 8px 0px;
    cursor: pointer;
    height: 8px;

    &:hover{
        background-color: ${({ theme }) => theme.soft};
    }
`;

const Hr = styled.hr`
  margin: 12px 0px;
  border: 0.1px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
    font-size: 12px;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;


const Menu = ({darkMode, setDarkMode}) => {

    const {currentUser} = useSelector(state=>state.user)

  return (
    <Container>
        <Wrapper>
        <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <Logo>
                <Img src={logo} alt="logo" />
                MineTube
            </Logo>
        </Link>
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                <Item>
                    <Home/>
                    Home
                </Item>
            </Link> 
            
            <Link to="/trends" style={{textDecoration:"none", color:"inherit"}}>
                <Item>
                    <ExploreOutlined/>
                    Explore
                </Item>
            </Link>
            <Link to="/subscriptions" style={{textDecoration:"none", color:"inherit"}}>
                <Item>
                    <SubscriptionsOutlined/>
                    Subscription
                </Item>
            </Link>
            
            <Hr/>
            <Item>
                <VideoLibraryOutlined/>
                Library
            </Item>
            <Item>
                <HistoryOutlined/>
                History
            </Item>
            <Hr/>
            { !currentUser && 
            <>
            <Login>
                Sign in for more
                <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>
                <Button>
                <AccountCircleOutlined/>
                Log In
                </Button>
                </Link>
            </Login>
            <Hr/>
            </>}
            <Title>
            BEST OF MINETUBE
            </Title>
            <Item>
                <LibraryMusicOutlined/>
                Music
            </Item>
            <Item>
                <SportsBasketballOutlined/>
                Sport
            </Item>
            <Item>
                <SportsEsportsOutlined/>
                Gaming
            </Item>
            <Item>
                <MovieOutlined/>
                Movies
            </Item>
            <Item>
                <ArticleOutlined/>
                News
            </Item>
            <Item>
                <LiveTvOutlined/>
                Live
            </Item>
            <Hr/>
            <Item>
                <SettingsOutlined/>
                Setting
            </Item>
            <Item>
                <FlagOutlined/>
                Report
            </Item>
            <Item>
                <HelpOutlineOutlined/>
                Help
            </Item>
            <Item onClick={() => setDarkMode(!darkMode)}>
                <SettingsBrightnessOutlined/>
                {darkMode ? "Light" : "Dark"} Mode
            </Item>
       
        </Wrapper>
    </Container>
  )
}

export default Menu
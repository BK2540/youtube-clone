import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Upload from './Upload';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.bgLighter};
    height: 56px;

`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    position: relative;
`;

const Search = styled.div`
    width: 40%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
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

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color:${({theme}) => theme.text};
    cursor: pointer;
`;

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`;



const Navbar = () => {

    const [open, setOpen] = useState(false)

    const {currentUser} = useSelector(state=>state.user)

  return (
    <>
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder='Search' />
                <SearchOutlined/>
            </Search>
            {currentUser 
            ? (
                <User>
                    <VideoCallOutlined onClick={()=> setOpen(true)}/>
                    <Avatar src={currentUser.img}/>
                    {currentUser.name}
                </User>
            ) 
            : <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>
            <Button>
            <AccountCircleOutlined/>
                Log In
            </Button>
            </Link>}
        
        </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  )
}

export default Navbar
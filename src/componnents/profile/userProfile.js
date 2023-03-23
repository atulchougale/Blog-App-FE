import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Grid, Pagination, Button, styled } from '@mui/material';


import { API } from '../../service/api';
import Post from '../home/post/Post';
import { DataContext } from '../../context/DataProvider';


const StyledButton = styled(Button)`
    margin: 20px;
    width: 65%;
    background: #EF26C7;
    color: #fff;
    text-decoration: none;
    box-shadow: 0 0 20px cyan;
    
`;

const POSTS_PER_PAGE = 4;

const Profile = () => {

    const [userProfile, setUserProfile] = useState(null);
    const [page, setPage] = useState(1);
    const [followId, setFollowId] = useState("");
    const { id } = useParams();
    const { account, setAccount } = useContext(DataContext);
    const [showfollow, setShowfollow] = useState(account ? !account.following.includes(id) : true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.otherUsers(id);
                if (response.isSuccess) {
                    setUserProfile(response.data)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        setFollowId(id);
    }, [id]);


    const followUser = async () => {
        try {
            const response = await API.follow({ followId });
            setAccount({ ...account, followers: response.data.followers, following: response.data.following });
            setUserProfile((prevstate) => {
                return {
                    ...prevstate,
                    user: {
                        ...prevstate.user,
                        followers: [...prevstate.user.followers, response.data._id]
                    }
                }
            })
            setShowfollow(false)
        } catch (error) {
            console.error(error);

        }
    };

    const unfollowUser = async () => {
        try {
            const response = await API.unfollow({ followId });
            setAccount({ ...account, followers: response.data.followers, following: response.data.following });
            setUserProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item !== response.data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: newFollower
                    }
                }
            })
            setShowfollow(true)

        } catch (error) {
            console.error(error);

        }
    };

    const getPaginatedPosts = () => {
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return userProfile.posts.slice(startIndex, endIndex);
    };


    return (
        <>
            {
                userProfile ?
                    <Box style={{ maxWidth: "700px", margin: "10px auto" }}>
                        <Box style={{
                            margin: "18px 0px",
                            borderBottom: "1px solid grey"
                        }}>
                            <Box style={{
                                display: "flex",
                                justifyContent: "space-around",

                            }}>
                                <Box>
                                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                        src={userProfile.user.pic} alt="profile pictures"
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="h4" gutterBottom>{userProfile.user.username}</Typography>
                                    <Typography variant="h5" gutterBottom>{userProfile.user.name}</Typography>
                                    <Box style={{ display: "flex", justifyContent: "space-between", width: "120%" }}>
                                        <Typography variant="h5" gutterBottom>{userProfile.posts.length} posts</Typography>
                                        <Typography variant="h5" gutterBottom> {userProfile.user.followers.length} followers</Typography>
                                        <Typography variant="h5" gutterBottom>{userProfile.user.following.length} following</Typography>
                                    </Box>

                                    {
                                        showfollow ?
                                            <StyledButton variant="contained" onClick={followUser}>follow</StyledButton>
                                            :
                                            <StyledButton variant="contained" onClick={unfollowUser}>unfollow</StyledButton>
                                    }
                                </Box>
                            </Box>
                        </Box>
                        {getPaginatedPosts().length > 0 ? (
                            <>
                                <Grid container spacing={2}>
                                    {getPaginatedPosts().map((post) => (
                                        <Grid item lg={4} sm={6} xs={12} key={post._id}>
                                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/details/${post._id}`}>
                                                <Post post={post} />
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box display="flex" justifyContent="center" alignItems={'center'} marginTop={4}>
                                    <Pagination
                                        count={Math.ceil(userProfile.posts.length / POSTS_PER_PAGE)}
                                        page={page}
                                        onChange={(event, value) => setPage(value)}
                                    />
                                </Box>
                            </>
                        ) : (
                            <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                                No data is available for selected category
                            </Box>
                        )}
                        <Box>
                        </Box>
                    </Box> :
                    <Typography variant="h2" gutterBottom>Loading...!</Typography>
            }
        </>
    )
}
export default Profile
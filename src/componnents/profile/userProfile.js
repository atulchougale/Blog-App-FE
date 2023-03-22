import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
import {  Typography, Box, Grid, Pagination } from '@mui/material';


import { API } from '../../service/api';
import Post from '../home/post/Post';

const POSTS_PER_PAGE = 4;

const Profile = () => {
  
    const [userProfile, setUserProfile] = useState(null);
    const [page, setPage] = useState(1);
    const {id} = useParams();
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.otherUsers(id);
                if (response.isSuccess) {
                    // console.log(response.data);
                    setUserProfile(response.data)

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

// console.log(userProfile.user)

    const getPaginatedPosts = () => {
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return userProfile.posts.slice(startIndex, endIndex);
    };




    return (
      <>
        {
          userProfile? 
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
                            src={userProfile.user.pic} alt="profile picture"
                        />

                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>{userProfile.user.username}</Typography>
                        <Typography variant="h5" gutterBottom>{userProfile.user.name}</Typography>
                        <Box style={{ display: "flex", justifyContent: "space-between", width: "120%" }}>
                            <Typography variant="h5" gutterBottom>{userProfile.posts.length} posts</Typography>
                            <Typography variant="h5" gutterBottom> {userProfile.user.followers} followers</Typography>
                            <Typography variant="h5" gutterBottom>{userProfile.user.following} following</Typography>
                        </Box>

                    </Box>
                </Box>

            </Box>



            {/* <Grid container spacing={2}> */}

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

            {/*  </Grid> */}



            <Box>

            </Box>


        </Box>:
        <Typography variant="h2" gutterBottom>Loading...!</Typography>

        }
      </>
        
    )
}


export default Profile
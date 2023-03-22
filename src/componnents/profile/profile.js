import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Link } from 'react-router-dom';
import { Button, Typography, Box, Grid, Pagination } from '@mui/material';


import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import Post from '../home/post/Post';

const POSTS_PER_PAGE = 4;

const Profile = () => {
    const { account, setAccount } = useContext(DataContext);
    // console.log(account)
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)



    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.myPosts();
                if (response.isSuccess) {
                    console.log(response.data);
                    setPosts(response.data)

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => {
            if (image) {

                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "blog-app")
                data.append("cloud_name", "atul07")

                fetch("https://api.cloudinary.com/v1_1/atul07/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)

                        setUrl(data.url)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }

        getImage();

    }, [image])

    const getPaginatedPosts = () => {
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return posts.slice(startIndex, endIndex);
    };



    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async (e) => {
        let response = await API.updateProfilePic({ pic: url })
        if (response.isSuccess) {
            setAccount({ ...account, pic: url })
            // console.log(response.data)
            toast.success(' Profile picture is updated 🥰 !')

        }
    }

    return (
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
                            src={account.pic} alt="profile picture"
                        />

                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>{account.username}</Typography>
                        <Typography variant="h5" gutterBottom></Typography>
                        <Box style={{ display: "flex", justifyContent: "space-between", width: "120%" }}>
                            <Typography variant="h5" gutterBottom > {posts.length} posts</Typography>
                            <Typography variant="h5" gutterBottom> followers</Typography>
                            <Typography variant="h5" gutterBottom>following</Typography>
                        </Box>

                    </Box>
                </Box>

                <Box style={{ margin: "10px" }}>
                    <Box >
                        <label htmlFor="fileInput">
                            <AddPhotoAlternateIcon fontSize="large" color="action" />Update pic
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <Button onClick={handleImageUpload}>Upload</Button>
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
                            count={Math.ceil(posts.length / POSTS_PER_PAGE)}
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

            {/* </Grid> */}



            <Box>

            </Box>


        </Box>
    )
}


export default Profile
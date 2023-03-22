import { Grid, Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

//components

import Post from './Post';
import { API } from '../../../service/api';

const POSTS_PER_PAGE = 6;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [category]);



    const getPaginatedPosts = () => {
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return posts.slice(startIndex, endIndex);
    };

    return (
        <>
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
        </>
    );
};

export default Posts;


import { styled, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { API } from '../../../service/api';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color:#98FB98;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 380px;
    & > img, & > p {
        padding: 0 3px 3px 3px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150,

});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    background-color: -internal-light-dark(rgb(232, 240, 254), rgba(70, 90, 126, 0.4)) !important;
    overflow: auto;
    margin-top:0;
    word-break: break-word;
`;

const Likes = styled(Box)`
display:flex !important;
justify-content:space-between;
& h5{
    margin-right : 10px;
    padding-left : 10px;
}
`

const Post = ({ post }) => {

    const [totalComments, setTotalComments] = useState();
    const url = post.picture ? post.picture : 'https://thumbs.dreamstime.com/b/blog-18609326.jpg';

    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }


    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setTotalComments(response.data.length);
                // setComments(response.data);
            }
        }
        getData();
    }, [post])

    return (

        <Container >

            <Image src={url} alt="post" />
            <Likes >
                <h5>{post.likes.length} likes</h5>
                <h5>{post.viewCount} Views</h5>
                <h5>{totalComments} Comments</h5>

            </Likes>

            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details dangerouslySetInnerHTML={{ __html: post.description.substring(0, 70) + "..." }}></Details>

        </Container>
    )
}

export default Post;
import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { toast } from 'react-toastify';
import { Delete, Edit, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


// components
import Comments from './comments/Comments';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'contain'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break : break-word ;
`;

const Likes = styled(Box)`
display:flex !important;
justify-content:space-around;
& h5{
    
    margin-right : 25px;
    padding-left : 30px;
   
}
`

const Author = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    fontSize: '14px',
    color: '#878787',
    padding: '15px 0 15px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Description = styled(Typography)`
    word-break : break-word ;
    
`

const DetailView = () => {

    const [post, setPost] = useState({});
    const [totalComments, setTotalComments] = useState();
    const [totalLikes, setTotalLikes] = useState()
    const [toggle, setToggle] = useState(false)
    const [postedBy, setPostedBy] = useState()

    const { id } = useParams();

    const { account } = useContext(DataContext);

    const navigate = useNavigate();

    const userId = sessionStorage.getItem('userId');

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
                setTotalLikes(response.data.likes.length)
                setPostedBy(response.data.postedBy._id)
            }
        }
        fetchData();
    }, [id, toggle])


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setTotalComments(response.data.length);
                }
            } catch (error) {
                console.error('Error in getData:', error);
            }
        };
        getData();
    }, [post._id]);


    const deleteBlog = async () => {
        let response = await API.deletePost(post._id);
        if (response.isSuccess) {
            toast.success('Blog Deleting Successful 😔 !')
            navigate('/');
        }
    }

    const likePost = async (id) => {

        let response = await API.like(post)
        if (response.isSuccess) {

            setTotalLikes(response.data.likes.length)
            setPost(response.data)
            toast.success(' Your Like this Post 🥰 !')
            setToggle(prevState => !prevState);
        }
    }

    const unlikePost = async (id) => {

        let response = await API.unlike(post);
        if (response.isSuccess) {
            toast.success(' Your Unlike this Post 👎 !')
            setTotalLikes(response.data.likes.length)
            setPost(response.data)
            setToggle(prevState => !prevState);

        }
    }


    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ marginTop: "10px" }} >
                {Array.isArray(post.likes) && post.likes.includes(userId) ? (
                    <Favorite style={{ color: "#FAA0A0", fontSize: "40px" }} onClick={() => unlikePost(post._id)} />
                ) : (
                    <FavoriteBorder style={{ fontSize: "40px" }} onClick={() => likePost(post._id)} />
                )}

            </Box>
            <Likes >
                <h4>{totalLikes} likes</h4>
                <h4>{post.viewCount} Views</h4>
                <h4>{totalComments} Comments</h4>

            </Likes>

            <Box style={{ float: 'right' }}>

                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }

            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={postedBy !== account.id ? "/profile/" + postedBy : "/profile"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Box style={{ backgroundColor: '#E7E9EB', padding: '5px', border: '1px solid #878787', borderRadius: '10px', dispaly: "flex", justifyContent: "center" }}>
                <Description dangerouslySetInnerHTML={{ __html: post.description }}></Description>

            </Box>

            <Comments post={post} />
        </Container>
    )
}

export default DetailView;
import { useState, useEffect, useContext } from 'react';
import { Box, Button, styled } from '@mui/material';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//components
import Comment from './Comment';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';


const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote", 'code-block'],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],

        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: '+1' },
        ],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }],

        [{ 'align': [] }],

        ['clean'],
        [{ 'direction': 'rtl' }],
        ["link", "image", "video"],
    ],
}





const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});


const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',

}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false)
    const { account } = useContext(DataContext)

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                // console.log(response)
                setComments(response.data);

            }
        }
        getData();
    }, [post, toggle])



    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e,
        })
    }

    const addComment = async (e) => {
        let response = await API.newComment(comment);
        if (response.isSuccess) {
            setComment(initialValue);
            toast.success('Comment  Add Successfull 😉 !')
        }
        setToggle(prevState => !prevState);
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <ReactQuill style={{
                    height: "50px !important",
                    width: "100 %",
                    margin: "0px 20px 60px 20px",

                }}
                    theme="snow"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                    modules={modules}

                    placeholder="what's on your mind?"
                />

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Comment</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }


            </Box>
        </Box>
    )
}

export default Comments;
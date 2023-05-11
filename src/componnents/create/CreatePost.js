import { useNavigate, useLocation } from 'react-router-dom';
import { styled, Box, Button, InputBase, FormControl } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';



import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';



const modules = {
   
    toolbar: {
        container: [
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
            ['emoji'],
            [{ 'align': [] }],
            ['clean'],
            [{ 'direction': 'rtl' }],
            ["link", "image", "video"],
        ],
    }
    
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
    "emoji"
  ];



const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'contain '
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
    border:2px solid black;
`;


const Editor = styled(Box)`
    margin-top : 30px;
`

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [picture, setPicture] = useState('');
    const { account } = useContext(DataContext);

    const url = picture ? picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {

                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "blog-app")
                data.append("cloud_name", "atul07")

                fetch("https://api.cloudinary.com/v1_1/atul07/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(res => res.json())
                    .then(data => {
                        setPicture(data.url);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        getImage();
        setPost(prevPost => ({ ...prevPost, categories: location.search?.split('=')[1] || 'All' }));
        setPost(prevPost => ({ ...prevPost, username: account.username }));
    }, [file, location.search, account.username])


    const savePost = async () => {
        post.picture = picture;
        let response = await API.createPost(post);
        if (response.isSuccess) {
            toast.success('Blog is Created Successfull 😘')
            navigate('/');
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const contentFieldChanaged = (data) => {

        setPost({ ...post, 'description': data })
    }

    return (
        <Container>
            <h1>Whats going in your mind ?</h1>
            <Image src={url} alt="post Image" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddPhotoAlternateIcon fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">PUBLISH</Button>
            </StyledFormControl>
            <Editor>
                <ReactQuill
                    style={{
                        height: "100px !important",
                        width: "100 %",
                        margin: "0px 20px 60px 20px"
                    }}
                    theme="snow"
                    value={post.description}
                    onChange={(newContent) => contentFieldChanaged(newContent)}
                    modules={modules}
                    formats={formats}
                    placeholder="Tell Your Story..."
                />
            </Editor>
        </Container>
    )
}

export default CreatePost;
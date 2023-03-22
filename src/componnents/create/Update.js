import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { styled, Box, InputBase, FormControl,Button } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    [      { list: 'ordered' },      { list: 'bullet' },      { indent: '-1' },      { indent: '+1' },    ],
    [{ script: 'sub' }, { script: 'super' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
    [{ direction: 'rtl' }],
    ['link', 'image', 'video'],
  ],
};

const Editor = styled(Box)`
  margin-top: 30px;
`;

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
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
  border: 2px solid black;
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};


const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    console.log(post.title);
    const [file, setFile] = useState('');
    const [picture, setPicture] = useState('');
    const { id } = useParams();

    const { account } = useContext(DataContext);

    const url = picture ? picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id ])

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "blog-app");
                data.append("cloud_name", "atul07");

                fetch("https://api.cloudinary.com/v1_1/atul07/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(res => res.json())
                    .then(data => {
                        setPicture(data.url);
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file,location.search,account.username])

    const updateBlogPost = async () => {
        post.picture = picture;
        let response = await API.updatePost(post);
        if (response.isSuccess) {
            toast.success('Blog Update Successfully 😉!')
            navigate(`/details/${id}`);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const contentFieldChanaged = (data) => {
        setPost({ ...post, 'description': data })
    }

    return (
        <Container>
            <h1>What's going on in your mind?</h1>
            <Image src={url} alt="post" />

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
                <InputTextField onChange={(e) => handleChange(e)} name='title' value={post.title} placeholder="Title" />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">UPDATE</Button>
            </StyledFormControl>

            <Editor>
                <ReactQuill
                    value={post.description}
                    onChange={contentFieldChanaged}
                    placeholder="Write something amazing..."
                    modules={modules}

                />
            </Editor>
        </Container>
    )

}
export default Update;
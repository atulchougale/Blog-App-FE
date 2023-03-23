import { TextField, Box, Button, Typography, styled } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    width: 450px;
    margin: auto;
    border-radius :10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Image = styled('img')({
    width: '400px',
    display: 'flex',
    margin: 'auto',
    padding: '25px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 25px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 15px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #36D6EF;
    color: #fff;
    height: 40px;
    border-radius: 5px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #CC4AE6;
    height: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    pic: ''
};




const Login = ({ isUserAuthenticated }) => {

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    const [account, toggleAccount] = useState('login');
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const imageURL = 'https://macln.files.wordpress.com/2011/01/blog_logo.jpg'

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }


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
                        console.log(data)
                        setUrl(data.url);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }

        getImage();

    }, [image])


    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        signup.pic = url;
        let response = await API.userSingup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toast.success('Registor Successful !')
            toggleAccount('login')
        } else {
            setError('something went wrong! please try again later')
        }
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        try {
            if (response.isSuccess) {
                setError('');
                // console.log(response.data)
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refresToken', `Bearer ${response.data.refresToken}`);
                sessionStorage.setItem('userId', response.data.id);

                setAccount({ username: response.data.username, name: response.data.name, id: response.data.id, pic: response.data.pic });

                isUserAuthenticated(true)
                toast.success('Login Successful !')

                navigate('/');
            } else {
                setError('Something went wrong! please try again later')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Component>
            <Box>

                <Image src={imageURL} alt="blog" />
                {

                    //login page

                    account === 'login' ?
                        <Wrapper>

                            <Typography mt={2} variant="h3" component="h3" style={{ textAlign: 'center', color: '#4CE91C' }}>
                                Login
                            </Typography>

                            <TextField variant="outlined" value={login.email} onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            <TextField variant="outlined" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper>
                        :

                        //register page 
                        <Wrapper>
                            <Typography mt={2} variant="h3" component="h3" style={{ textAlign: 'center', color: '#4CE91C' }}>
                                Register
                            </Typography>

                            <TextField variant="outlined" value={signup.name} onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="outlined" value={signup.username} onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant='outlined' value={signup.email} onChange={(e) => onInputChange(e)} name='email' label='Enater Email' />
                            <TextField variant="outlined" value={signup.password} onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <label htmlFor="fileInput">
                                <AddPhotoAlternateIcon fontSize="large" color="action" />Upload pic
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login


import { AppBar, Toolbar, styled, Button, Typography, } from '@mui/material';
import { red} from '@mui/material/colors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';


const Component = styled(AppBar)`
    background: #000;
    color: #F0FFFF;
 
`;

const Container = styled(Toolbar)`
    justify-content: space-between ;
    & > a {
        padding: 15px;
        color: #F0FFFF;
        text-decoration: none;
    }
`;

const Logo = styled(Typography)`
    background-image: linear-gradient(to bottom right, red, yellow);
    margin-top:10px;
    display:flex;
    justify-content :right;
`
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  }));

const Header = () => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
          await API.logout();
          sessionStorage.clear();
          navigate('/account');
          toast.success('Logout successful!');
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <Component>

            <Container>
                <Container>
                    <Logo variant="h5" gutterBottom>
                        &nbsp; 𝕄𝕐 🅱🅻🅾🅶 &nbsp;
                    </Logo>
                </Container>

                <Container>
                    <Link to='/'>HOME</Link>
                    <Link to='/about'>ABOUT</Link>
                    <Link to='/contact'>CONTACT</Link>

                </Container>

                <Container>

                    <Link to='/profile'>PROFILE</Link>
                    
                    <ColorButton variant="outlined" color="error" onClick={logout}>
                    LOGOUT
                    </ColorButton>
                </Container>

            </Container>
        </Component>


    )
}

export default Header;
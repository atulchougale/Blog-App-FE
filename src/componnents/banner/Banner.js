
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://i.pinimg.com/736x/a5/71/29/a57129d510be1af36e0754b3c72ea01f.jpg) center/100% repeat-x #000 ;
    background-repeat: no-repeat;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    ${'' /* color: #B4F718; */}
    background-image: linear-gradient(to bottom right, red, yellow);
    line-height: 1
    
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    font-weight:bold;
    background: #76F0CC;
    margin-top :10px;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>&nbsp; 𝕄𝕐 🅱🅻🅾🅶 &nbsp;</Heading>
            <SubHeading>Write Your Thought And Create Your Blog</SubHeading>
        </Image>
    )
}

export default Banner;
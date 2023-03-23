
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { DataContext } from "../../../context/DataProvider";
import { useContext } from "react";
import { API } from "../../../service/api";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name1 = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext);

    const removeComment = async () => {
        let response = await API.deleteComment(comment._id);
        if (response.isSuccess) {
            toast.success('Dlete Commemt Successfully 😔 !')
            setToggle(prevState => !prevState);

        }
    }

    return (
        <Component>
            <Container>
                <Name1>{comment.name}</Name1>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />}
            </Container>
            <Typography dangerouslySetInnerHTML={{ __html: comment.comments }}></Typography>
        </Component>
    )
}

export default Comment;
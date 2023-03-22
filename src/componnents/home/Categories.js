
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    background-color: LemonChiffon;
    border: 1.5px solid black;
    border-radius: 10px;
    overflow: hidden;
    tr:nth-of-type(even) {
  background-color: #D6EEEE;
};
th{
    background-color: #D6EEEE
}
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #EF26C7;
    color: #fff;
    text-decoration: none;
    box-shadow: 0 0 20px cyan;
    
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #664B00;
    font-size:20px;

    
`;



const Categories = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            <Box style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <StyledTable>
                <TableHead style={{border: '1.5px solid black',borderRadius:'10px'}}>
                    <TableRow>
                        <TableCell style={{border: '1.5px solid black',backgroundColor:'#D6EEEE'}}>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{border: '1.5px solid black'}}>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell style={{border: '1.5px solid black'}} >
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }


                </TableBody>
            </StyledTable>
            </Box>
            
        </>
    )
}

export default Categories;
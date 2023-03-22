
import { Grid, Box, Typography, styled } from '@mui/material';

import { useSearchParams } from 'react-router-dom';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';


const CatHead = styled(Box)`
text-align :center;
mragin-top: 40px ;
margin-bottom :20px ;
${'' /* color :#0000ff; */}
padding-top:20px;
${'' /* color: white; */}
text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
font: 100 3em sans-serif;
  color: gold;
  text-decoration: underline;
  text-decoration-color: yellowgreen;

`


const Home = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    // console.log(category)

   

   

    return (
        <>
            <Banner />
            <CatHead>
                <Typography variant='h3' > {category ? category : 'All'}</Typography>
            </CatHead>
            <Grid container style={{padding:"15px"}}>
                <Grid item lg={2} xs={10} sm={2}>
                    <Categories />
                </Grid>

                <Grid container item xs={12} sm={10} lg={10} style={{padding:"15px", }} >
                    <Posts  />
                </Grid>

            </Grid>
        </>
    )
}

export default Home;
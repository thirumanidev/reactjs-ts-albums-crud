import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link, useParams  } from 'react-router-dom';
import MyContext from './MyContext';
import Button from '@material-ui/core/Button';

interface IAlbum {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
interface IParams {
    id: string;
}
export const Album = () => {
    const context = useContext(MyContext);
    
    let allAlbumsShow:IAlbum[] = [];
    const params:IParams = useParams();
    // let i = 0;
    context.albums.map(x=> {
        if(parseInt(params.id.toString()) == x.albumId) {
            allAlbumsShow.push(x);
        }
        // i++;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage, setAlbumsPerPage] = useState(10);

    let indexOfLastAlbum = 0;
    let indexOfFirstAlbum = 0;
    let currentAlbums: IAlbum[] = [];
    // let cp: number =1;
    const allAlbums:IAlbum[] = [];
    // const [currentAlbums, setCurrentAlbums]: [IAlbum[], (albums: IAlbum[]) => void] = useState(allAlbums);
    indexOfLastAlbum = currentPage * albumsPerPage;
    // indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    let eoPage: boolean = true;
    currentAlbums = allAlbumsShow.slice(0, indexOfLastAlbum);
    function MyPagination(cp: number) {
        console.log("context.albums.length: "+context.albums.length)
        console.log("cp: "+cp);
        if(allAlbumsShow.length == cp) {
            eoPage= false;
        }
        if(allAlbumsShow.length >= cp) {
            setCurrentPage(cp);    
        }
        
        // cp++;
        // console.log("indexOfLastAlbum: "+indexOfLastAlbum)
        // console.log("indexOfFirstAlbum: "+indexOfFirstAlbum)
        // console.log("cp: "+cp)
    }
    // MyPagination();
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        
        icon: {
          color: 'rgba(255, 255, 255, 0.54)',
        },
        gridItem: {
            height: 260
        },
        media: {
          height: 140,
        },
        noTextDecoration: {
            textDecoration: 'none',
        },
        cardTitle: {
            textAlign: 'left',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            WebkitLineClamp: 2,
            maxHeight: '3rem',
            textTransform: 'capitalize',
            fontSize: '1.2rem',
            lineHeight: '1.5rem',
            textDecoration: 'none',
            color: '#333'
        },
        h100: {
            height: '100%'
        },
        textRight: {
            textAlign: 'right',
            marginTop: 25
        }
      }));
    const classes = useStyles();
    return (
            
        <Container>
            
            <GridList cellHeight={30}>
                <h1>Albums ({currentAlbums.length})</h1>
            </GridList>
            <Grid container spacing={3}>
                {currentAlbums.map((album: IAlbum) => (
                    <Grid item xs={12} lg={4} md={6} key={album.id} className={classes.gridItem}>
                        <Card className={classes.h100}>
                            <div className={classes.noTextDecoration}>
                                <CardMedia
                                className={classes.media}
                                image={album.thumbnailUrl}
                                title={album.title}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                    {album.title}
                                </Typography>
                                
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.textRight}>
            <Button variant="contained" color="secondary" onClick={()=> MyPagination(currentPage+1)}>
            More
            </Button>
            </div>
        </Container>
    )
}

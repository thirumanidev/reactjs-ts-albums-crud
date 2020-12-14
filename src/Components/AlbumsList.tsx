import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link  } from 'react-router-dom';
import MyContext from './MyContext';

interface IAlbum {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  

export const AlbumsList = () => {
    const context = useContext(MyContext);
    const allAlbums:IAlbum[] = [];
  const allAlbumsShow:IAlbum[] = [];
  let allAlbumsShowIds: Number[] = [];
  let allAlbumsShowTemp: IAlbum[] = [];
  const [albums, setAlbums]: [IAlbum[], (albums: IAlbum[]) => void] = useState(allAlbums);
  const [albumsShow, setAlbumsShow]: [IAlbum[], (albumsShow: IAlbum[]) => void] = useState(allAlbumsShow);
  useEffect(() => {
    // const fetchData = async () => {
    axios.get<IAlbum[]>("https://jsonplaceholder.typicode.com/photos")
         .then(res => {
            setAlbums(res.data)
            context.setAlbums(res.data);
            context.albums=res.data;
            res.data.forEach(x=> {
                if(!allAlbumsShowIds.includes(x.albumId)) {
                    allAlbumsShowTemp.push(x);
                    allAlbumsShowIds.push(x.albumId);
                    
                    // console.log("WWWWWWWWWWWWW"+ (x.albumId%2));
                    if(x.albumId%2 == 0){
                        // console.log("XXXXX: "+x.albumId);
                        
                    }
                }
            })
            setAlbumsShow(allAlbumsShowTemp);

            console.log(allAlbumsShowIds);
        });
    //   }
  }, []);
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKk")
    console.log(albumsShow)

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
        }
      }));
    const classes = useStyles();
    
    return (
        <MyContext.Provider value={{albums: albums, setAlbums: setAlbums}}>
      <div className={classes.root}>
          <Container>
            <GridList cellHeight={30}>
                {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto', fontSize: 20 }}>
                    <ListSubheader component="div"></ListSubheader>
                </GridListTile> */}
                <h1>Galleries ({albumsShow.length})</h1>
            </GridList>
            <Grid container spacing={3}>
                {albumsShow.map((album: IAlbum) => (
                    <Grid item xs={12} lg={4} md={6} key={album.id} className={classes.gridItem}>
                        <Card className={classes.h100}>
                            <Link to={'album/'+album.albumId} className={classes.noTextDecoration}>
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
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
     </div>
     </MyContext.Provider>
    )
}

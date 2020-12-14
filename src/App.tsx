import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import {AlbumsList} from './Components/AlbumsList';
import {Album} from './Components/Album';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import MyContext from './Components/MyContext';

function App() {
  interface IAlbum {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  
  return (
    <>
 
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" >
            <AlbumsList/>
          </Route>
     
          <Route path="/album/:id" component={Album} />
        </Switch>
      </Router>
     
      
    </>
  );
}

export default App;

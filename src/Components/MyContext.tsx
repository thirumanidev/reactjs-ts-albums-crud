import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore
interface IAlbum {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
interface ListAlbumsContextValue {
    albums:IAlbum[],
    setAlbums:(data:IAlbum[]) => void
}
const ListAlbums: ListAlbumsContextValue = {
    albums:[
     {albumId: 0,
        id: 0,
        title: '',
        url: '',
        thumbnailUrl: ''
     }],
     setAlbums: (data) => {}
}

const MyContext = React.createContext<ListAlbumsContextValue>(ListAlbums);

export default MyContext;
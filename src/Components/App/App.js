import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1",
          uri: "http://linkylink1",
        },
        {
          id: 2,
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2",
          uri: "http://linkylink2",
        },
        {
          id: 3,
          name: "Track 3",
          artist: "Artist 3",
          album: "Album 3",
          uri: "http://linkylink3",
        },
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        {
          id: "p1",
          name: "Playlist Track 1",
          artist: "Playlist Artist 1",
          album: "Playlist Album 1",
          uri: "http://playlistlink1",
        },
        {
          id: "p2",
          name: "Playlist Track 2",
          artist: "Playlist Artist 2",
          album: "Playlist Album 2",
          uri: "http://playlistlink2",
        },
        {
          id: "p3",
          name: "Playlist Track 3",
          artist: "Playlist Artist 3",
          album: "Playlist Album 3",
          uri: "http://playlistlink3",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    const playlist = this.state.playlistTracks;
    const inPlaylist = playlist.some(
      playlistTrack => playlistTrack.id === track.id
    )
    if (!inPlaylist){
      playlist.push(track);
      this.setState({
        playlistTracks: playlist
      })
    }
  }

  removeTrack(track) {
    const playlist = this.state.playlistTracks;

    const updatedPlaylist = playlist.filter(
      playlistTrack => playlistTrack.id !== track.id
    );

    this.setState({
      playlistTracks: updatedPlaylist,
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(
      track => track.uri
    );
    // TODO: pass trackURIs to Spotify API
    console.log(trackURIs);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} results={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} tracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
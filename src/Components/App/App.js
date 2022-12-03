import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
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
    this.search = this.search.bind(this);
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

  async search(term) {
    localStorage.setItem("searchTerm", JSON.stringify(term));
    const searchResults = await Spotify.search(term);
    if (searchResults) {
      this.setState({
        searchResults: searchResults
      });
      localStorage.removeItem("searchTerm");
    }
  }

  componentDidMount(){
    const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));
    if (searchTerm) {
      this.setState({
        searchTerm: searchTerm
      });
      this.search(searchTerm);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} defaultValue={this.state.searchTerm}/>
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
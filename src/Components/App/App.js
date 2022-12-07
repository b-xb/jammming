import React from 'react';

import {IS_LOCAL} from '../../settings';

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
      playlistTracks: [],
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

  async savePlaylist() {
    const playlistName = this.state.playlistName;
    const playlistTracks = this.state.playlistTracks;

    localStorage.setItem("callbackAction", JSON.stringify("savePlaylist"));
    localStorage.setItem("playlistName", JSON.stringify(playlistName));
    localStorage.setItem("playlistTracks", JSON.stringify(playlistTracks));

    const trackURIs = this.state.playlistTracks.map(
      track => track.uri
    );

    const success = await Spotify.savePlaylist(playlistName,trackURIs);

    if (success) {
      localStorage.removeItem("callbackAction");
      localStorage.removeItem("playlistName");
      localStorage.removeItem("playlistTracks");
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });

    }

  }

  async search(term) {
    localStorage.setItem("callbackAction", JSON.stringify("search"));
    localStorage.setItem("searchTerm", JSON.stringify(term));

    const searchResults = await Spotify.search(term);

    if (searchResults) {
      this.setState({
        searchResults: searchResults
      });
      localStorage.removeItem("searchTerm");
      localStorage.removeItem("callbackAction");
    }
  }

  componentDidMount(){

    if (!IS_LOCAL && window.location.protocol !== "https:") {
      window.location.protocol = "https:";
      return;
    }

    //check if in the middle of performing a form action when callback is returned
    const callbackAction = JSON.parse(localStorage.getItem("callbackAction"));

    //if in the middle of an action carry on
    switch (callbackAction){

      case 'search':
        const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));
        if (searchTerm) {
          this.setState({
            searchTerm: searchTerm
          });
          this.search(searchTerm);
        }
        break;

      case 'savePlaylist':
        const playlistName = JSON.parse(localStorage.getItem("playlistName"));
        const playlistTracks = JSON.parse(localStorage.getItem("playlistTracks"));
        if (playlistName && playlistTracks) {
          this.setState({
            playlistName: playlistName,
            playlistTracks: playlistTracks,
          });
          this.savePlaylist();
        }
        break;

      default:
        break;
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
            <Playlist playlistName={this.state.playlistName} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} tracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
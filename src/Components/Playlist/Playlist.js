import React from 'react';

import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.playlistName} />
        <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.tracks}/>
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
};

export default Playlist;





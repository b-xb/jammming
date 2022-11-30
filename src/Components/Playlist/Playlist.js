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
        <input onChange={this.handleNameChange} placeholder={'New Playlist'} default={'New Playlist'}/>
        <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.tracks}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
};

export default Playlist;





import React from 'react';

import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {

    const tracks = this.props.tracks ?? [];

    const trackItems = tracks.map(track =>
      <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} key={track.id} trackDetails={track} isRemoval={this.props.isRemoval}/>
    );

    return (
      <div className="TrackList">
        {trackItems}
      </div>
    );
  }
};

export default TrackList;




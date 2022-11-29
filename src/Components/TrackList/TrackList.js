import React from 'react';

import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {

    const tracks = this.props.tracks ?? [{
      id:0,
    }];

    const trackItems = tracks.map(track =>
      <Track key={track.id} trackDetails={track}/>
    );

    return (
      <div className="TrackList">
        {trackItems}
      </div>
    );
  }
};

export default TrackList;




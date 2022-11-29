import React from 'react';

import './Track.css';

class Track extends React.Component {
  renderAction(isRemoval=false) {
    return (
      <button className="Track-action" type="button">
        { isRemoval ? '-' : '+'}
      </button>
    );
  }

  render() {
    const details = this.props.trackDetails ?? {};
    const name = details.name ?? 'Track Name';
    const artist = details.artist ?? 'Track Artist';
    const album = details.album ?? 'Track Album';

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>
        
      </div>
    );
  }
};

export default Track;




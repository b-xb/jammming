import React from 'react';

import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    if (this.props.onAdd) {
      this.props.onAdd(this.props.trackDetails);
    }
  }

  removeTrack() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.trackDetails);
    }
  }

  renderAction(isRemoval=false) {
    return (
      <button onClick={isRemoval ? this.removeTrack : this.addTrack} className="Track-action" type="button">
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
        { this.renderAction(this.props.isRemoval) }
      </div>
    );
  }
};

export default Track;




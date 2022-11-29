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
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{'Track Name'}</h3>
          <p>{'Track Artist'} | {'Track Album'}</p>
        </div>
        
      </div>
    );
  }
};

export default Track;




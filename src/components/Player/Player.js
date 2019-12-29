import React from 'react';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;

    return (
      <div className="Player col-3">
        <div className="card">
        <img src={player.imageUrl} className="card-img-top boardImg" alt={player.name} />
          <div className="card-body">
            <h5 className="card-title">{player.name}</h5>
            <p className="card-text">{player.position}</p>
            <button className="btn btn-light">View Player</button>
            <button className="btn btn-light">Edit Player</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

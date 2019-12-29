import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func,
    setEditMode: PropTypes.func,
    setPlayerToEdit: PropTypes.func,
  }

  deletePlayerEvent = (event) => {
    event.preventDefault();
    const { player, deletePlayer } = this.props;
    deletePlayer(player.id);
  }

  setEditMode = (event) => {
    const { player, setPlayerToEdit, setEditMode } = this.props;
    event.preventDefault();

    setEditMode(true);
    setPlayerToEdit(player);
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
            <div className="button-container">
              <button className="btn btn-light" onClick={this.setEditMode}>Edit Player</button>
              <button className="btn btn-light" onClick={this.deletePlayerEvent}>Delete Player</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

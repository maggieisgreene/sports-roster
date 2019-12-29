import React from 'react';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

import './Team.scss';

class Team extends React.Component {
  state = {
    players: [],
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers = () => {
    playerData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
      })
      .catch((errFromGetPlayers) => console.error(errFromGetPlayers));
  }

  deletePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => {
        this.getPlayers();
      })
      .catch((errFromDeletePlayer) => console.error(errFromDeletePlayer));
  }

  savePlayer = (newPlayer) => {
    playerData.savePlayer(newPlayer)
      .then(() => {
        this.getPlayers();
      })
      .catch((errFromSavePlayer) => console.error(errFromSavePlayer));
  }

  updatePlayer = (playerId, updatedPlayer) => {
    playerData.updatePlayer(playerId, updatedPlayer)
      .then()
      .catch((errFromUpdatePlayer) => console.error(errFromUpdatePlayer));
  }

  render() {
    return (
      <div className="Team">
        <div className="team-header">
          <h2>Your Team</h2>
          <button className="btn btn-light">Add New Player</button>
        </div>
          { <PlayerForm savePlayer={this.savePlayer} /> }
        <div className="actual-players">
          { this.state.players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} />) }
        </div>
      </div>
    );
  }
}

export default Team;

import React from 'react';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

import './Team.scss';

class Team extends React.Component {
  state = {
    players: [],
    playerToEdit: {},
    editMode: false,
    showPlayerForm: false,
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
        this.setState({ showPlayerForm: false });
      })
      .catch((errFromSavePlayer) => console.error(errFromSavePlayer));
  }

  updatePlayer = (playerId, updatedPlayer) => {
    playerData.updatePlayer(playerId, updatedPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ editMode: false, showPlayerForm: false });
      })
      .catch((errFromUpdatePlayer) => console.error(errFromUpdatePlayer));
  }

  setEditMode = (editMode) => {
    this.setState({ editMode, showPlayerForm: true });
  }

  setShowPlayerForm = () => {
    this.setState({ showPlayerForm: true });
  }

  setHidePlayerForm = () => {
    this.setState({ showPlayerForm: false, editMode: false });
  }

  setPlayerToEdit = (player) => {
    this.setState({ playerToEdit: player });
  }

  render() {
    return (
      <div className="Team">
        <div className="team-header">
          <h2>Your Team</h2>
          <button className="btn btn-light" onClick={this.setShowPlayerForm}>Add New Player</button>
        </div>
          { this.state.showPlayerForm && <PlayerForm savePlayer={this.savePlayer} updatePlayer={this.updatePlayer}
          editMode={this.state.editMode} playerToEdit={this.state.playerToEdit} setHidePlayerForm={this.setHidePlayerForm} /> }
        <div className="actual-players">
          { this.state.players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />) }
        </div>
      </div>
    );
  }
}

export default Team;

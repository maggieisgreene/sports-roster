import React from 'react';

import Player from '../Player/Player';

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

  render() {
    return (
      <div className="Team">
        <button className="btn btn-light m-3">Add New Player</button>
        <div className="actual-players">
          { this.state.players.map((player) => <Player key={player.id} player={player} />) }
        </div>
      </div>
    );
  }
}

export default Team;

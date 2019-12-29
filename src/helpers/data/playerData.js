import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayers = result.data;
      const players = [];
      if (allPlayers != null) {
        Object.keys(allPlayers).forEach((playerId) => {
          const newPlayer = allPlayers[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((error) => reject(error));
});

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

export default { getPlayersByUid, deletePlayer };

import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

class PlayerForm extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    savePlayer: PropTypes.func,
  }

  state = {
    name: '',
    position: '',
    imageUrl: '',
  }

  nameChange = (event) => {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  positionChange = (event) => {
    event.preventDefault();
    this.setState({ position: event.target.value });
  }

  imageChange = (event) => {
    event.preventDefault();
    this.setState({ imageUrl: event.target.value });
  }

  savePlayerEvent = (event) => {
    const { savePlayer } = this.props;
    event.preventDefault();

    const newPlayer = {
      name: this.state.name,
      position: this.state.position,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
    };
    savePlayer(newPlayer);
    this.setState({ name: '', position: '', imageUrl: '' });
  }

  render() {
    return (
      <form className='col-6 offset-3 BoardForm'>
        <div className="form-group">
          <label htmlFor="order-name">Player Name:</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter player name"
            value={this.state.name}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-name">Player Position:</label>
          <input
            type="text"
            className="form-control"
            id="board-description"
            placeholder="Enter player position"
            value={this.state.position}
            onChange={this.positionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image-name">Preview Image:</label>
          <input
            type="text"
            className="form-control"
            id="board-preview"
            placeholder="Enter preview image URL"
            value={this.state.imageUrl}
            onChange={this.imageChange}
          />
        </div>
        <button className="btn btn-light" onClick={this.savePlayerEvent}>Save Changes</button>
      </form>
    );
  }
}

export default PlayerForm;

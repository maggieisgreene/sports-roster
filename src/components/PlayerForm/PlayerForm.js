import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    playerToEdit: playerShape.playerShape,
    savePlayer: PropTypes.func,
    updatePlayer: PropTypes.func,
    editMode: PropTypes.bool,
    setHidePlayerForm: PropTypes.func,
  }

  state = {
    name: '',
    position: '',
    imageUrl: '',
  }

  componentDidMount() {
    const { playerToEdit, editMode } = this.props;

    if (editMode) {
      this.setState({ name: playerToEdit.name, position: playerToEdit.position, imageUrl: playerToEdit.imageUrl });
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.playerToEdit.id !== this.props.playerToEdit.id) && this.props.editMode) {
      this.setState({ name: this.props.playerToEdit.name, position: this.props.playerToEdit.position, imageUrl: this.props.playerToEdit.imageUrl });
    }
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

  updatePlayerEvent = (event) => {
    const { updatePlayer, playerToEdit } = this.props;
    event.preventDefault();

    const updatedPlayer = {
      name: this.state.name,
      position: this.state.position,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
    };
    updatePlayer(playerToEdit.id, updatedPlayer);
    this.setState({ editMode: false });
  }

  render() {
    const { editMode } = this.props;

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
        <div className="form-button-container">
          <button className="btn btn-light cancel-form" onClick={this.props.setHidePlayerForm}>Cancel</button>
          {
            (editMode) ? (<button className="btn btn-secondary" onClick={this.updatePlayerEvent}>Update Player</button>)
              : (<button className="btn btn-light" onClick={this.savePlayerEvent}>Save Player</button>)
          }
        </div>
      </form>
    );
  }
}

export default PlayerForm;

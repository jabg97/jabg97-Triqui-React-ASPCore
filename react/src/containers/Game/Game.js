import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as gameActions from '../../actions/gameActions';

import BoardGrid from '../../components/Board/BoardGrid';
import Button from '../../components/common/Button';


const styles = {
  container: {
    marginTop: 20,
  },
  boardContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalActionsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  pageTitle: {
    borderBottom: '1px solid #CCC',
    marginBottom: 15,
    padding: '0 40px 10px',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 30,
    marginTop: 0,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 27,
    marginTop: 0,
    textAlign: 'center',
  },
  button: {
    margin: '0px 5px',
    padding: 5,
    fontSize: 25,
    minWidth: 60,
  },
  currentPlayerContainer: {
    border: '1px solid #0291E8',
    padding: 10,
    borderRadius: 5,
  },
};

export class Game extends Component {
  static propTypes = {
    /**
     * The grid of the game's board along with its values.
     */
    boardGrid: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.number,
      ).isRequired,
    ).isRequired,
    /**
     * The current player of the game.
     */
    currentPlayer: PropTypes.number,
    /**
     * The marks that won the game.
     */
    winnerMarks: PropTypes.object,
    /**
     * The player that won the game (if it exists).
     */
    winnerPlayer: PropTypes.number,
    /**
     * Whether the game is a tie or not.
     */
    isTie: PropTypes.bool,
    /**
     * The chosen players symbols.
     */
    playersSymbols: PropTypes.object,
    /**
     * The quantity of chosen marks of the game.
     */
    marksCount: PropTypes.number,
    actions: PropTypes.shape({
      /**
       * An action to restart the game to the initial state.
       */
      gameRestart: PropTypes.func,
      /**
       * An action to choose the first player.
       */
      gameChoosePlayer: PropTypes.func,
      /**
       * An action to handle a new mark on a board space.
       */
      newMark: PropTypes.func,
    }),
  };

  state = {
    showChoosePlayerModal: true,
  };

  getPlayerSymbol = player => this.props.playersSymbols[player] || null;

  isWinnerMark = (column, index) => {
    const { winnerMarks } = this.props;

    if (!winnerMarks || !winnerMarks[column]) {
      return false;
    }

    return (winnerMarks[column].indexOf(index) !== -1);
  };

  handleNewMark = (column, row) => {
    const { boardGrid, winnerPlayer } = this.props;

    // Don't let user mark if it's an already-marked board space or there's already a winner
    if (boardGrid[column][row] || winnerPlayer) {
      return null;
    }

    return this.props.actions.newMark(column, row);
  };



  choosePlayer = (player) => {
    this.props.actions.gameChoosePlayer(player);

    this.setState({
      showChoosePlayerModal: false,
    });
  };

  render() {
    const { showChoosePlayerModal } = this.state;
    const {
      boardGrid,
      currentPlayer,
      winnerMarks,
      winnerPlayer,
      isTie,
      marksCount,
      actions: {
        gameRestart,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.boardContainer}>
          <h1 style={styles.pageTitle}>Triqui</h1>

          {!showChoosePlayerModal && (
            <div style={styles.currentPlayerContainer}>
              Jugador actual: {currentPlayer}
            </div>
          )}
          {showChoosePlayerModal &&(
  <div>
          <h1 style={styles.modalTitle}>¿Con que tipo quiere jugar?</h1>

          <div style={styles.modalActionsContainer}>
            <Button
              name="symbol-X"
              icon="X"
              iconPosition="after"
              onClick={() => this.choosePlayer('X')}
              style={styles.button}
            />

            <Button
              name="symbol-O"
              icon="O"
              iconPosition="after"
              onClick={() => this.choosePlayer('O')}
              style={styles.button}
            />
          </div>
        </div>)}
        {!showChoosePlayerModal &&(
          <BoardGrid
            grid={boardGrid}
            winnerMarks={winnerMarks}
            handleNewMark={this.handleNewMark}
            isWinnerMark={this.isWinnerMark}
            getPlayerSymbol={this.getPlayerSymbol}
          />)}
        </div>
        {isTie || !!winnerPlayer &&(
        <div>
          {isTie && (
            <div>
              <h1 style={styles.modalTitle}>Empate!</h1>

              <h2 style={styles.modalSubtitle}>Muy buen juego! 😁</h2>
            </div>
          )}

          {winnerPlayer && (
            <div>
              <h1 style={styles.modalTitle}>Jugador {winnerPlayer} Ha ganado!</h1>

              <h2 style={styles.modalSubtitle}>Eres el mejor! 😎</h2>
            </div>
          )}

        </div>
        )}

        {marksCount > 0 && (
          <div style={styles.actionsContainer}>
            <Button
              icon="R"
              onClick={() => gameRestart()}
              label="Reiniciar"
            />
          </div>
        )}

      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ ...game });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

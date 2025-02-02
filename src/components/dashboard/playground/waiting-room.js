import React from "react"
import { connect } from 'react-redux'

import { Grid, Row, Col, Table, Button, Alert } from 'react-bootstrap';

class WaitingRoom extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show_info:true
    }

    this.goToRoom = this.goToRoom.bind(this)
    this.handleHideInfo = this.handleHideInfo.bind(this)

  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Joueurs ayant rejoint la session</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {
              this.state.show_info
              ? <Alert bsStyle="info" onDismiss={this.handleHideInfo}>
                  <h4>En attente</h4>
                  <p>Quand tous les joueurs seront prêts, vous pourrez cliquer sur le bouton "Prêts à jouer" qui apparaîtra.</p>
                </Alert>
              : null
            }
          </Col>
        </Row>
        <Row>
          <Col xs={12}>

            <Table responsive>
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Prêt</th>
                </tr>
              </thead>
              <tbody>
              {this.props.session.players.map(player => {
                /*if (player.id === this.props.me.id) return null*/
                return (
                  <tr>
                    <td>{player.shortname}</td>
                    <td className="statut">
                      {this.playerConnected(player)
                       ? <i className="pe pe-7s-check text-success"></i>
                       : null}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
            {(this.props.session.players.length === 1 || this.playersConnected()) ? <Button onClick={this.goToRoom}>Prêts à jouer !</Button> : null}
          </Col>
        </Row>
      </Grid>
    )
  }

  playerConnected(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id && state.connected }).length > 0
  }

  playersConnected() {
    return this.props.session.players.length === this.props.session.current_round.userStates.filter(state => { return state.connected }).length
  }

  goToRoom() {
    this.props.clients.SessionClient.room(this.props.session.id)
  }

  handleHideInfo() {
    this.setState({show_info:false})
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(WaitingRoom)

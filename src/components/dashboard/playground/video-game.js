import React from "react"
import { connect } from 'react-redux'

import configs from 'config'

import withUserAgent from 'react-useragent'

import { Grid, Row, Col, Button} from 'react-bootstrap';

class VideoGame extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: false,
      finished: false,
      scores: {}
    }

    this.runGame = this.runGame.bind(this)
  }

  componentWillMount() {
    var self = this;
    window.API_1484_11 = {
      Initialize: function() {
        self.setState({scores: {}})
        return "true";
      },
      SetValue: function(key, value) {
        var scores = self.state.scores
        fillHash(scores, key.split('.'), value)
        self.setState({scores: scores})
        return "true"
      },
      GetValue: function(parameter) {
        return "value";
      },
      Commit: function(value) {
        self.endGame()
        return "true";
      },
      Terminate: function(value) {
        return "true";
      },
      GetLastError: function() {
        return 0;
      },
      GetErrorString: function(code) {
        return "Error string";
      },
      GetDiagnostic: function(code) {
        return "Diagnostic";
      }
    }
  }

  componentWillUnmount() {
    window.API_1484_11 = undefined
  }
  
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Participe à ton entretien</h2>
          </Col>
        </Row>
        <Row>
          {this.props.ua.mobile
           ? <Col xs={12}>
               <div className="alert alert-danger">
                 <h4>Resource indisponible sur mobile</h4>
                 <p>Ce mode de simulation n'est à ce jour pas compatible sur mobile.</p>
                 <p>Merci d'accéder à ce module sur PC/MAC fixe ou portable.</p>
               </div>
               <span>Contenu indisponible sur mobile</span>
             </Col>
           : <Col xs={12}>
               <Grid fluid>
                 <Row>
                   {this.state.finished
                    ? <Col xs={12}>
                        <span>Calcul du score en cours</span>
                      </Col>
                    : <Col xs={12}>
                        <p>Tu vas maintenant participer à ton entretien avec le décideur. Il se déroulera en trois phases :</p>
                        <ul>
                          <li>Prise de contact</li>
                          <li>Découverte du besoin</li>
                          <li>Formulation de l'offre</li>
                        </ul>
                        <p>Le temps est limité et c'est toi qui mène l'entretien, donne la cadence et choisi d'avancer à l'étape suivante quand tu es satisfait des infos que tu as.</p>
                        <p>Bonne chance !</p>
                        <Button className={"btn-warning"} onClick={this.runGame}>Commencer l'entretien</Button>
                        <iframe id="video-game-content" 
                          frameborder="0" 
                          style={{visibility: this.state.running ? "visible" : "hidden"}}
                          src={this.getUrl()}
                          width="100%"
                          height="100%"
                        ></iframe>
               
                      </Col>
                   }
                 </Row>
               </Grid>
             </Col>
          }
        </Row>
      </Grid>
    )
  }

  getUrl() {
    var url = ""
    url = this.currentUserState().scenario.game_url
    return url
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  runGame() {
    this.setState({running: true})
  }

  endGame() {
    var self=this
    this.setState({finished: true}, function() {
      this.props.clients.SessionClient.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function() {
        self.setState({running: false})
      })
    })
  }
}

function fillHash(hash, address, value) {
  if (address.length === 1) {
    hash[address[0]] = value
    return true
  } else {
    if (!hash[address[0]]) {
      hash[address[0]] = {}
    }

    hash = hash[address[0]]
    address.shift()
    return fillHash(hash, address, value)
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
  }
}

export default withUserAgent(connect(mapStateToProps)(VideoGame))

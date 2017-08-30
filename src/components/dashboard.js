import React from "react"
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import Header from './dashboard/header'

import Home from './dashboard/home'
import Profile from './dashboard/profile'
import Sessions from './dashboard/sessions'
import Playground from './dashboard/playground'
import ProfileFiller from './dashboard/profile-filler'

class Dashboard extends React.Component {

  render() {

    return (
        <div className="dashboard">
          <Header location={this.props.location} history={this.props.history} showAside={!this.props.me || this.props.me.firstname !== null} />
          {this.props.me && this.props.me.firstname === null
           ? <ProfileFiller me={this.props.me} />
           : <Switch>
               <Route exact path="/dashboard" component={Home} />
               <Route exact path="/dashboard/profile" component={Profile} />
               <Route exact path="/dashboard/sessions/:identifier" component={Playground} />
               <Route exact path="/dashboard/sessions" component={Sessions} />
             </Switch>}
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default connect(mapStateToProps)(Dashboard)

import React from 'react'

import { NavLink, Link, Redirect } from 'react-router-dom'
import Auth from 'clients/auth'
import ShowForAcls from 'components/utils/auth/show-for-acls'

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      logout: false
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  render() {
    if (this.state.logout) return <Redirect to="/" />

    return (
      <header id="header">   

          <nav className={"navbar navbar-default navbar-fixed-top"}>
              <div className={"container-fluid"}>
                  <div className={"navbar-header"}>
                      <div id="mobile-menu">
                          <div className={"left-nav-toggle"}>
                              <a href="#">
                                  <i className={"stroke-hamburgermenu"}></i>
                              </a>
                          </div>
                      </div>
                      <Link to="/" className={"navbar-brand"}>
                          <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
                      </Link>
                  </div>
                  <div id="navbar" className={"navbar-collapse collapse"}>
                      <div className={"left-nav-toggle"}>
                          <a href="">
                              <i className={"stroke-hamburgermenu"}></i>
                          </a>
                      </div>
                  </div>
              </div>
          </nav>

          <aside className={"navigation"}>
              <nav>
                  <ul className={"nav luna-nav"}>
                      <li className={"nav-category"}>
                          Navigation
                      </li>
                      <li><NavLink exact to="/dashboard">Accueil</NavLink></li>
                      <li><NavLink exact to="/dashboard/profile">Profil</NavLink></li>
                      <li><NavLink exact to="/dashboard/sessions">Jeux</NavLink></li>
                      <ShowForAcls grants={["admin"]}>
                        <li><NavLink exact to="/admin">Administration</NavLink></li>
                      </ShowForAcls>
                      <li><a href="#" onClick={this.handleLogout}>Déconnexion</a></li>
                  </ul>
              </nav>
          </aside>

      </header>
    );

  }

  handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({logout: true})
  }

}

export default Header

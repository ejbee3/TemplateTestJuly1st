import React, { Component } from 'react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap'
import { Link } from 'react-router-dom'
import './NavMenu.css'
import ferris from '../images/ferris.jpg'

export class NavMenu extends Component {
  static displayName = NavMenu.name

  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/" className="text-light">
              <img className="logo-pic" src={ferris} alt="bueller" />
            </NavbarBrand>{' '}
            <h2 className="title-font">Bueller?</h2>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              color="#f5fffa"
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/manage">
                    Class Roster
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/signup">
                    Sign up teacher
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}

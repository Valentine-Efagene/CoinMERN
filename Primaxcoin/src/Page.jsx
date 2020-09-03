/* eslint-disable react/jsx-one-expression-per-line */
// import { useState } from 'react';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar,
  Grid,
  Nav,
  NavItem,
  NavLink,
  Button,
  //Glyphicon,
  NavDropdown,
  Container,
  // Collapse, Button, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

import SignInNavItem from './SignInNavItem.jsx';
import Contents from './Contents.jsx';
import Login from './Login.jsx';
import ContactList from './ContactList.jsx';
import UserContext from './UserContext.js';
import { logIn, logOut } from './actions';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {}

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <UserContext.Provider
          value={{ test: 'worked', user, onUserChange: this.onUserChange }}
        >
          <NavBar user={user} />
          <Container fluid>
            <Contents />
          </Container>
        </UserContext.Provider>
        <Footer />
      </div>
    );
  }
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this{' '}
        <a href="https://github.com/Valentine-Efagene/MERN">
          Github repository
        </a>
      </p>
    </small>
  );
}

function NavBar({ user }) {
  let contactAdd = '';
  let update = '';
  const dispatch = useDispatch();
  dispatch(logIn());
  const isLogged = useSelector((state) => state.isLogged);

  if (isLogged) {
    update = (
      <LinkContainer to="/update">
        <NavLink>Update Details</NavLink>
      </LinkContainer>
    );
  }

  if (user) {
    contactAdd = (
      <LinkContainer to="/ContactAdd">
        <NavItem>Add Contact</NavItem>
        <Container fluid>
          <Contents />
        </Container>
      </LinkContainer>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/home">
            <NavLink>Home</NavLink>
          </LinkContainer>
          <LinkContainer to="/contacts">
            <NavLink>Contacts</NavLink>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavLink>
              <NavItem>About</NavItem>
            </NavLink>
          </LinkContainer>
          {update}
          {contactAdd}
        </Nav>
        <Nav pullRight>
          <NavDropdown
            id="user-dropdown"
            title={<FontAwesomeIcon icon={faCoins} />}
            noCaret
          >
            <SignInNavItem />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

/* function CollapseButton() {
  const [open, setOpen] = useState(false);
  const drawerTooltip = (
    <Tooltip id='drawer-tooltip' placement='top'>
      Drawer
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger delayShow={1000} overlay={drawerTooltip}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls='example-collapse-text'
          aria-expanded={open}
        >
          <Glyphicon glyph='glyphicon glyphicon-align-justify' />
        </Button>
      </OverlayTrigger>
      <Collapse in={open}>
        <NavBar />
      </Collapse>
    </>
  );
}
*/

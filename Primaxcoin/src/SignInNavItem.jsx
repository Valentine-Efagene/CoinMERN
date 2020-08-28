/* eslint-disable func-names */
import React from 'react';
import { NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import withToast from './withToast.jsx';
import UserContext from './UserContext.js';

class SigninNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    const { showSuccess, showError } = this.props;
    const { onUserChange } = this.context;
    // sign out
  }

  render() {
    const { user } = this.context;

    if (user) {
      return <NavLink onClick={this.signOut}>Sign out</NavLink>;
    }

    return (
      <LinkContainer to='/login'>
        <NavLink>Sign In</NavLink>
      </LinkContainer>
    );
  }
}

SigninNavItem.contextType = UserContext;
export default withToast(SigninNavItem);

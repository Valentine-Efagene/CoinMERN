/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
import React, { Component } from 'react';
import {
  Col,
  Card,
  Form,
  FormGroup,
  Image,
  FormControl,
  Button,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import img from './assets/images/home.png';
import './assets/css/styles.css';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      user: null,
      loading: false,
      noAccount: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stoptLoading() {
    this.setState({ loading: false });
  }

  async signOut() {
    const { showSuccess, showError } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    // sign out
  }

  async signUpWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    // sign up
  }

  async signInWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    // sign in
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, noAccount } = this.state;

    if (
      user.password === undefined ||
      user.email === undefined ||
      user.password === '' ||
      user.email === ''
    ) {
      this.showValidation();
    } else {
      this.dismissValidation();

      if (noAccount) {
        this.signUpWithEmail(user.email, user.password);
      } else {
        this.signInWithEmail(user.email, user.password);
      }
    }
  }

  render() {
    const { showingValidation, loading, noAccount } = this.state;
    const { user } = this.context;
    let spinner = null;

    if (loading) {
      spinner = <Spinner size={50} />;
    }

    let validationMessage;
    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          All fields must be filled
        </Alert>
      );
    }

    let btn = (
      <Button disabled={false} bsStyle="primary" type="submit">
        <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    );

    if (user) {
      btn = (
        <Button disabled={false} bsStyle="primary" onClick={this.signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
      );
    }

    if (noAccount) {
      btn = (
        <Button disabled={false} bsStyle="primary" onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faUser} />
        </Button>
      );
    }

    return (
      <Col className="col-centered" sm={12} md={6}>
        <Card>
          <Card.Header>
            <Card.Title className="text-center">Email Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col className="col-centered">
                  <Button
                    variant="light"
                    style={{
                      border: 'none',
                    }}
                    disabled={user !== null}
                    onClick={() => {
                      this.setState({ noAccount: true });
                    }}
                  >
                    Want to create an account?
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="col-centered">
                  <FormControl
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="col-centered">
                  <FormControl
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="col-centered">
                  <ButtonToolbar>{btn}</ButtonToolbar>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="col-centered">{validationMessage}</Col>
              </FormGroup>
            </Form>
            {spinner}
          </Card.Body>
          <Card.Footer>
            <Image className="footer-image" src={img} />
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

LogIn.contextType = UserContext;
const LoginWithToast = withToast(LogIn);
export default LoginWithToast;

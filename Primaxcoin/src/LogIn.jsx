/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
import React, { Component, useState, useEffect } from 'react';
import {
  Col,
  Card,
  Nav,
  Form,
  FormGroup,
  Image,
  FormControl,
  Button,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from './actions';
import img from './assets/images/home.png';
import './assets/css/styles.css';

function LogIn(props) {
  const dispatch = useDispatch();
  var [user, setUser] = useState({
    email: useSelector((state) => state.email),
  });
  var [loading, setLoading] = useState(false);
  var [showValidation, setShowVaidation] = useState(false);
  var [noAccount, setNoAccout] = useState(false);

  function onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const prevUser = user;
    const value = naturalValue === undefined ? textValue : naturalValue;
    setUser({ ...prevUser, [name]: value });
  }

  function showValidation() {
    setShowVaidation(true);
  }

  function dismissValidation() {
    setShowVaidation(false);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  async function signOut(event) {
    event.preventDefault();
    const { showSuccess, showError } = props;
    startLoading();
    dispatch(logOut());
    stopLoading();
    showSuccess('Logged out');
  }

  async function signUpWithEmail(email, password) {
    const { showError, showSuccess } = props;
    startLoading();
    const query = `mutation signUp($email: String!, $passwordHash: String!) {
      signUp(email: $email, passwordHash: $passwordHash)
    }`;

    var { email, password } = user;
    const passwordHash = password;
    var success = false;

    try {
      const promise = await graphQLFetch(
        query,
        { email, passwordHash },
        showError,
      ).then((result) => {
        stopLoading();

        if (result) {
          const { data, errors } = result;
          var message = '';

          if (errors) {
            errors.forEach((error) => {
              if (error.extensions.exception.errno === 1062) {
                message += 'This email is already linked to an account\n';
              }
            });

            showError(message);
          }

          if (data !== null && data.auth === true) {
            success = result.data.auth;
            showSuccess('Signed up as ' + email);
          }
        }
      });
    } catch (err) {
      showError(err.message);
      stopLoading();
    }

    if (!success) {
      user.email = null;
    }

    dispatch(logIn(user.email));
  }

  async function signInWithEmail(email, password) {
    const { showError, showSuccess } = props;
    startLoading();
    const query = `query auth($email: String!, $passwordHash: String!) {
      auth(email: $email, passwordHash: $passwordHash)
    }`;

    var { email, password } = user;
    const passwordHash = password;
    var success = false;

    try {
      const promise = await graphQLFetch(
        query,
        { email, passwordHash },
        showError,
      ).then((data) => {
        stopLoading();
        if (data !== null && data.auth === true) {
          success = data.auth;
          showSuccess('Logged in as ' + email);
        }
      });
    } catch (err) {
      showError(err.message);
    }

    if (!success) {
      user.email = null;
    }

    dispatch(logIn(user.email));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      user.password === undefined ||
      user.email === undefined ||
      user.password === '' ||
      user.email === ''
    ) {
      showValidation();
    } else {
      dismissValidation();

      if (noAccount) {
        signUpWithEmail(user.email, user.password);
      } else {
        signInWithEmail(user.email, user.password);
      }
    }
  }

  let spinner = null;

  if (loading) {
    spinner = <Spinner size={50} />;
  }

  let validationMessage;
  if (showValidation) {
    validationMessage = (
      <Alert bsStyle="danger" onClose={dismissValidation}>
        All fields must be filled
      </Alert>
    );
  }

  let btn = '';

  if (useSelector((state) => state.email)) {
    btn = (
      <Button disabled={false} bsStyle="primary" onClick={signOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </Button>
    );
  } else {
    btn = (
      <Button disabled={false} bsStyle="primary" type="submit">
        <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    );
  }

  if (noAccount) {
    btn = (
      <Button disabled={false} bsStyle="primary" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faUser} />
      </Button>
    );
  }

  const loggedInEmail = useSelector((state) => state.email);

  return (
    <Col className="col-centered" sm={12} md={6}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">Email Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form horizontal onSubmit={handleSubmit}>
            <FormGroup>
              <Col className="col-centered">
                <Button
                  variant="light"
                  style={{
                    border: 'none',
                  }}
                  disabled={loggedInEmail !== null}
                  onClick={() => {
                    setNoAccout(true);
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
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col className="col-centered">
                <FormControl
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col className="col-centered">
                <ButtonToolbar>{btn}</ButtonToolbar>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col className="col-centered">
                <Nav.Link href="/forgotpassword">Forgot password?</Nav.Link>
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

LogIn.contextType = UserContext;
const LoginWithToast = withToast(LogIn);
export default LoginWithToast;

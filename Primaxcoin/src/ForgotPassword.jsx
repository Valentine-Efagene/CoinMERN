/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
import React, { Component, useState, useEffect } from 'react';
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

function ForgotPassword(props) {
  const dispatch = useDispatch();
  var [user, setUser] = useState({
    email: useSelector((state) => state.email),
  });
  var [loading, setLoading] = useState(false);
  var [showingValidation, setShowingValidation] = useState(false);
  var [email, setEmail] = useState(null);

  function onChange(event, naturalValue) {
    const { value: textValue } = event.target;
    console.log(event.target);
    const value = naturalValue === undefined ? textValue : naturalValue;
    setEmail(value);
  }

  function showValidation() {
    setShowingValidation(true);
  }

  function dismissValidation() {
    setShowingValidation(false);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  async function resetPassword(email) {
    const { showError, showSuccess } = props;
    startLoading();
    const query = `mutation cr($email: String!, $passwordHash: String!) {
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

  function handleSubmit(event) {
    event.preventDefault();

    if (email === null || email === '') {
      showValidation();
    } else {
      dismissValidation();
      resetPassword(email);
    }
  }

  let spinner = null;
  var validationMessage = '';

  if (loading) {
    spinner = <Spinner size={50} />;
  }

  return (
    <Col className="col-centered" sm={12} md={6}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">Forgot my password</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form horizontal onSubmit={handleSubmit}>
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
                <Button
                  type="submit"
                  variant="primary"
                  style={{
                    border: 'none',
                  }}
                >
                  Get Email
                </Button>
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

const ForgotPasswordWithToast = withToast(ForgotPassword);
export default ForgotPasswordWithToast;

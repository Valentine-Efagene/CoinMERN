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

  async function sendEmail(email, token) {
    const { showError, showSuccess } = props;

    if (!email) {
      showError('Please provide an email address');
      return;
    }

    //startLoading();
    const query = `mutation sendResetEmail($email: String!, $token: String!){
      sendResetEmail(email: $email, token: $token)
    }`;

    try {
      await graphQLFetch(query, { email, token }, showError).then((data) => {
        //stopLoading();

        if (data.data) {
        }
      });
    } catch (err) {
      showError(err.message);
    }
  }

  async function getToken(email) {
    const { showError, showSuccess } = props;
    const query = `query getResetToken($email: String!){
      getResetToken(email: $email){token}
    }`;

    return new Promise((resolve, reject) => {
      try {
        graphQLFetch(query, { email }, showError).then((data) => {
          if (data.data) {
            resolve(data.data.getResetToken.token);
          } else {
            resolve(null);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { showError, showSuccess } = props;

    if (email === null || email === '') {
      showValidation();
    } else {
      //dismissValidation();
      const token = await getToken(email);
      if (!token) {
        showError('Invalid email address');
        return;
      }

      sendEmail(email, token);
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

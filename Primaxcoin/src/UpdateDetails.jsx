/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
import React, { Component } from 'react';
import {
  Col,
  Card,
  Form,
  Image,
  FormControl,
  Button,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDatabase,
  faMale,
  faFemale,
  faTransgender,
  faTransgenderAlt,
  faPhone,
  faAddressBook,
  faSync,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import img from './assets/images/home.png';
import './assets/css/styles.css';

class UpdateDetails extends Component {
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

  stopLoading() {
    this.setState({ loading: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, noAccount } = this.state;
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
        <Alert bsStyle="danger" onClose={this.dismissValidation} dismissible>
          All fields must be filled
        </Alert>
      );
    }

    let btn = (
      <Button disabled={false} bsStyle="primary" type="submit">
        <FontAwesomeIcon icon={faSyncAlt} />
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
      <Col className="col-centered" sm={12} md={12} lg={12}>
        <Card>
          <Card.Header>
            <Card.Title className="text-center">Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="Phone Number"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control as="select" custom>
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control
                    name="city"
                    placeholder="City"
                    type="text"
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="State"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control
                    name="country"
                    placeholder="Country"
                    type="text"
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    placeholder="Wallet"
                    name="wallet"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input />
                    <Form.File.Label name="dp" data-browse="Browse">
                      Custom file input
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">
                      You did it!
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Col>
                  <ButtonToolbar>{btn}</ButtonToolbar>
                </Col>
              </Form.Group>
              <Form.Group>
                <Col>{validationMessage}</Col>
              </Form.Group>
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

const UpdateDetailsWithToast = withToast(UpdateDetails);
export default UpdateDetailsWithToast;

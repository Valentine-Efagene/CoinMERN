/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Col,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Form,
  Button,
  ButtonToolbar,
  Alert,
  Image,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faHome, faCalendar, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import PhoneNumberInput from './PhoneNumberInput.jsx';
import img from './assets/images/home.png';
import './assets/css/styles.css';

class ContactAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      contact: {
        name: '',
        personalNumber: '',
        businessNumber: '',
        address: '',
        email: '',
        birthday: '',
        owner: '',
      },
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [name]: value },
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

  async handleSubmit(event) {
    event.preventDefault();
    const { showSuccess, showError } = this.props;
    const { contact } = this.state;
    if (contact.name === null) {
      this.showValidation();
      return;
    }

    if (contact.name.trim() === '') {
      this.showValidation();
      return;
    }

    this.dismissValidation();
    const {
      name,
      personalNumber,
      businessNumber,
      address,
      email,
      birthday,
    } = contact;

    // use data
  }

  render() {
    const { showingValidation, loading } = this.state;
    let progress;
    let validationMessage = '';

    let spinner = null;
    if (loading) {
      spinner = <Spinner size={50} />;
    }

    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Enter a name at least
        </Alert>
      );
    } else {
      validationMessage = '';
    }

    return (
      <Col smOffset={3} sm={6}>
        <Card>
          <Card.Heading>
            <Card.Title className="text-center">Create Contact</Card.Title>
          </Card.Heading>
          <Card.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faUser} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faPhone} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name="personalNumber"
                    placeholder="Personal Number"
                    componentClass={PhoneNumberInput}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name="businessNumber"
                    placeholder="Business Number"
                    componentClass={PhoneNumberInput}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faHome} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name="address"
                    placeholder="Address"
                    type="text"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <FormLabel>
                    <FontAwesomeIcon icon={faCalendar} />
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name="birthday"
                    placeholder="Birthday"
                    type="date"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <ButtonToolbar>
                    <Button
                      disabled={false}
                      onClick={this.handleSubmit}
                      bsStyle="primary"
                      type="submit"
                    >
                      Create
                    </Button>
                  </ButtonToolbar>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={8}>
                  {validationMessage}
                  {spinner}
                </Col>
              </FormGroup>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Image className="footer-image" src={img} />
            {progress}
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

ContactAdd.contextType = UserContext;
const ContactAddWithToast = withToast(ContactAdd);
export default ContactAddWithToast;

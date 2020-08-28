/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import UserContext from './UserContext.js';
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormGroup,
  FormLabel,
  Card,
  ButtonToolbar,
  Navbar,
  Grid,
  Nav,
  FormControl,
  Button,
  NavItem,
  //Glyphicon,
  NavDropdown,
  // Collapse, Button, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className='text-center'>
          <Container>
            <Row>

              <Card>
                <Card.Header>
                  <Card.Title className='text-center'>
                    Email Login
            </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form horizontal>
                    <FormGroup>
                      <Col smOffset={3} sm={6}>
                        <Button
                          variant='light'
                          style={{
                            border: 'none',
                          }}
                        >
                          Want to create an account?
                  </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={3} sm={6}>
                        <FormControl
                          type='email'
                          placeholder='Email'
                          name='email'
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={3} sm={6}>
                        <FormControl
                          name='password'
                          placeholder='Password'
                          type='password'
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={3} sm={6}>
                        <ButtonToolbar></ButtonToolbar>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={2} sm={8}>
                      </Col>
                    </FormGroup>
                  </Form>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
              </Card>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

Home.contextType = UserContext;

import React from 'react';
import { Card } from 'react-bootstrap';

import Spinner from './Spinner.jsx';
import UserContext from './UserContext.js';
import ContactFilter from './ContactFilter.jsx';
import ContactTable from './ContactTable.jsx';
import withToast from './withToast.jsx';

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: null,
      admins: null,
      name: '',
      loading: false,
    };

    this.deleteContact = this.deleteContact.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    this.loadData();
    this.loadAdmins();
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  async getContacts() {
    const contacts = [];
    const { showError } = this.props;

      this.startLoading();
      // get contacts

    return contacts;
  }

  async loadAdmins() {
    const { showError } = this.props;

      this.startLoading();
      // get admins
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stopLoading() {
    this.setState({ loading: false });
  }

  async loadData() {
    const contacts = await this.getContacts();
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  async deleteContact(id) {
    const { showSuccess, showError } = this.props;
      this.startLoading();
      // delete a contact
  }

  render() {
    const { contacts, admins, name, loading } = this.state;
    let filteredContacts = contacts;
    const { user } = this.context;

    if (name !== '' && contacts) {
      filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    let spinner = null;
    if (loading) {
      spinner = <Spinner size={50} />;
    }

    let contactTable = '';
    if (contacts == null) {
      contactTable = '';
    } else {
      contactTable = (
        <ContactTable
          user={user}
          admins={admins || []}
          contacts={filteredContacts || []}
          deleteContact={this.deleteContact}
        />
      );
    }

    return (
      <React.Fragment>
        <Card>
          <Card.Header>
            <Card.Title toggle>Search</Card.Title>
          </Card.Header>
          <Card.Body collapsible>
            <ContactFilter onChange={this.onChange} />
          </Card.Body>
        </Card>
        {spinner}
        {contactTable}
      </React.Fragment>
    );
  }
}

ContactList.contextType = UserContext;
const ContactListWithToast = withToast(ContactList);
export default ContactListWithToast;

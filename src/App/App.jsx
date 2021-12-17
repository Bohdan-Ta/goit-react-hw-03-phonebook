import { Component } from "react";
import { nanoid } from "nanoid";

import Sections from "../Section";
import Forms from "../Forms/Forms";
import Contacts from "../Contacts";
import Filter from "../Filter/Filter";

import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: " ",
  };

  getDataSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const searchDublicate = contacts.find((contact) => contact.name === name);

    if (searchDublicate) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [{ id: nanoid(), name, number }, ...contacts],
      }));
    }
  };

  onDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  searchContact = (event) => {
    this.setState({ filter: event.target.value });
  };

  sensitiveSearch = () => {
    const { filter, contacts } = this.state;
    const lowerCaseLetters = filter.toLowerCase().trim();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerCaseLetters)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.state) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    const filteredContacts = this.sensitiveSearch();
    return (
      <div className={s.container}>
        <Sections title="Phonebook">
          <Forms getSubmit={this.getDataSubmit} />
        </Sections>
        <Sections title="Contacts">
          <Filter value={filter} searchContact={this.searchContact} />
          <Contacts
            contacts={filteredContacts}
            onDeleteContact={this.onDeleteContact}
          />
        </Sections>
      </div>
    );
  }
}

export default App;

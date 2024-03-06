import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addContact, deleteContact } from '../redux/contactsSlice';
import { changeFilter } from '../redux/filterSlice';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import styles from './styles.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const handlerFilterChange = event => {
    const { value } = event.target;
    dispatch(changeFilter(value));
  };

  const checkNameDuplicate = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handlerAddContact = ({ name, number }) => {
    if (checkNameDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact({ name, number }));
  };

  const handlerDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles['main-container']}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handlerAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handlerFilterChange} />
      <ContactList
        contacts={filteredContacts()}
        deleteContact={handlerDeleteContact}
      />
    </div>
  );
};

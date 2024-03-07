import React from 'react';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';

import { ContactListItem } from '../ContactListItem/ContactListItem';
import styles from './styles.module.css';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsToRender = filteredContacts();
  return (
    <ul className={styles.list}>
      {contactsToRender.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

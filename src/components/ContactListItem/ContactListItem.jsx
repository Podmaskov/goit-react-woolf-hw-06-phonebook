import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import styles from './styles.module.css';

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li key={contact.id}>
      <div className={styles['item-container']}>
        <span>{`${contact.name}: ${contact.number}`}</span>
        <button
          className={styles.btn}
          type="button"
          onClick={() => dispatch(deleteContact(contact.id))}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

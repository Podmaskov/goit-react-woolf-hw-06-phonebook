import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const phoneContacts = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: phoneContacts,

  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.items = [
          {
            id: payload.id,
            name: payload.name,
            number: payload.number,
          },
          ...state.items,
        ];
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },

    deleteContact(state, { payload }) {
      state.items = state.items.filter(contact => contact.id !== payload);
    },
  },
});

export const persistedContactsReducer = persistReducer(
  { key: 'contacts', storage },
  contactsSlice.reducer
);
export const { addContact, deleteContact } = contactsSlice.actions;

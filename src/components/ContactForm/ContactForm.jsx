import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { TextField, Button, Box } from '@mui/material';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[A-Za-z\s]{2,}$/.test(name)) {
      toast.error(
        'Name should contain only letters and spaces, minimum 2 characters'
      );
      return;
    }

    if (!/^\+?\d[\d\s-]{6,}$/.test(number)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const isNameExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameExist) {
      toast.error(`Contact with name "${name}" already exists!`);
      return;
    }

    const isNumberExist = contacts.some(
      contact =>
        contact.number.replace(/[\s-]/g, '') === number.replace(/[\s-]/g, '')
    );
    if (isNumberExist) {
      toast.error(`Contact with number "${number}" already exists!`);
      return;
    }

    try {
      await dispatch(addContact({ name, number })).unwrap();
      toast.success('Contact added successfully!');
      setName('');
      setNumber('');
    } catch (error) {
      toast.error('Failed to add contact');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <TextField
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        helperText="Enter name (letters only)"
        fullWidth
        inputProps={{
          minLength: 2,
          maxLength: 50,
        }}
      />

      <TextField
        label="Phone Number"
        type="tel"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        required
        helperText="Enter phone number (min. 7 digits)"
        fullWidth
        inputProps={{
          minLength: 7,
          maxLength: 15,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!name || !number}
        fullWidth
      >
        Add contact
      </Button>
    </Box>
  );
};

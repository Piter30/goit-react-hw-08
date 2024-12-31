import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fuse from 'fuse.js';
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  Paper,
  IconButton,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import toast from 'react-hot-toast';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [searchPattern, setSearchPattern] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedNumber, setEditedNumber] = useState('');

  const fuse = new Fuse(contacts, {
    keys: ['name', 'number'],
    threshold: 0.3,
  });

  const filteredContacts = searchPattern
    ? fuse.search(searchPattern).map(result => result.item)
    : contacts;

  const handleDeleteClick = contact => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteContact(selectedContact.id)).unwrap();
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
    }
    setDeleteModalOpen(false);
  };

  const handleEditClick = contact => {
    setSelectedContact(contact);
    setEditedName(contact.name);
    setEditedNumber(contact.number);
    setEditModalOpen(true);
  };

  const handleEditConfirm = async () => {
    try {
      await dispatch(
        updateContact({
          contactId: selectedContact.id,
          name: editedName,
          number: editedNumber,
        })
      ).unwrap();
      toast.success('Contact updated successfully');
      setEditModalOpen(false);
    } catch (error) {
      toast.error('Failed to update contact');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Search contacts"
          variant="outlined"
          value={searchPattern}
          onChange={e => setSearchPattern(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            minWidth: { xs: '100%', sm: '500px', md: '800px' }, // dodane minimalne szerokości
          }}
        >
          {filteredContacts.map(contact => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={contact.id}
              sx={{
                minWidth: { xs: '100%', sm: '300px', md: '250px' }, // minimalna szerokość dla pojedynczego elementu
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '100%',
                  minWidth: '100%',
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  {' '}
                  <Typography variant="body1" component="div">
                    {contact.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contact.number}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(contact)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(contact)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Confirm Deletion</DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography>Are you sure you want to delete this contact?</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Edit Contact</DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Number"
            fullWidth
            value={editedNumber}
            onChange={e => setEditedNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

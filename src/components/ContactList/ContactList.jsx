import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectVisibleContacts } from '../../redux/contacts/selectors';
import css from './ContactList.module.css';
import toast from 'react-hot-toast';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  const handleDelete = id => {
    dispatch(deleteContact(id));
    toast.success('Contact deleted successfully!');
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <p className={css.text}>
            {name}: {number}
          </p>
          <button className={css.button} onClick={() => handleDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

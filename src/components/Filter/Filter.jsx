import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/filterSlice';
import { selectFilter } from '../../redux/contacts/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

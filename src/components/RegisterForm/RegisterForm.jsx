import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';
import toast from 'react-hot-toast';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 7) {
      toast.error('Password must be at least 7 characters long');
      return;
    }

    try {
      const response = await dispatch(
        register({ name, email, password })
      ).unwrap();
      toast.success(`Welcome ${response.user.name}! Registration successful!`);
      form.reset();
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('User with this email already exists');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later');
      } else {
        toast.error('Registration failed. Please try again');
      }
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" required />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

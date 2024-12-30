import { Helmet } from 'react-helmet-async';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import css from './Pages.module.css';

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className={css.container}>
        <h1 className={css.title}>Registration</h1>
        <RegisterForm />
      </div>
    </>
  );
}

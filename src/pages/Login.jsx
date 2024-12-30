import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/LoginForm/LoginForm';
import css from './Pages.module.css';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={css.container}>
        <h1 className={css.title}>Login</h1>
        <LoginForm />
      </div>
    </>
  );
}

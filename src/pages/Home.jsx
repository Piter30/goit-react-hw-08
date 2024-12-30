import { Helmet } from 'react-helmet-async';
import css from './Pages.module.css';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={css.container}>
        <h1 className={css.title}>
          Welcome to Phonebook app{' '}
          <span role="img" aria-label="Telephone icon">
            ☎️
          </span>
        </h1>
      </div>
    </>
  );
}

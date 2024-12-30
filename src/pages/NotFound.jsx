import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.text}>
        The page you are looking for doesn exist or has been moved.
      </p>
      <Link to="/" className={css.link}>
        Go to Home Page
      </Link>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';
import { Suspense } from 'react';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.headerContainer}>
          <AppBar />
        </div>
      </header>
      <div className={css.container}>
        <main className={css.main}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};

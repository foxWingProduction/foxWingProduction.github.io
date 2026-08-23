import { Outlet } from 'react-router-dom';
import { ScrollManager } from './ScrollManager';

/** Router root: everything that must outlive individual page changes. */
export function Root() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}

import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { NAVIGATE } from 'src/constants';

import style from './Header.module.css';

interface HeaderProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ toggle, setToggle }) => {
  return (
    <>
      <header className={style.header}>
        <nav className={style.header_links}>
          {NAVIGATE.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={style.header_links_item}
              style={({ isActive }) => ({
                color: isActive ? '#1976d2' : '#3f3f3f',
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          className={style.switcher}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            className={
              toggle
                ? style.switcher_icon
                : style.switcher_icon + ' ' + style.switcher_icon_off
            }
          >
            &#62;
          </div>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

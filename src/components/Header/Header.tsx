import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { NAVIGATE } from 'src/constants';
import { selectAuth } from 'src/store/profile/selectors';
import { auth } from 'src/store/profile/slice';

import style from './Header.module.css';

interface HeaderProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ toggle, setToggle }) => {
  const isAuth = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate('/signin', { replace: true });
  };

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

        <div className={style.plug}></div>

        <div className={style.login}>
          {isAuth && (
            <button
              className={style.login_button}
              onClick={() => dispatch(auth(false))}
            >
              Logout
            </button>
          )}
          {!isAuth && (
            <button className={style.login_button} onClick={handleLogin}>
              Login
            </button>
          )}
        </div>

        <button
          title="Hide / Show chat groups"
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

import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AboutWithConnect } from 'src/pages/About/About';
import { ChatPage } from 'src/pages/ChatPage';
import { Main } from 'src/pages/Main/Main';
import { Profile } from 'src/pages/Profile/Profile';
import { ChatList } from '../ChatList/ChatList';
import { Header } from '../Header/Header';

import style from './AppRouter.module.css';

// const Profile = React.lazy(() =>
//   Promise.all([
//     import('./pages/Profile').then(({ Profile }) => ({
//       default: Profile,
//     })),
//     new Promise((resolve) => setTimeout(resolve, 1000)),
//   ]).then(([moduleExports]) => moduleExports)
// );

interface AppRouterProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export const AppRouter: FC<AppRouterProps> = ({ toggle, setToggle }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Header toggle={toggle} setToggle={setToggle} />}
      >
        <Route index element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chats">
          <Route index element={<ChatList toggle={toggle} />} />
          <Route path=":chatId" element={<ChatPage toggle={toggle} />} />
        </Route>
        <Route path="about" element={<AboutWithConnect />} />
      </Route>

      <Route path="*" element={<h2 className={style.error}>404 page</h2>} />
    </Routes>
  );
};

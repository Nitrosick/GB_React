import { onValue } from 'firebase/database';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AboutWithConnect } from 'src/pages/About/About';
import { Articles } from 'src/pages/Articles/Articles';
import { SignIn } from 'src/pages/Auth/SignIn';
import { SignUp } from 'src/pages/Auth/SignUp';
import { ChatPage } from 'src/pages/ChatPage';
import { Main } from 'src/pages/Main/Main';
import { Profile } from 'src/pages/Profile/Profile';
import { ChatList } from '../ChatList/ChatList';
import { Header } from '../Header/Header';
import { PrivateRoute } from '../PrivateRoute';
import { PublicRoute } from '../PublicRoute';

import { firebaseAuth, messagesRef } from 'src/services/firebase';
import { changeAuth } from 'src/store/profile/slice';

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
  const [chats, setChats] = useState<any[]>([]);
  const [messagesDB, setMessagesDB] = useState<any>({});

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeAuth(true));
      } else {
        dispatch(changeAuth(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      const newChats = Object.entries(data).map((item: any) => ({
        id: item[0],
        name: item[1].name,
      }));

      setChats(newChats);
      setMessagesDB(data);
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Header toggle={toggle} setToggle={setToggle} />}
      >
        <Route index element={<Main />} />
        <Route
          path="profile"
          element={<PrivateRoute component={<Profile />} />}
        />
        <Route path="chats" element={<PrivateRoute />}>
          <Route
            index
            element={
              <ChatList toggle={toggle} chats={chats} messagesDB={messagesDB} />
            }
          />
          <Route
            path=":chatId"
            element={
              <ChatPage toggle={toggle} chats={chats} messagesDB={messagesDB} />
            }
          />
        </Route>
        <Route path="about" element={<AboutWithConnect />} />
        <Route path="articles" element={<Articles />} />
        <Route path="signin" element={<PublicRoute component={<SignIn />} />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<h2 className={style.error}>404 page</h2>} />
    </Routes>
  );
};

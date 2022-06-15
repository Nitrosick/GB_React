import { Suspense } from 'react';
import { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeContext, defaultContext } from 'src/utils/ThemeContext';

import { ChatList } from 'components/ChatList/ChatList';
import { Header } from 'components/Header/Header';

import { ChatPage } from 'src/pages/ChatPage';
import { Main } from 'src/pages/Main/Main';
import { Profile } from 'src/pages/Profile/Profile';

import { Provider } from 'react-redux';
import { store } from './store';

// const Profile = React.lazy(() =>
//   Promise.all([
//     import('./pages/Profile').then(({ Profile }) => ({
//       default: Profile,
//     })),
//     new Promise((resolve) => setTimeout(resolve, 1000)),
//   ]).then(([moduleExports]) => moduleExports)
// );

import style from './App.module.css';
import { AboutWithConnect } from './pages/About/About';

export const App: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
        }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Header toggle={toggle} setToggle={setToggle} />}
              >
                <Route index element={<Main />} />
                <Route path="profile" element={<Profile />} />
                <Route path="chats">
                  <Route
                    index
                    element={
                      <ChatList toggle={toggle} />
                    }
                  />
                  <Route
                    path=":chatId"
                    element={
                      <ChatPage toggle={toggle} />
                    }
                  />
                </Route>
                <Route path="about" element={<AboutWithConnect />} />
              </Route>

              <Route path="*" element={<h2 className={style.error}>404 page</h2>} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </Suspense>
    </Provider>
  );
};

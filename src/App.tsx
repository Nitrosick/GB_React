import { Suspense } from 'react';
import { nanoid } from 'nanoid';
import { FC, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Message, Messages, Chat } from 'src/common-types';
import { defaultContext } from 'src/utils/ThemeContext';

import { ChatList } from 'src/components/ChatList/ChatList';
import { Header } from 'src/components/Header/Header';

import { ChatPage } from 'src/pages/ChatPage';
import { Main } from 'src/pages/Main';
import { Profile } from 'src/pages/Profile/Profile';

// const Profile = React.lazy(() =>
//   Promise.all([
//     import('./pages/Profile').then(({ Profile }) => ({
//       default: Profile,
//     })),
//     new Promise((resolve) => setTimeout(resolve, 1000)),
//   ]).then(([moduleExports]) => moduleExports)
// );

import { ThemeContext } from 'src/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';

import style from './App.module.css';

const defaultChats: Messages = {
  first: [],
  second: [],
  third: [],
};

export const App: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [messages, setMessages] = useState(defaultChats);
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const chats = useMemo(
    () =>
      Object.keys(messages).map((chat) => ({
        id: nanoid(),
        name: chat,
      })),
    [messages, Object.keys(messages).length]
  );

  const onAddChat = (chat: Chat) => {
    setMessages({
      ...messages,
      [chat.name]: [],
    });
  };

  const onRemoveChat = (name: string) => {
    const copy: Messages = Object.assign({}, messages);
    delete copy[name];
    setMessages(copy);
  };

  const onAddMessage = (chatId: string, newMessage: Message) => {
    if (newMessage.text) {
      setMessages({
        ...messages,
        [chatId]: [...messages[chatId], newMessage],
      });
    }
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
                      <ChatList
                        chats={chats}
                        onAddChat={onAddChat}
                        onRemoveChat={onRemoveChat}
                        toggle={toggle}
                      />
                    }
                  />
                  <Route
                    path=":chatId"
                    element={
                      <ChatPage
                        chats={chats}
                        messages={messages}
                        onAddChat={onAddChat}
                        onRemoveChat={onRemoveChat}
                        onAddMessage={onAddMessage}
                        toggle={toggle}
                      />
                    }
                  />
                </Route>
              </Route>

              <Route path="*" element={<h2 className={style.error}>404 page</h2>} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </Suspense>
    </Provider>
  );
};

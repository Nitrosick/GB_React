import { nanoid } from 'nanoid';
import { FC, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Message, Messages, Chat } from 'src/common-types';

import { ChatList } from 'src/components/ChatList/ChatList';
import { Header } from 'src/components/Header/Header';

import { ChatPage } from 'src/pages/ChatPage';
import { Main } from 'src/pages/Main';
import { Profile } from 'src/pages/Profile';

import style from './App.module.css';

const defaultMessages: Messages = {
  first: [],
};

export const App: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
    const [messages, setMessages] = useState(defaultMessages);

    const chats = useMemo(
      () =>
        Object.keys(messages).map((chat) => ({
          id: nanoid(),
          name: chat,
        })),
      [Object.keys(messages).length]
    );

    const onAddChat = (chat: Chat) => {
      setMessages({
        ...messages,
        [chat.name]: [],
      });
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header toggle={toggle} setToggle={setToggle} />}>
          <Route index element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chats">
            <Route
              index
              element={<ChatList chats={chats} onAddChat={onAddChat} />}
            />
            <Route
              path=":chatId"
              element={
                <ChatPage
                  chats={chats}
                  onAddChat={onAddChat}
                  messages={messages}
                  onAddMessage={onAddMessage}
                />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<h2 className={style.error}>404 page</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

import { FC } from 'react';
import { Form } from 'components/Form/Form';
import { ChatList } from 'components/ChatList/ChatList';
import { MessageList } from 'components/MessagesList/MessagesList';
import { Navigate, useParams } from 'react-router-dom';

import style from 'components/AppRouter/AppRouter.module.css';

interface ChatPageProps {
  toggle: boolean;
  chats: any[];
  messagesDB: any;
}

export const ChatPage: FC<ChatPageProps> = ({ toggle, chats, messagesDB }) => {
  const { chatId } = useParams();

  if (chatId && !messagesDB.find((chat: any) => chat?.name === chatId)) {
    console.log('redirect');
    return <Navigate to="/chats" replace />;
  }

  const messages = Object.entries(
    messagesDB.find((chat: any) => chat?.name === chatId).messageList
  ).map((message: any) => ({
    id: message[0],
    author: message[1].author,
    text: message[1].text,
    side: message[1].side,
  }));

  return (
    <>
      <ChatList toggle={toggle} chats={chats} messagesDB={messagesDB} />
      <div className={style.chat}>
        <MessageList messages={chatId ? messages : []} />
        <Form />
      </div>
    </>
  );
};

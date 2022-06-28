import { FC } from 'react';
import { Form } from 'components/Form/Form';
import { ChatList } from 'components/ChatList/ChatList';
import { MessageList } from 'components/MessagesList/MessagesList';
import { Navigate, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { selectMessages } from 'src/store/messages/selectors';

import style from 'components/AppRouter/AppRouter.module.css';

export interface ChatPageProps {
  toggle: boolean;
}

export const ChatPage: FC<ChatPageProps> = ({ toggle }) => {
  const { chatId } = useParams();
  const messages = useSelector(selectMessages, shallowEqual);

  // const handleAddMessage = useCallback(
  //   (message: Message) => {
  //     if (chatId) {
  //       onAddMessage(chatId, message);
  //     }
  //   },
  //   [chatId, onAddMessage]
  // );

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" />;
  }

  return (
    <>
      <ChatList toggle={toggle} />
      <div className={style.chat}>
        <MessageList messages={chatId ? messages[chatId] : []} />
        <Form />
      </div>
    </>
  );
};

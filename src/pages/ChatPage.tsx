import { FC, useCallback, useEffect } from 'react';
import { Form } from 'src/components/Form/Form';
import { MessageList } from 'src/components/MessagesList/MessagesList';
import { ChatList } from 'src/components/ChatList/ChatList';
import { Message, Messages, Chat } from 'src/common-types';
import { Navigate, useParams } from 'react-router-dom';

import style from 'src/App.module.css';

interface ChatPageProps {
  chats: Chat[];
  messages: Messages;
  toggle: boolean;
  onAddChat: (chat: Chat) => void;
  onRemoveChat: (id: string) => void;
  onAddMessage: (id: string, msg: Message) => void;
}

export const ChatPage: FC<ChatPageProps> = ({
  chats,
  messages,
  toggle,
  onAddChat,
  onRemoveChat,
  onAddMessage,
}) => {
  const { chatId } = useParams();

  useEffect(() => {
    if (
      chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author !== 'Robot'
    ) {
      const author: string =
        messages[chatId][messages[chatId].length - 1].author;

      if (author !== 'Robot') {
        const timer = setTimeout(() => {
          onAddMessage(chatId, {
            author: 'Robot',
            text: author + ' wrote a new message.',
            side: 'right',
          });

          clearTimeout(timer);
        }, 1500);
      }
    }
  }, [chatId, messages, onAddMessage]);

  const handleAddMessage = useCallback(
    (message: Message) => {
      if (chatId) {
        onAddMessage(chatId, message);
      }
    },
    [chatId, onAddMessage]
  );

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <>
      <ChatList
        chats={chats}
        onAddChat={onAddChat}
        onRemoveChat={onRemoveChat}
        toggle={toggle}
      />
      <div className={style.chat}>
        <MessageList messages={chatId ? messages[chatId] : []} />
        <Form addMessage={handleAddMessage} />
      </div>
    </>
  );
};

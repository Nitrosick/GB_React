import { FC, useCallback } from 'react';
import { useEffect } from 'react';
import { Form } from 'src/components/Form/Form';
import { MessageList } from 'src/components/MessagesList/MessagesList';
import { Message, Messages, Chat } from 'src/common-types';
import { ChatList } from 'src/components/ChatList/ChatList';
import { Navigate, useParams } from 'react-router-dom';
import style from 'src/App.module.css';

interface ChatPageProps {
  chats: Chat[];
  messages: Messages;
  onAddChat: (chat: Chat) => void;
  onAddMessage: (id: string, msg: Message) => void;
}

export const ChatPage: FC<ChatPageProps> = ({
  chats,
  onAddChat,
  messages,
  onAddMessage,
}) => {
  const { chatId } = useParams();

  useEffect(() => {
    if (
        chatId &&
        messages[chatId]?.length > 0 &&
        messages[chatId][messages[chatId].length - 1].author !== 'Robot'
    ) {
      const author: string = messages[chatId][messages[chatId].length - 1].author;

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
  }, [chatId, messages]);

  const handleAddMessage = useCallback(
    (message: Message) => {
      if (chatId) {
        onAddMessage(chatId, message);
      }
    },
    [chatId]
  );

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <>
      <ChatList chats={chats} onAddChat={onAddChat} />
      <div className={style.chat}>
        <MessageList messages={chatId ? messages[chatId] : []} />
        <Form addMessage={handleAddMessage} />
      </div>
    </>
  );
};
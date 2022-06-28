import { FC } from 'react';
import { Message } from 'src/common-types';
import style from './MessagesList.module.css';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: FC<MessageListProps> = ({ messages }) => (
  <>
    <ul>
      {messages.map((message: Message, idx) => (
        <li
          className={`${style.message} ${
            message.side === 'left' ? style.message_left : style.message_right
          }`}
          key={idx}
          data-testid="li"
        >
          <span className={style.message_author}>{message.author}</span>
          &nbsp;|&nbsp;
          <span className={style.message_text} data-testid="message">
            {message.text}
          </span>
        </li>
      ))}
    </ul>
  </>
);

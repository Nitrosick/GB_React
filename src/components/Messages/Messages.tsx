import { FC } from 'react';
import style from './Messages.module.css';
import { Message } from '../../common';

interface MessageProps {
  messageList: Message[];
}

export const Messages: FC<MessageProps> = ({ messageList }) => (
  <>
    <ul>
      {messageList.map((message: Message, idx) => (
        <li
          className={`${style.message} ${
            message.side === 'left' ? style.message_left : style.message_right
          }`}
          key={idx}
        >
          <span className={style.message_author}>{message.author}</span>
          &nbsp;|&nbsp;
          <span className={style.message_text}>{message.text}</span>
        </li>
      ))}
    </ul>
  </>
);

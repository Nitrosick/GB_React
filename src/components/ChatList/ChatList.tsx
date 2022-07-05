import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { push, remove, set } from 'firebase/database';
import {
  getChatById,
  getMessageListById,
  messagesRef,
} from 'src/services/firebase';

import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './ChatList.module.css';

interface ChatListProps {
  toggle: boolean;
  chats: any[];
  messagesDB: any;
}

export const ChatList: FC<ChatListProps> = ({ toggle, chats, messagesDB }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      set(messagesRef, {
        ...messagesDB,
        [value]: {
          name: value,
        },
      });

      push(getMessageListById(value), {
        author: 'Robot',
        text: 'Chat has been created',
        side: 'right',
      });

      setValue('');
    }
  };

  const handleRemove = (chatId: string) => {
    remove(getChatById(chatId));
  };

  return (
    <div
      className={style.chatlist + ' ' + (!toggle ? style.chatlist_hidden : '')}
    >
      <MUIList disablePadding>
        {chats.map((chat, idx) => (
          <MUIListItem className={style.chatlist_item} key={idx} disablePadding>
            <Link
              className={style.chatlist_item_link}
              to={`/chats/${chat.name}`}
            >
              {chat.name}
            </Link>
            <button
              className={style.chatlist_item_remove}
              onClick={() => handleRemove(chat.id)}
            >
              X
            </button>
          </MUIListItem>
        ))}
      </MUIList>

      <form className={style.form} action="#" onSubmit={handleSubmit}>
        <MUIInput
          id={style.chat_input}
          type="text"
          value={value}
          placeholder="Chat name..."
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />

        <MUIButton id={style.chat_add} type="submit" variant="outlined">
          Add
        </MUIButton>
      </form>
    </div>
  );
};

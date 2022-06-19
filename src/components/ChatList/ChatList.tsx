import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from 'src/common-types';

import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './ChatList.module.css';

interface ChatListProps {
  chats: Chat[];
  toggle: boolean;
  onAddChat: (chat: Chat) => void;
  onRemoveChat: (id: string) => void;
}

export const ChatList: FC<ChatListProps> = ({
  chats,
  toggle,
  onAddChat,
  onRemoveChat,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (value) {
      onAddChat({
        id: nanoid(),
        name: value,
      });

      setValue('');
    }
  };

  const handleRemove = (name: string) => {
    onRemoveChat(name);
  };

  return (
    <>
      <div
        className={
          style.chatlist + ' ' + (!toggle ? style.chatlist_hidden : '')
        }
      >
        <MUIList disablePadding>
          {chats.map((chat: Chat) => (
            <MUIListItem
              className={style.chatlist_item}
              key={chat.id}
              disablePadding
            >
              <Link
                className={style.chatlist_item_link}
                to={`/chats/${chat.name}`}
              >
                {chat.name}
              </Link>
              <button
                className={style.chatlist_item_remove}
                onClick={() => handleRemove(chat.name)}
              >
                X
              </button>
            </MUIListItem>
          ))}
        </MUIList>

        <form className={style.form} action="#">
          <MUIInput
            id={style.chat_input}
            type="text"
            value={value}
            placeholder="Chat name..."
            onChange={handleChange}
            fullWidth
          />

          <MUIButton
            id={style.chat_add}
            type="submit"
            variant="outlined"
            onClick={handleSubmit}
          >
            Add
          </MUIButton>
        </form>
      </div>
    </>
  );
};

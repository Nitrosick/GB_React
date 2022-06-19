import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, removeChat } from 'src/store/messages/actions';
import { selectChats } from 'src/store/messages/selectors';

import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './ChatList.module.css';

export interface ChatListProps {
  toggle: boolean;
}

export const ChatList: FC<ChatListProps> = ({ toggle }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const chats = useSelector(
    selectChats,
    (prev, next) => prev.length === next.length
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (value) {
      dispatch(addChat(value));
      setValue('');
    }
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
              onClick={() => dispatch(removeChat(chat.name))}
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
          onChange={(e) => setValue(e.target.value)}
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
  );
};

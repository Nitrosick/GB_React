import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIListItemButton from '@mui/material/ListItemButton';
import MUIListItemText from '@mui/material/ListItemText';
import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';
import { Chat } from 'src/common-types';

import style from './ChatList.module.css';

interface ChatListProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
}

export const ChatList: FC<ChatListProps> = ({ chats, onAddChat }) => {
  const [value, setValue] = useState('');
  const [chat, setChat] = useState<Chat>({
    id: '0',
    name: '',
  });

  const changeChatInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setChat({ id: '0', name: e.target.value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
    changeChatInfo(e);
  };

  const handleClick = () => {
    onAddChat(chat);
    setChat({ id: '0', name: '' });
    setValue('');
  };

  return (
    <>
      <div className={style.chatlist}>
        <MUIList disablePadding>
          {chats.map((chat: Chat) => (
            <MUIListItem key={chat.id} disablePadding>
              <MUIListItemButton>
                <MUIListItemText>
                  <Link className={style.chatlist_item} to={`/chats/${chat.name}`}>{chat.name}</Link>
                </MUIListItemText>
              </MUIListItemButton>
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
            onClick={handleClick}
          >
            Add
          </MUIButton>
        </form>
      </div>
    </>
  );
};

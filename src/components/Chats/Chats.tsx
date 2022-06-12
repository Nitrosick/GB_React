import { FC } from 'react';
import style from './Chats.module.css';
import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIListItemButton from '@mui/material/ListItemButton';
import MUIListItemText from '@mui/material/ListItemText';
import { Chat } from '../../common';

interface ChatProps {
  chatsList: Chat[];
}

export const Chats: FC<ChatProps> = ({ chatsList }) => (
  <>
    <MUIList disablePadding>
      {chatsList.map((chat: Chat) => (
        <MUIListItem key={chat.id} disablePadding>
          <MUIListItemButton>
            <MUIListItemText>{chat.name}</MUIListItemText>
          </MUIListItemButton>
        </MUIListItem>
      ))}
    </MUIList>
  </>
);

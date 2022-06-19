import React, { FC, memo, useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessageWithReply } from 'src/store/messages/actions';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Form.module.css';
import { ThunkDispatch } from 'redux-thunk';

export const Form: FC = memo(() => {
  const [value, setValue] = useState('');
  const input: React.RefObject<HTMLInputElement> = createRef();
  const { chatId } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, void, any>>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (chatId) {
      dispatch(
        addMessageWithReply(chatId, {
          author: 'User',
          text: value,
          side: 'left',
        })
      );
    }

    setValue('');

    if (input.current) {
      input.current.focus();
    }
  };

  return (
    <>
      <form className={style.form} action="#">
        <MUIInput
          id={style.message_input}
          type="text"
          value={value}
          ref={input}
          placeholder="Your message..."
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          autoFocus
        />

        <MUIButton
          id={style.message_send}
          data-id="send"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Send
        </MUIButton>
      </form>
    </>
  );
});

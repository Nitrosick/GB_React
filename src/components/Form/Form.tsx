import React, { FC } from 'react';
import { useState, createRef } from 'react';
import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';
import style from './Form.module.css';
import { Message } from '../../common';

interface FormProps {
  sendMessage: (msg: Message) => void;
}

export const Form: FC<FormProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState<Message>({
    author: '',
    text: '',
    side: '',
  });
  const [currentValue, setcurrentValue] = useState('');
  const input: any = createRef();

  const changeMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMessage({ author: 'Author', text: e.target.value, side: 'left' });
  };

  return (
    <>
      <form className={style.form} action="#">
        <MUIInput
          id={style.message_input}
          type="text"
          value={currentValue}
          ref={input}
          placeholder="Your message..."
          onChange={(e) => {
            changeMessage(e);
            setcurrentValue(e.target.value);
          }}
          fullWidth
          autoFocus
        />

        <MUIButton
          id={style.message_send}
          type="submit"
          variant="contained"
          onClick={() => {
            sendMessage(message);
            setcurrentValue('');
            input.current.focus();
          }}
        >
          Send
        </MUIButton>
      </form>
    </>
  );
};

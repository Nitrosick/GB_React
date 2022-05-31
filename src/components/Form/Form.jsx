import { useState, createRef } from 'react';
import style from './Form.module.css';

export const Form = (props) => {
  const [message, setMessage] = useState({ author: 'Author', text: null });
  const input = createRef();

  const changeMessage = (e) => {
    setMessage({ author: 'Author', text: e.target.value });
  };

  return (
    <>
      <form className={style.form} action="#">
        <input
          id={style.message_input}
          type="text"
          placeholder="Your message..."
          onChange={changeMessage}
          ref={input}
        />
        <button
          id={style.message_send}
          onClick={() => {
            props.sendMessage(message);
            input.current.value = '';
          }}
        >
          Send
        </button>
      </form>
    </>
  );
};

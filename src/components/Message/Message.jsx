import { useState, createRef } from 'react';
import style from './Message.module.css';

export const Message = (props) => {
  const [message, setMessage] = useState({ author: 'Author', text: null });
  const input = createRef();

  const changeMessage = (e) => {
    setMessage({ author: 'Author', text: e.target.value });
  };

  return (
    <>
      <ul>
        {props.messageList.map((message, idx) => (
          <li className={style.message} key={idx}>
            <span className={style.message_author}>{message.author}</span>
            &nbsp;|&nbsp;
            <span className={style.message_text}>{message.text}</span>
          </li>
        ))}
      </ul>

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

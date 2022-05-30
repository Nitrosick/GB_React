import { useState } from 'react';
import style from './Message.module.css';

export const Message = (props) => {
  const [message, setMessage] = useState({ author: "Author", text: null });

  const changeMessage = (e) => {
    setMessage({ author: "Author", text: e.target.value });
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
          placeholder="Input a message"
          onChange={changeMessage}
        />
        <button
          id={style.message_send}
          onClick={(e) => { props.sendMessage(e, message) }}
        >Send</button>
      </form>
    </>
  );
};

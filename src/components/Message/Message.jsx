import style from './Message.module.css';

export const Message = (props) => {
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
    </>
  );
};

import { useState, useEffect } from 'react';
import { Message } from '../Message/Message';
import { Form } from '../Form/Form';
// import icon from '../../images/arrow.png';
import style from './App.module.css';

export const App = () => {
  const [toggle, setToggle] = useState(true);
  const [messageList, setMessageList] = useState([]);

  const sendMessage = (value) => {
    setMessageList([...messageList, value]);
  };

  useEffect(() => {
    if (messageList.length > 0) {
      const author = messageList[messageList.length - 1].author;

      if (author !== 'Robot') {
        const timer = setTimeout(() => {
          sendMessage({
            author: 'Robot',
            text: author + ' wrote a new message.',
          });
          clearTimeout(timer);
        }, 1500);
      }
    }
  }, [messageList]);

  return (
    <>
      <div className={style.content_block}>
        <button
          className={style.switcher}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {/* <img
            className={
              toggle
                ? style.switcher_icon
                : style.switcher_icon + ' ' + style.switcher_icon_off
            }
            src={icon}
            width="25"
            height="25"
            alt="icon"
          /> */}
        </button>
      </div>

      {toggle && (
        <div className={style.content_block}>
          <Message messageList={messageList} />
          <Form sendMessage={sendMessage} />
        </div>
      )}
    </>
  );
};

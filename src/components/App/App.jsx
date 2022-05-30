import { useState, useEffect } from 'react';
import { Message } from '../Message/Message';
import style from './App.module.css';

export const App = () => {
  const [toggle, setToggle] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [robotMessage, setRobotMessage] = useState('');

  const sendMessage = (e, value) => {
    let copy = Object.assign([], messageList);
    copy.push(value);
    setMessageList(copy);
  };

  useEffect(() => {
    if (messageList.length > 0) {
      setTimeout(
        () =>
          setRobotMessage(
            messageList[messageList.length - 1].author + ' wrote a new message.'
          ),
        1000
      );
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
          <img
            className={
              toggle
                ? style.switcher_icon
                : style.switcher_icon + ' ' + style.switcher_icon_off
            }
            src="./images/arrow.png"
            width="25"
            height="25"
            alt="icon"
          ></img>
        </button>
      </div>

      {toggle && (
        <div className={style.content_block}>
          <Message messageList={messageList} sendMessage={sendMessage} />
        </div>
      )}

      <div className={style.plug}></div>

      <div className={style.content_block}>
        <span>{robotMessage}</span>
      </div>
    </>
  );
};

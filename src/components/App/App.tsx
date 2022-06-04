import { FC } from 'react';
import { useState, useEffect } from 'react';
import { Messages } from '../Messages/Messages';
import { Chats } from '../Chats/Chats';
import { Form } from '../Form/Form';
import icon from '../../images/arrow.png';
import style from './App.module.css';
import { Message, Chat } from '../../common';

export const App: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [chatsList, setChatsList] = useState<Chat[]>([
    { id: 1, name: 'First chat' },
    { id: 2, name: 'Second chat' },
    { id: 3, name: 'Third chat' },
  ]);

  const sendMessage = (value: Message) => {
    setMessageList([...messageList, value]);
  };

  useEffect(() => {
    if (messageList.length > 0) {
      const author: string = messageList[messageList.length - 1].author;

      if (author !== 'Robot') {
        const timer = setTimeout(() => {
          sendMessage({
            author: 'Robot',
            text: author + ' wrote a new message.',
            side: 'right',
          });

          clearTimeout(timer);
        }, 1500);
      }
    }
  }, [messageList]);

  return (
    <>
      <div className={`${style.content_block} ${style.chats}`}>
        <Chats chatsList={chatsList} />
      </div>

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
            src={icon}
            width="25"
            height="25"
            alt="icon"
          />
        </button>
      </div>

      {toggle && (
        <div className={style.content_block}>
          <Messages messageList={messageList} />
          <Form sendMessage={sendMessage} />
        </div>
      )}
    </>
  );
};

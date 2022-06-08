// import { FC } from 'react';
// import { useState, useEffect } from 'react';
// import { Header } from '../Header/Header';
// import { Messages } from '../MessagesList/MessagesList';
// import { ChatList } from '../ChatList/ChatList';
// import { Form } from '../Form/Form';
// import style from './App.module.css';
// import { Message, Chat } from '../../common-types';

// export const App: FC = () => {
//   const [toggle, setToggle] = useState<boolean>(true);
//   const [messageList, setMessageList] = useState<Message[]>([]);
//   const [chatsList, setChatsList] = useState<Chat[]>([
//     { id: 1, name: 'First chat' },
//     { id: 2, name: 'Second chat' },
//     { id: 3, name: 'Third chat' },
//   ]);

//   const sendMessage = (value: Message) => {
//     if (value.text) {
//       setMessageList([...messageList, value]);
//     }
//   };

//   const addChat = (value: Chat) => {
//     if (value.name) {
//       if (chatsList.length > 0) {
//         value.id = chatsList[chatsList.length - 1].id + 1;
//       } else {
//         value.id = 1;
//       }
//       setChatsList([...chatsList, value]);
//     }
//   };

//   useEffect(() => {
//     if (messageList.length > 0) {
//       const author: string = messageList[messageList.length - 1].author;

//       if (author !== 'Robot') {
//         const timer = setTimeout(() => {
//           sendMessage({
//             author: 'Robot',
//             text: author + ' wrote a new message.',
//             side: 'right',
//           });

//           clearTimeout(timer);
//         }, 1500);
//       }
//     }
//   }, [messageList]);

//   return (
//     <>
//       <header className={`${style.content_block} ${style.header}`}>
//         <Header toggle={toggle} setToggle={setToggle} />
//       </header>

//       <div className={`${style.content_block} ${style.chats}`}>
//         <ChatList chatsList={chatsList} addChat={addChat} />
//       </div>

//       {toggle && (
//         <div className={`${style.content_block} ${style.messages}`}>
//           <Messages messageList={messageList} />
//           <Form sendMessage={sendMessage} />
//         </div>
//       )}
//     </>
//   );
// };

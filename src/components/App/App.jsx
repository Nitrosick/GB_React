import { useState } from "react";
import { Message } from "../Message/Message";
import style from './App.module.css';

export const App = () => {
    const [toggle, setToggle] = useState(true);
    const [message, setMessage] = useState('Lorem ipsum dolor sit amet.');
    const array = [1,2,3,4,5];

    const changeMessage = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <div className={style.content_block}>
                <button className={style.switcher} onClick={() => {setToggle(!toggle)}}>
                    <img className={toggle ? style.switcher_icon : style.switcher_icon + ' ' + style.switcher_icon_off } src="./images/arrow.png" width="25" height="25" alt="icon"></img>
                </button>
            </div>

            {toggle &&
                <div className={style.content_block}>
                    <Message message={message} />
                </div>
            }

            <div className={style.content_block}>
                <input id={style.change_message} type='text' onChange={changeMessage} value={message} />

                <ul>
                    {array.map(num => <li key={num}>{num}</li>)}
                </ul>
            </div>
        </>
    )
};
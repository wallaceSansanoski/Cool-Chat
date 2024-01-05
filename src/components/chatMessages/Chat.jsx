import { useContext } from 'react';
import Header from '../header/Header';
import InputMessage from '../inputMessage/Input';
import MessagesChat from '../messagesChat/MessagesChat';
import style from './chat.module.css'
import { ContextStyle } from '../../ContextStyle/contextStyle';

const ChatMessage = () => {

    const { changeInterfaceState } = useContext(ContextStyle)

    return (
        <div className={style.containerMessage} style={{ zIndex : changeInterfaceState.change ? 1 : 0}}>
            <Header/>
            <MessagesChat/>
            <InputMessage/>
        </div>
    )
}

export default ChatMessage;
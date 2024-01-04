import Header from '../header/Header';
import InputMessage from '../inputMessage/Input';
import MessagesChat from '../messagesChat/MessagesChat';
import style from './chat.module.css'

const ChatMessage = () => {
    return (
        <div className={style.containerMessage}>

            <Header/>
            <MessagesChat/>
            <InputMessage/>
        </div>
    )
}

export default ChatMessage;
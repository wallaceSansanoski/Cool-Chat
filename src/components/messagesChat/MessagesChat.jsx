import { useContext, useState, useEffect, useRef} from 'react';
import { CurrentChatContext } from '../../AuthContext/currentChatContext';
import { authContext } from '../../AuthContext/authContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../service/db';
import style from '../messagesChat/messagesChat.module.css'
import CurrentUserMessage from '../currentUserMessage/CurrentUserMessage';
import UserFriendMessage from '../userFriendMessage/UserFriendMessage';

const MessagesChat = () => {

    const currentUser = useContext(authContext)
    const { state: user } = useContext(CurrentChatContext)

    const currentUserTalking = currentUser.uid + user.user.uid
    const freindCurrentUserTalking = user.user.uid + currentUser.uid

    const [currentUserMessages, setCurrentuserMessages] = useState()
    const [friendUserMessages, setFrienduserMessages] = useState()
    const [allMessages, setAllMessages] = useState([])

    const  container = useRef()


    useEffect(() => {

     setAllMessages([])

        onSnapshot(doc(db, "chats", currentUserTalking), (doc) => {
            setCurrentuserMessages(doc.data()?.messages)
        });

        onSnapshot(doc(db, "chats", freindCurrentUserTalking), (doc) => {
            setFrienduserMessages(doc.data()?.messages)
        });

    }, [user.user.uid])

    useEffect(() => {

        if (currentUserMessages, friendUserMessages) {
            setAllMessages(([...currentUserMessages, ...friendUserMessages]).sort((timeA, timeB) => timeA.date.seconds - timeB.date.seconds))
        }
    }, [currentUserMessages, friendUserMessages])

    useEffect(() => {
         container.current.scrollTo({top : container.current.scrollHeight  , behavior : 'smooth'})   
        }, [currentUserMessages, friendUserMessages, allMessages])
        

    return (
        <div className={style.wrapperMessage} ref={container}>
            <div className={style.divC}  >
            {
                allMessages.map((messages) => {
                    if (messages.sender === currentUser.uid) {
                        return <CurrentUserMessage key={messages.id} message={messages}/>

                    }

                    if (messages.sender === user.user.uid) {
                        return <UserFriendMessage key={messages.id} message={messages} />
                    }
                })
            }
            </div>
        </div>
    )
}
export default MessagesChat;
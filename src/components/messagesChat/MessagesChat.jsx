import { useContext, useState, useEffect, useRef } from 'react';
import { CurrentChatContext } from '../../AuthContext/currentChatContext';
import { authContext } from '../../AuthContext/authContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../service/db';
import style from '../messagesChat/messagesChat.module.css'
import CurrentUserMessage from '../currentUserMessage/CurrentUserMessage';
import UserFriendMessage from '../userFriendMessage/UserFriendMessage';

const MessagesChat = () => {

    const currentUser = useContext(authContext)
    const { state: friendOfUser } = useContext(CurrentChatContext)

    const currentUserTalking = currentUser.uid + friendOfUser.user.uid
    const freindCurrentUserTalking = friendOfUser.user.uid + currentUser.uid

    const [currentUserMessages, setCurrentuserMessages] = useState()
    const [friendUserMessages, setFrienduserMessages] = useState()
    const [allMessages, setAllMessages] = useState([])

    const container = useRef()


    useEffect(() => {

        onSnapshot(doc(db, "chats", currentUserTalking), (doc) => {
            setCurrentuserMessages(doc.data()?.messages)
        });

        onSnapshot(doc(db, "chats", freindCurrentUserTalking), (doc) => {
            setFrienduserMessages(doc.data()?.messages)
        });

    }, [friendOfUser.user.uid])

    useEffect(() => {

        const bothUsersConected = currentUserMessages && freindCurrentUserTalking

        if (bothUsersConected) {
            setAllMessages(([...currentUserMessages, ...friendUserMessages])
                .sort((timeA, timeB) => timeA.date.seconds - timeB.date.seconds))
        }

    }, [currentUserMessages, friendUserMessages])

    useEffect(() => {
        container.current.scrollTo({ top: container.current.scrollHeight, behavior: 'smooth' })
    }, [currentUserMessages, friendUserMessages, allMessages])


    return (
        <div className={style.wrapperMessage} ref={container}>
            <div className={style.divC}  >
                {
                    allMessages.map((messages) => {
                        const userTalking = messages.sender === currentUser.uid

                        return userTalking
                            ? <CurrentUserMessage key={messages.id} message={messages} />
                            : <UserFriendMessage key={messages.id} message={messages} />
                    })
                }
            </div>
        </div>
    )
}
export default MessagesChat;
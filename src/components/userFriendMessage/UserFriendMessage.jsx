import { CurrentChatContext } from '../../AuthContext/currentChatContext';
import style from './useFriendMessage.module.css'
import { useContext } from 'react';

const UserFriendMessage = ({message}) => {

    const { state : user } = useContext(CurrentChatContext)

    const time = message.date.toDate()
    const hour = time.getHours()
    const minutes = time.getMinutes()

    return (
        <div className={style.containerMessage}>
        <div className={style.boxMessage} >
                {
                    message.image
                        ? <img className={style.imageUser} src={message.image} alt='image sended by user' />
                        : <p className={style.messageUser} >{message.text}</p>
                }
            <p className={style.time}>{`${hour}:${minutes}`}</p>
        </div>
        <img className={style.currentUserImage} src={user.user.photoURL}/>
    </div>
    )
}

export default UserFriendMessage;
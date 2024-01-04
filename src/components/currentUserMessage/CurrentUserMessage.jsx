import { authContext } from '../../AuthContext/authContext';
import style from './currentUserMessage.module.css'
import { useContext } from 'react';

const CurrentUserMessage = ({message}) => {

    const currentUser = useContext(authContext)

    const time = message.date.toDate()
    const hour = time.getHours()
    const minutes = time.getMinutes()

    return (
        <div className={style.containerMessage}>
            <img className={style.currentUserImage} src={currentUser.photoURL} />
            <div className={style.boxMessage} >
            <p className={style.time}>{`${hour}:${minutes}`}</p>
            {message.image ? <img className={style.imageUser} src={message.image}  alt='image sended by user' /> : <p className={style.messageUser} >{message.text}</p>}
            </div>
        </div>
    )

}

export default CurrentUserMessage;
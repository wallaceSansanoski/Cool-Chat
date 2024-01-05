import style from './SingleContact.module.css'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../service/db';
import { useContext } from 'react';
import { authContext } from '../../AuthContext/authContext';
import { CurrentChatContext } from '../../AuthContext/currentChatContext';
import { ContextStyle } from '../../ContextStyle/contextStyle';


const SingleContact = ({ listUsers }) => {

    const currentUser = useContext(authContext)
    const { dispatch : changeUserChatContextFn } = useContext(CurrentChatContext)
    const { dispatch } = useContext(ContextStyle)

    const handleClickUser = async (e) => {

        const userUID = e.target.title

        try {

            const docRefUser = doc(db, "users", userUID);
            const docSnap = await getDoc(docRefUser);
            const combinedID = currentUser.uid + docSnap.data().uid

            changeUserChatContextFn({ type: 'CHANGE_USER', payload: docSnap.data() })

            const res = await getDoc(doc(db, "chats", combinedID))

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedID), {
                    'messages': []
                })
            }

            dispatch({ type : 'CHANGE_TRUE'})

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        listUsers.length > 0 && listUsers.map(({userInfo}) => (
            <div className={style.wrapperSingleContact} key={userInfo.uid} title={userInfo.uid} onClick={handleClickUser}>
                <div>
                    <img className={style.avatarImage} src={userInfo.photoURL} alt="avatar image user" />
                </div>
                <div>
                    <span className={style.userName} title={userInfo.uid} >{userInfo.displayName}</span>
                    <p className={style.status} title={userInfo.uid} >{userInfo?.lastedMessage}</p>
                </div>
            </div>
        ))

    )
}

export default SingleContact;
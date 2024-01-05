import SingleContact from '../singleContact/SingleContact';
import style from './listUsers.module.css'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../../service/db';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../AuthContext/authContext';

const ListUsers = () => {

    const [listUsers, setLIstUsers] = useState([])
    const currentUser = useContext(authContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setLIstUsers(Object.values(doc.data()))
        });

        return () => unsub()
    }, [currentUser.uid])

    return (
        <div className={style.wrapperContacts}>
            <SingleContact listUsers={listUsers} />
        </div>
    )
}

export default ListUsers;
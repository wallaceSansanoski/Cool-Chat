import style from './navibar.module.css'
import { useContext, useState } from 'react'
import { authContext } from '../../AuthContext/authContext'
import { signOut } from "firebase/auth";
import { auth, db } from '../../service/db';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";

const Navibar = () => {

    const [user, setUser] = useState()
    const currentUser = useContext(authContext)
    const navigate = useNavigate()


    onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setUser(doc.data())
    });

    const handleLogoutUser = () => {
        signOut(auth)
        navigate('/')
    }

    return (

        <div className={style.wrapperTitles}>
            <div className={style.infoUser}>
                <div className={style.wrapperImage}>
                    <img className={style.imageAvatar} src={user?.photoURL} alt="avatar image user" />
                </div>
                <span className={style.userName} >{user?.displayName}</span>
            </div>
            <button className={style.btnLogout} onClick={handleLogoutUser}>logout</button>
        </div>
    )
}

export default Navibar;
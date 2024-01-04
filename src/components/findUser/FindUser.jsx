import style from './findUser.module.css'
import { useState, useContext } from 'react';
import { collection, query, where, getDoc, onSnapshot, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../../service/db';
import SingleContact from '../singleContact/SingleContact';
import ListUsers from '../listUsers/ListUsers';
import { authContext } from '../../AuthContext/authContext';

const FindUser = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const currentUser = useContext(authContext)

    const handleKey = e => e.code === 'Enter' && handleSearch()

    const handleSearch = async e => {

        try {
            const q = query(collection(db, "users"), where("displayName", "==", searchQuery.toLocaleLowerCase()));
        
            onSnapshot(q, (querySnapshot) => {
                setError(querySnapshot.empty)
                querySnapshot.forEach((doc) => {
                    setUser(doc.data())
                })
            });

        } catch (error) {
            console.log(error)
        }

    }

    const handleClickUser = async () => {

        const combainedID = currentUser.uid + user.uid
        const docRef = doc(db, "userChats", currentUser.uid);
        const docSnap = await getDoc(docRef);

        try {

            if (!docSnap.exists()) {

                await setDoc(doc(db, "userChats", currentUser.uid), {
                    [combainedID]: {
                        "userInfo": {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        }
                    }
                })
            } 

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combainedID]: {
                    "userInfo": {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    }
                }
            })

        } catch (error) {
            console.log(error)
        }

        setUser(null)
        setError(false)
    }

    return (
        <>
            <div className={style.findUser}>
                <input
                    type='text'
                    placeholder="Find Contact"
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setError("")
                        setUser("")
                    }}
                    onKeyDown={handleKey}
                />
            </div>

            {
                error && (
                    <div className={style.notFoundUsert}>
                        <span>User was not found</span>
                    </div>
                )
            }
            {
                user && (
                    <div className={style.containerSingeContact} onClick={handleClickUser}>
                        <div className={style.wrapperSingleContact} >
                            <div>
                                <img className={style.avatarImage} src={user.photoURL} alt="avatar image user" />
                            </div>
                            <div>
                                <span className={style.userName}>{user.displayName}</span>
                                <p className={style.status}>{user.lastMessage}</p>
                            </div>
                        </div>
                    </div>

                )
                
            }
        </>
    )
}

export default FindUser;
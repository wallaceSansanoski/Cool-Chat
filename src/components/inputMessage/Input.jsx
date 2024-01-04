import style from './input.module.css'
import { IoIosImages } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";
import { useContext, useState } from 'react';
import { CurrentChatContext } from '../../AuthContext/currentChatContext';
import { authContext } from '../../AuthContext/authContext';
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from '../../service/db';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const InputMessage = () => {

    const [image, setImage] = useState(null)
    const [text, setText] = useState('')
    const [ loadingImage, setLoadingImage ] = useState(false)

    const currentUser = useContext(authContext)
    const { state: userWhoWannaTalk } = useContext(CurrentChatContext)

    const handleSubmit = async e => {
        e.preventDefault()

        if(!text.length && image.length === 0 ) return     

        const combainedID =  currentUser.uid + userWhoWannaTalk.user.uid 
        const docRef = doc(db, "chats", combainedID);
        if (image) {
            
            const storage = getStorage();
            const storageRef = ref(storage, `imagens/${uuidv4()}`);

            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    setLoadingImage(!snapshot.metadata)
                },
                (error) => {
                   console.log(error)
                },
                async () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await  updateDoc(docRef, {
                            "messages": arrayUnion({
                                id: uuidv4(),
                                sender: currentUser.uid,
                                date: Timestamp.now(),
                                image: downloadURL
                            })
                        });
                    });
                    setLoadingImage(false)
                })

        } else {

            await updateDoc(docRef, {
                "messages": arrayUnion({
                    id: uuidv4(),
                    text,
                    sender: currentUser.uid,
                    date: Timestamp.now()
                })
            });
        }

        await updateDoc(doc(db,"userChats", userWhoWannaTalk.user.uid), {
            [ userWhoWannaTalk.user.uid + currentUser.uid] : {
                "userInfo" : {
                    uid : currentUser.uid,
                    displayName : currentUser.displayName,
                    photoURL : currentUser.photoURL,
                    lastedMessage : text,
                    date : Timestamp.now()
                }
            }
        })
        
      setText("")
      setImage("")
    }

    return (
        <div>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <label >
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <span key='sendImage' className={style.sendImage}> <IoIosImages/> </span>
                </label>

                <span key='attach' className={style.attach}> <IoIosAttach/> </span>
                <button disabled={loadingImage ? true : false} className={style.btn} style={{ opacity : loadingImage ? .3 : .9}} > Send </button>
            </form>
        </div>
    )
}

export default InputMessage;
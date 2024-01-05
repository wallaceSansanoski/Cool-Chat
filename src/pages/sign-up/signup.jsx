import { Link, useNavigate } from 'react-router-dom'
import style from './signup.module.css'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useRef, useState } from 'react';
import { authUser } from '../../hooks/authUser';
import image from '../../images/avatar/download.png'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../service/db';
import { setDoc, doc } from 'firebase/firestore';

const Signup = () => {

    const reference = useRef()
    const [toggle, setToggle] = useState(false)
    const [userName, setUserName] = useState("")
    const [passwordUser, setPassWordUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [avatarURL, setAvatarURL] = useState("")
    const [progressUpload, setProgressUpload] = useState(null)
    const [ counterLoadingCreateUser, setCounterLoadingCreateUser ] = useState(0)

    const navigate = useNavigate()

    const { setAuthUserByPasswordAndEmail, errorAuthUser, setErrorAuthUser, createSuccessMessage } = authUser()
    const handleHideOrShowPassword = () => {

        if (!toggle) {
            reference.current.type = 'text'
            setToggle(true)
            return
        }

        if (toggle) {
            reference.current.type = 'password'
            setToggle(false)
            return
        }
    }

    const handleSubmitForm = async e => {
        e.preventDefault()

        const user = await setAuthUserByPasswordAndEmail(emailUser, passwordUser, userName, avatarURL)

        const storage = getStorage();
        const storageRef = ref(storage, `images/${userName}`);

        const uploadTask = uploadBytesResumable(storageRef, avatarURL);

        uploadTask.on('state_changed',
            (snapshot) => {
                setProgressUpload(Math.trunc((snapshot.bytesTransferred / snapshot.totalBytes) * 100) * 2.38)
                setCounterLoadingCreateUser(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed())

            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    updateProfile(auth.currentUser, {
                        displayName: userName,
                        photoURL: downloadURL
                    })

                    setDoc(doc(db, "users", user.user.uid), {
                        uid: user.user.uid,
                        displayName: userName,
                        email: emailUser,
                        photoURL: downloadURL
                    });
                    setDoc(doc(db, "userChats", user.user.uid), {});

                    navigate('/home')
                });

            }
        );

    }


    return (
        <div className='wrapperForm'>
            <div className={style.wrapperTitle}>
                <span className={style.title}>Cool Chat</span>
                <span className={style.subTitle}>Sign-up</span>
            </div>
            <form className='form' onSubmit={handleSubmitForm}>
                <input
                    type="text"
                    placeholder="User Name"
                    onChange={e => {
                        setUserName(e.target.value)
                        setErrorAuthUser("")
                    }}
                    required />
                <input
                    type="text"
                    placeholder="Email"
                    onChange={e => {
                        setEmailUser(e.target.value)
                        setErrorAuthUser("")
                    }}
                    required />
                <label htmlFor='password' className={style.labelWrapper}>
                    <input
                        ref={reference}
                        type="password"
                        placeholder="Password"
                        onChange={e => {
                            setPassWordUser(e.target.value)
                            setErrorAuthUser("")
                        }}
                        required />
                    {toggle
                        ? < AiFillEyeInvisible className={style.icon} onClick={handleHideOrShowPassword} />
                        : < AiFillEye className={style.icon} onClick={handleHideOrShowPassword} />
                    }
                </label>
                <label className={style.containerAvatar} htmlFor='avatar'>
                    <input
                        style={{ display: 'none' }}
                        type='file'
                        id='avatar'
                        onChange={(e) => setAvatarURL(e.target.files[0])}
                    />
                    <img
                        className={style.avatarImg}
                        src={image}
                        alt='avatar image user'></img>
                    <span>Pick your avatar. </span>
                </label>
                <button>Sign-up</button>
            </form>
            {progressUpload && (
                <div className={style.progressBarLoading}>
                    <span>Creating User : {counterLoadingCreateUser}%</span>
                    <span style={{ width: `${progressUpload}px` }} className={style.barUpload}></span>
                </div>
            )}
            {errorAuthUser && (
                <div className='warningMessage'>
                    <p>{errorAuthUser}</p>
                </div>
            )}
            <div>
                <p>Did you already have an accont ? <Link to='/'>Sign-in</Link></p>
            </div>
        </div>
    )

}

export default Signup;
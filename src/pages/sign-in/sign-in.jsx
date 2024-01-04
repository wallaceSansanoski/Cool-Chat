import { Link } from 'react-router-dom'
import style from './sign-in.module.css'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useRef, useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../service/db';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const ref = useRef()
    const [ toggle, setToggle ] = useState(false)
    const [ userPassword, setUserPassword ] = useState("")
    const [ userEmail, setUserEmail ] = useState("")
    const [ errorMessage, setErrorMessage] = useState(null)
    const [ createUserMessage, setCreateUserMessage ] = useState(null)
    const navigate = useNavigate()

    const handleHideOrShowPassword = async (e) => {

        if(!toggle){
            ref.current.type = 'text'
            setToggle(true)
            return 
        }

        if(toggle) {
            ref.current.type = 'password'
            setToggle(false)
            return 
        }
    }


    const handleSignin = async (e) => {
        e.preventDefault()

        try{
            const userRegister = await signInWithEmailAndPassword(auth, userEmail, userPassword)
            setCreateUserMessage('Create user Sucessfully')

        }catch(error) {
            if(error.message.includes('auth/invalid-login-credentials')){
                setErrorMessage('Invalid-login-credentials')
                return 
            }
            if(error.message.includes('auth/invalid-email')){
                setErrorMessage('Invalid Format email')
                return 
            }
        }

        navigate('/home')
    }

    return (
        <div className='wrapperForm'>
            <div className={style.wrapperTitle}>
                <span className={style.title}>Cool Chat</span>
                <span className={style.subTitle}>Sign-In</span>
            </div>
            <form className='form' onSubmit={handleSignin}>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={e => {
                        setUserEmail(e.target.value)
                        setErrorMessage(null)
                    }}
                    value={userEmail}
                    required />
                <label className={style.labelWrapper}>
                    <input
                        ref={ref}
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={e => {
                            setUserPassword(e.target.value)
                            setErrorMessage(null)
                        }}
                        required />
                    {toggle
                        ? < AiFillEyeInvisible className={style.icon} onClick={handleHideOrShowPassword} />
                        : < AiFillEye className={style.icon} onClick={handleHideOrShowPassword} />
                    }
                </label>
                <button>Sign-in</button>
            </form>
            {errorMessage &&  (
                <div className='warningMessage'>
                    <p>{errorMessage}</p>
                </div>
            )}
            {createUserMessage &&  (
                <div className='successMessage'>
                    <p>{createUserMessage}</p>
                </div>
            )}
            <div>
                <p>You dont have an accont ? <Link to={'/sign-up'}>Sign-Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn;;
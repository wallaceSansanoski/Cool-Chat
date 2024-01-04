import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../service/db';
import { useState } from 'react';

export const authUser = () => {

    const [ errorAuthUser, setErrorAuthUser ] = useState("")
    const [createSuccessMessage, setCreateSuccessMessage] = useState("")

    const setAuthUserByPasswordAndEmail = async (email, password) => {

        try {

           const  currentUser = await createUserWithEmailAndPassword(auth, email, password)

           setCreateSuccessMessage('Create user sucessfully')

            return currentUser
        }
        
        catch(error) {
           
            if(error.message.includes('email-already')){
                setErrorAuthUser('This user already exist.')
                return 
            }
            if(error.message.includes('Password')){
                setErrorAuthUser('Password should be at least 6 characters ')
                return 
            }
        }
    }
    
    return { setAuthUserByPasswordAndEmail, errorAuthUser, setErrorAuthUser, createSuccessMessage}

}
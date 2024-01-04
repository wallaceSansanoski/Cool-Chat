import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { db, auth } from "../service/db";
import { setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

export const uploadAvatar = () => {
    const upload = async (userName, avatarURL, emailUser, user) => {
        
        const storage = getStorage();
        const storageRef = ref(storage, `images/${userName}`);
        
        const uploadTask = uploadBytesResumable(storageRef, avatarURL);

        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
            
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
            async () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    updateProfile(auth.currentUser, {
                        displayName : userName,
                        photoURL : downloadURL
                    })

                    setDoc(doc(db, "users", user.user.uid), {
                        uid: user.user.uid,
                        displayName: userName,
                        email: emailUser,
                        photoURL: downloadURL
                    });
                });

            }
        );
    }

    return { upload }
}
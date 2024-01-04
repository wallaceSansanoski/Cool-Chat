import { FiVideo } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import Options from '../options/Options'
import style from '../header/header.module.css'
import { useState, useContext} from "react";
import { CurrentChatContext } from "../../AuthContext/currentChatContext";

const Header = () => {

    const [ toggle, setToggle ] = useState(false)
    const { state : user } = useContext(CurrentChatContext)

    const { user : userChat } = user

    const handleClickOptions = () => {
        setToggle(true)
    }
    return (
        <div className={style.wrapperHeader}>
            <p>{userChat.displayName}</p>
            <div className={style.optionsHead}>
                <FiUserPlus/>
                <FiVideo/>
                <FiMoreHorizontal onClick={handleClickOptions}/>
            </div>
            {toggle && (
                <Options toggle={{setToggle}}/>
            )}
        </div>
    )
}

export default Header;
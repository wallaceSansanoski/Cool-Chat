import { FiVideo } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Options from '../options/Options'
import style from '../header/header.module.css'
import { useState, useContext } from "react";
import { CurrentChatContext } from "../../AuthContext/currentChatContext";
import { ContextStyle } from "../../ContextStyle/contextStyle";

const Header = () => {

    const [ toggle, setToggle ] = useState(false)
    const { state: friendUserTalking } = useContext(CurrentChatContext)
    const { dispatch } = useContext(ContextStyle)

    const handleClickOptions = () => {
        setToggle(true)
    }

    const handleClickIconBacklistUser = () => {
        dispatch({ type: 'CHANGE_FALSE' })
    }

    return (
        <div className={style.wrapperHeader}>
            <div className={style.nameUserAndBackButton}>
                <AiOutlineCaretLeft className={style.iconBackChat} onClick={handleClickIconBacklistUser} />
                <p> {friendUserTalking.user.displayName}</p>
            </div>
            <div className={style.optionsHead}>
                <FiUserPlus />
                <FiVideo />
                <FiMoreHorizontal onClick={handleClickOptions} />
            </div>
            {toggle && (
                <Options toggle={{ setToggle }} />
            )}
        </div>
    )
}

export default Header;
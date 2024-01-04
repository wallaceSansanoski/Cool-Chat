import { TfiLocationPin } from "react-icons/tfi";
import { SlCamera } from "react-icons/sl";
import { SlMicrophone } from "react-icons/sl";
import { SlActionUndo } from "react-icons/sl";
import style from '../options/options.module.css'

const Options = ({toggle}) => {
    
    const { setToggle } = toggle

    const handleCloseOption = () => {
        setToggle(false)
    }   

    return (
        <div className={style.wrapperOptions}>
            <SlActionUndo className={style.undoAction} onClick={handleCloseOption}/>
            <div className={style.option}>
                 <TfiLocationPin/>
                <p className={style.titleOption}>Location</p>
            </div>
            <div className={style.option}>
                 <SlCamera/>
                <p className={style.titleOption}>Camera</p>
            </div>
            <div className={style.option}>
                <SlMicrophone />
                <p className={style.titleOption}>Audio</p>
            </div>
        </div>
    )
}

export default Options;
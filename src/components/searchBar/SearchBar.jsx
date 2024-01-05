import style from './searchBar.module.css'
import Navibar from '../navibar/Navibar'
import FindUser from '../findUser/FindUser'
import ListUsers from '../listUsers/ListUsers'
import { useContext } from 'react'
import { ContextStyle } from '../../ContextStyle/contextStyle'

const SearchBar = () => {

    const { changeInterfaceState } = useContext(ContextStyle)

    return (
        <div className={style.wrapperContainer} style={{ zIndex : changeInterfaceState.change ? 0 : 1}}>
            <Navibar/>
            <FindUser/>
            <ListUsers/>
        </div>
       
    )
}

export default SearchBar;
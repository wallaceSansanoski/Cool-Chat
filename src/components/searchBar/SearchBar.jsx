import style from './searchBar.module.css'
import Navibar from '../navibar/Navibar'
import FindUser from '../findUser/FindUser'
import ListUsers from '../listUsers/ListUsers'

const SearchBar = () => {

    return (
        <div className={style.wrapperContainer}>
            <Navibar/>
            <FindUser/>
            <ListUsers/>
        </div>
       
    )
}

export default SearchBar;
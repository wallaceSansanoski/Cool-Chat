import style from './home.module.css'
import SearchBar from '../../components/searchBar/SearchBar';
import ChatMessage from '../../components/chatMessages/Chat';

const Home = () => {
    return (
        <div className={style.wrapperContainerChat}>
            <div className={style.containerChat}>
                <SearchBar />
                <ChatMessage />
            </div>
        </div>
    )
}

export default Home;
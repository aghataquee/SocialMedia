
import { Link} from "react-router-dom"
import {useState} from 'react'
import{
    Home,Homeoutlined,Search,Searchoutlined,
    Add,Addoutlined,AccountCircle,AccountCircleoutlined
} from "@mui/icons-material"
function Header(){
    const [tab,settab]=useState('/');
    return(
        <div className="Header">
            <Link to='/' onClick={()=>settab('/')}>
            {tab==='/'?<Home/>:<Homeoutlined/>}
            </Link>
            <Link to='/newpost' onClick={()=>settab('/newpost')}>
            {
            tab==='/newpost'?<Add/>:<Addoutlined/>}
            </Link>
            <Link to='/search' onClick={()=>settab('/search')}>
            {tab==='/search'?<Search/>:<Searchoutlined/>}
            </Link>
            

        </div>
    )
}
export default Header
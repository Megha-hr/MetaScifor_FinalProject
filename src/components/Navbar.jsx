import React,{useState,useContext} from 'react'
import { ThemeContext } from './ThemeContext'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import '../css/navbar.css'


function Navbar({setSelectedItem}){
    //For menu icon set state
    const[click,setClick]=useState(false);
    const{theme,changeTheme}=useContext(ThemeContext)
    

    const menuClick=()=>setClick(!click);
    //To clear the selected Item before enter into the Home page
    const clearselectedItem=()=>setSelectedItem(null);
    
    //To close the mobile menu when screen size is <=960
    const closeMobilemenu=()=>{
        setClick(false);
    }


    return(
        <>
        <nav className='navbar'>
            <Link to="/" className='navbar-logo'>FRONTENDFOCUS</Link>
            <div className='menu-icon' onClick={menuClick}>
                {/*fontawsome icon used for menu icon*/}
                <i className={click?'fas fa-times':'fas fa-bars'}></i>
            </div>
            <ul className={click?'nav-menu active':'nav-menu'} >
                <li className='nav-item'>
                   <Link to='/' className='nav-links'  onClick={() => {
                    closeMobilemenu();
                    clearselectedItem();
                    }} >Home</Link> 
                </li>
                <li className='nav-item'>
                    <Link to='/Contact' className='nav-links'  onClick={closeMobilemenu}>contact us</Link>
                </li>
                <li className='nav-item '>
               <Link to="/" className='nav-links'  onClick={closeMobilemenu}><Dropdown setSelectedItem={setSelectedItem} /></Link> 
             
                </li>
                <li className='nav-item'>
               <button className="mode-toggle nav-links" onClick={()=>{
                closeMobilemenu();
                changeTheme()}}>
                    {theme==='light'?'To Dark mode':'To Light mode'}
                </button>
                </li>
            </ul>
           
            </nav>
       
        </>
    )
}
export default Navbar;
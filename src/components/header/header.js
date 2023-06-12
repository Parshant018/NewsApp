import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import SideNav from './SideNav/sideNav';
const Header = (props) =>{
    const navBars = () =>(
            <div className="bars">
                <FontAwesomeIcon icon={faBars}
                     onClick={props.onOpenNav}
                    style={{
                        color:'#dfdfdf',
                        padding:'10px',
                        cursor:'pointer'
                    }}
                />
            </div>
        )
    const logo = () =>(
        <Link to="/" className="logo">
            <img alt="nba logo" src={process.env.PUBLIC_URL + '/images/nba_logo.png'}/>
        </Link>
        )
    return(
        <header className="header">
        <SideNav {...props}/>
        <div className="headerOpt">
           {navBars()}
           {logo()}
        </div>
        </header>
    )
}
export default Header;
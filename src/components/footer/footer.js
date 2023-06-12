import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';
import {CURRENT_YEAR} from '../../config';
const Footer = () =>(
        <div className="footer">
        <Link to="/" className="logo">
            <img alt="nab logo" src={process.env.PUBLIC_URL + './images/nba_logo.png'}/>
        </Link>
        <div className="right">
            @NBA {CURRENT_YEAR} All rights Reserved.
        </div>
        </div>
    )
    export default Footer;
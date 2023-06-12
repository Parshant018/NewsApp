import React from 'react';
import { firebase } from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome,faFileAlt,faPlay,faSignInAlt,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Link,withRouter} from 'react-router-dom'
import './sidenav.css';
const SideNavItems = (props) =>{
    const items=[
        {
            type:"option",
            icon:faHome,
            text:'Home',
            link:'/',
            login:''
        },
        {
            type:"option",
            icon:faFileAlt,
            text:'News',
            link:'/news',
            login:''
        },
        {
            type:"option",
            icon:faPlay,
            text:'Videos',
            link:'/videos',
            login:''
        },
        {
            type:"option",
            icon:faSignInAlt,
            text:'Dashboard',
            link:'/dashboard',
            login:false
        },
        {
            type:"option",
            icon:faSignInAlt,
            text:'Sign-in',
            link:'/sign-in',
            login:true
        },
        {
            type:"option",
            icon:faSignOutAlt,
            text:'Sign-out',
            link:'/sign-out',
            login:false
        }
    ]
    
    const element = (item,i) =>(
        <div key={i} className={item.type}>
               <Link to={item.link}>
                   <FontAwesomeIcon icon={item.icon}/>
                    {item.text}
                </Link>
             </div>
    )

    const restricted = (item,i) =>{
        let template=null;
        if(props.user===null && item.login){
            template=element(item,i);
        }
        if(props.user !== null && !item.login){
            if(item.link==='/sign-out'){
                template=(
                    <div key={i} className={item.type}
                    onClick={()=>{
                        firebase.auth().signOut()
                        .then(()=>{
                            props.history.push('/')
                        })
                    }}
                    >
                        <FontAwesomeIcon icon={item.icon}/>
                         {item.text}
                  </div>  
                )
            }else{
                template=element(item,i);
            }
        }
        return template;
    }
    const showItems = () =>{
        return items.map((item,i)=>{
            return item.login!==''? restricted(item,i):element(item,i)
        })
    }
    return(
        <div>
            {showItems()}
        </div>
    )
}
export default withRouter(SideNavItems);
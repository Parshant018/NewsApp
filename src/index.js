import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { firebase } from './firebase';
// to run json server just run npm run dev-serv
const App = (props) =>{
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}
firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<><App user={user}/></>,document.querySelector("#root"))
})

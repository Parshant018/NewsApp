import React from 'react';
import { Switch } from 'react-router-dom';
import Home from './components/home/home';
import Layout from './hoc/layout/layout';
import NewsArticle from './components/Articles/News/Posts/index';
import VideoArticle from './components/Articles/Videos/video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main';
import SignIn from './components/Signin/signin';
import Dashboard from './components/Dashboard/dashboard';
import PublicRoutes from './components/AuthRoutes/publicRoutes';
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
const Routes = (props) =>{
        return(
            <Layout user={props.user}>
                <Switch>
                    <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
                    <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain}/>
                    <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticle}/>
                    <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle} /> 
                    <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain}/>
                    <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                    <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>
        )
}
export default Routes;
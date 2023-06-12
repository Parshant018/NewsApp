import React from 'react';
import './layout.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
class Layout extends React.Component{
    state={
        showNav:false
    }
    togglesideNav = (action) =>{
        this.setState({
            showNav:action
        })
    }
    render(){
        return(
            <div>
            <Header
                user={this.props.user}
                showNav={this.state.showNav}
                onHideNav={()=>this.togglesideNav(false)}
                onOpenNav={()=>this.togglesideNav(true)}
            />
            {this.props.children}
            <Footer/>
            </div>
        )
    }
}

export default Layout;
import React from 'react';
import { firebase,firebaseDB,firebaseLooper,firebaseTeams } from '../../../../firebase';
import '../../articles.css';
import Header from './header';

class NewsArticles extends React.Component{
    state={
        article:[],
        team:[],
        imageURL:''
    }

    getImageURL = (filename) =>{
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url =>{
            this.setState({
                imageURL:url
            })
        })
    }

    componentWillMount(){
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article=snapshot.val();
            firebaseTeams.orderByChild("teamId").equalTo(article.team).once("value")
            .then((snapshot)=>{
                const team=firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getImageURL(article.image);
            })
        })
    }
    
    render(){
        const article=this.state.article;
        const team=this.state.team;
        return(
            <div className="articleWrapper">
            <Header
                teamData={team[0]}
                date={article.date}
                author={article.author}
            />
            <div className="articleBody">
                <h1>{article.title}</h1>
                <div className="articleImage"
                  style={{
                      background:`url(${this.state.imageURL})`
                  }}
                ></div>
                <div className="articleText"
                  dangerouslySetInnerHTML={{
                      __html:article.body
                  }}
                ></div>
            </div>

            </div>
        )
    }
}
export default NewsArticles;
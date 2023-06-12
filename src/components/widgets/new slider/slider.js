import React , {Component} from 'react';
import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './slider_templates';
class NewsSlider extends Component{
    state={
        news:[]
    }

    componentWillMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news=firebaseLooper(snapshot);
            news.forEach((item,i)=>{
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then(url=>{
                    news[i].image=url;
                    this.setState({
                        news
                    })
                })
            })
        })
    }
    render(){
        return(
            <div>
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        )
    }
}
export default NewsSlider;
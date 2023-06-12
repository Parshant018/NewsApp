import React from 'react';
import './videoslist.css';
import CardInfo from '../CardInfo/cardinfo';
import { Link } from 'react-router-dom';

const VideosTemplate = (props) =>{
    return props.data.map((item,i)=>{
        return <Link to={`/videos/${item.id}`} key={i}>
            <div className="videoListItem_wrapper">
                <div className="leftv"
                 style={{
                     background:`url(${process.env.PUBLIC_URL}/images/videos/${item.image})`
                 }}
                >
                <div style={{
                    background:`url(${process.env.PUBLIC_URL}/images/play.png)`
                }}></div>
                </div>
                <div className="rightv">
                <CardInfo teams={props.teams} team={item.team} date={item.date}/>
                <h2>{item.title}</h2>
                </div>
            </div>
        </Link>
    })
}
export default VideosTemplate;
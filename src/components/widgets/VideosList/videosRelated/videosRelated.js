import React from 'react';
import '../videoslist.css';
import VideosTemplate from '../videosListTemplate';

const VideosRelated = (props) => (
    <div className="realtedWrapper">
    <VideosTemplate data={props.data} teams={props.teams}/>
    </div>
)

export default VideosRelated;
import moment from 'moment';
import React from 'react';
import '../articles.css';
const formatDate = (date) =>{
    return moment(date).format('DD-MM-YYY');
}
const PostData = (props) =>(
        <div className="articlePostData">
        <div>
            Date:
            <span>{formatDate(props.data.date)}</span>
        </div>
        <div>
            Author:
            <span>{props.data.author}</span>
        </div>
        </div>
)

export default PostData;
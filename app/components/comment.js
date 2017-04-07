import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';
import {unlikeComment} from '../server.js';
import {likeComment} from '../server.js';

export default class Comment extends React.Component {

    constructor(props) {
       super(props);
       this.state = props;
     }

     handleLikeClick(clickEvent) {
       clickEvent.preventDefault();
       if (clickEvent.button === 0) {
         var callbackFunction = (updatedLikeCounter) => {
           this.setState({likeCounter: updatedLikeCounter});
         };

         if (this.didUserLike()) {
           unlikeComment(this.state.attr, 4, this.state.commentInd, callbackFunction);
         } else {
           likeComment(this.state.attr, 4, this.state.commentInd, callbackFunction);
         }
       }
     }

     didUserLike() {
       var likeCounter = this.state.likeCounter;
       var liked = false;
       for (var i = 0; i < likeCounter.length; i++) {
         if (likeCounter[i]._id === 4) {
           liked = true;
           break;
         }
       }
       return liked;
     }

  render() {
      var likeButtonText = "Like";
      if (this.didUserLike()) {
      likeButtonText = "Unlike";
     }
      var data = this.state;
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link>
            {this.props.children}
            <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>
              {data.likeCounter.length} {likeButtonText} </a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}

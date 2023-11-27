import React from 'react';
import '../assets/css/comments.css';
import bottom from '../assets/imags/bottom.svg';
import comment1 from '../assets/imags/CommentBubble_01.svg';

export function Comments() {
  return (
    <div id="comments" className="comment-container">
      <div className="divide">
        <img src={bottom} alt="comments" />
        <div className='blocks'>
        <div className='blocks'>
          <CommentBlock
            backgroundImage={comment1}
            title="“Children recounted stories that would haunt anyone who hears them.
            We witnessed horrified people who entered the shelter still carrying white flags, symbols of surrender & desperate hope for sanctuary as they passed Israeli Armed Forces.”
            UNRWA"
            key="unique-key"
          />
        </div><CommentBlock
            backgroundImage={comment1}
            title="“Children recounted stories that would haunt anyone who hears them.
            We witnessed horrified people who entered the shelter still carrying white flags, symbols of surrender & desperate hope for sanctuary as they passed Israeli Armed Forces.”
            UNRWA"
            key="unique-key"
          />
        </div>
      </div>
    </div>
  );
}

function CommentBlock({ backgroundImage, title }) {
  return (
    <span className="comment" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>{title}</h1>
    </span>
  );
}

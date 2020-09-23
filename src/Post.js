import React from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, imageUrl}) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
          />
        <p><strong>{username}</strong></p>
      </div>

      <img
        className="post__image"
        src={imageUrl}
        />

        <p className="post__caption"><strong>{username}</strong> {caption}</p>
    </div>
  )
}

export default Post

import React from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt='doomsdayco'
          src="/static/images/avatar/1.jpg"
          />
        <p><strong>doomsdayco</strong></p>
      </div>

      <img
        className="post__image"
        src="https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/119792044_248417336504308_3376783143866371418_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QBKiljKnOpQAX-dA3p7&_nc_tp=15&oh=f9fd1b055f998fc4cc45a3dd62bfb156&oe=5F90A109"
        />

      <p className="post__text"><strong>doomsdayco</strong> Our death before dishonour coach jackets, the fit on these jackets are absolutely amazing. With a thin lining inside they’re perfect for this Autumn 🍂 </p>
    </div>
  )
}

export default Post

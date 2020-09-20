import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] =  useState([
    {
      username: "doomsdayco",
      caption: "Our death before dishonour coach jackets, the fit on these jackets are absolutely amazing. With a thin lining inside they’re perfect for this Autumn 🍂",
      imageUrl: "https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/119792044_248417336504308_3376783143866371418_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QBKiljKnOpQAX-dA3p7&_nc_tp=15&oh=f9fd1b055f998fc4cc45a3dd62bfb156&oe=5F90A109"
    },
    {
      username: "roosick",
      caption: "КИЕВ📍Запись открыта! По всем вопросам пишите в DM",
      imageUrl: "https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/119953630_3326015934102022_4940693843160519345_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=1mP9TA9hkU4AX97IhHC&_nc_tp=15&oh=726771c86b7ff5718852f8413ed8adf8&oe=5F92FA53"
    },
    {
      username: "parloiruk",
      caption: "I’m her Sunday’s best @jule.popule #girlswithtattoos #inkgirls #parloiruk",
      imageUrl: "https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/119639290_1221397934907729_4560158696063707528_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=oSlTe2jbasUAX_MxToC&_nc_tp=19&oh=eecbbec924354e22bba2f1a8643201f3&oe=5F8FAC4E"
    }
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;

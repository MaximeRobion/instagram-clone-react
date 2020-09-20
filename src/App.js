import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] =  useState([]);

  //useEffect runs a piece of code base on a specific condition
  useEffect( () => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      //listener : everysingle time the db changes, it refreshes
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, []);

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

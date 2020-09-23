import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input, InputLabel } from '@material-ui/core';
import ImageUpload from './ImageUpload';

// Modal styling
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// App
function App() {

  //States
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] =  useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //fires every time and auth action is being made on the backend
      if(authUser){
        //user has logged in...
        console.log(authUser);
        setUser(authUser); //survives a refresh with cookie tracking

      } else {
        // user has logged out
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  //useEffect runs a piece of code base on a specific condition
  useEffect( () => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //listener : everysingle time the db changes, it refreshes
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>

            <InputLabel>Username:</InputLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <InputLabel>Email:</InputLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          <InputLabel>Password:</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>

        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>

          <InputLabel>Email:</InputLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          <InputLabel>Password:</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <Button type="submit" onClick={signIn}>Log In</Button>
          </form>

        </div>
      </Modal>

      <Modal
        open={publish}
        onClose={() => setPublish(false)}
      >
        <div style={modalStyle} className={classes.paper}>

                {user?.displayName ? (
                  <ImageUpload username={user.displayName}/>
                ) : (
                  <p>You need to login to upload</p>
                )}
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        <Button onClick={() => setPublish(true)}>
          <svg aria-label="Nouvelle publication" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path><path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
          </svg>
        </Button>

              {user ? (
                // conditional logged in or logged out
                <div>
                  <Button onClick={() => auth.signOut()}>Log Out</Button>
                </div>
              ) : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
                <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
              </div>
              )}

      </div>

<div className="app_posts">
  {
    posts.map(({id, post}) => (
      //having the key allows the re-rendering only to happen for new post
      <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
    ))
  }
</div>


    </div>
  );
}

export default App;

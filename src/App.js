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

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) : (
        <p>You need to login to upload</p>
      )}

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

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

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

      {
        posts.map(({id, post}) => (
          //having the key allows the re-rendering only to happen for new post
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;

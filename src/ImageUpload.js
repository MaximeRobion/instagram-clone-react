import React, { useState } from 'react'
import { Button, Input, InputLabel } from '@material-ui/core';
import './ImageUpload.css';
import { storage, db } from './firebase';
import firebase from "firebase";

function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //upload the image to firebase
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        //error function...
        console.log(error);
        alert(error.message);
      },

      () => {
        //complete function...

        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        //get the uploaded image's download link
        .then(url => {
          //post image inside debug
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            //push the download link
            username: username
          });
          console.log("upload successful");

          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    )
  }

  return (
    <div>

        <progress value={progress} max="100"/>
        <InputLabel>Caption:</InputLabel>
        <Input
          type="text"
          onChange={event => setCaption(event.target.value)}
          value={caption}
          />

        <InputLabel>Select a file:</InputLabel>
        <Input type="file" onChange={handleChange}/>

        <Button onClick={handleUpload}>
          Upload
        </Button>
    </div>

  )
}

export default ImageUpload

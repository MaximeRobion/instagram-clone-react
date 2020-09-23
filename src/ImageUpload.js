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
    <div className="imageupload">
      <div className="imageupload__picture">
        <InputLabel>Select a picture:</InputLabel>
        <Input type="file" onChange={handleChange}/>
      </div>

      <div className="imageupload__caption">
      <InputLabel>Caption:</InputLabel>
        <Input
          type="text"
          onChange={event => setCaption(event.target.value)}
          value={caption}
          />
      </div>

      {image&&caption? (
        console.log("ok to upload"),
        <div className="imageupload__button">
          <progress className="imageupload__progress" value={progress} max="100"/>
          <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      ) : (
        console.log("not ok to upload, because no images selected")
      )}

    </div>

  )
}

export default ImageUpload

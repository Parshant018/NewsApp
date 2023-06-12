import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC-CyZvCODGdbI5YX7oRCCgWpcKp6OIwQc",
  authDomain: "nba-full-db9fe.firebaseapp.com",
  databaseURL: "https://nba-full-db9fe-default-rtdb.firebaseio.com",
  projectId: "nba-full-db9fe",
  storageBucket: "nba-full-db9fe.appspot.com",
  messagingSenderId: "1010626773200",
  appId: "1:1010626773200:web:f0722bf646650603835ed5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const firebaseDB=firebase.database();
  const firebaseArticles=firebaseDB.ref('articles');
  const firebaseTeams=firebaseDB.ref('teams');
  const firebaseVideos=firebaseDB.ref('videos');

  const firebaseLooper=(snapshot)=>{
      const data=[];
      snapshot.forEach((childSnapshot)=>{
          data.push({
          ...childSnapshot.val(),
          id:childSnapshot.key
          })
      });
      return data;
  }
  export{
      firebase,
      firebaseDB,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper
  }
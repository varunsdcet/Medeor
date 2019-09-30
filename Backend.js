import firebase from "firebase";
const GLOBAL = require('./Global');
class Backend {
    uid = GLOBAL.user_id;
    messagesRef = null;
    // initialize Firebase Backend
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDiNDzFrtoe5eGnXrpUWDDFI_ApqhsxWFg",
            authDomain: "anytimedoc-87a1b.firebaseapp.com",
            databaseURL: "https://anytimedoc-87a1b.firebaseio.com",
            projectId: "anytimedoc-87a1b",
            storageBucket: "gs://anytimedoc-87a1b.appspot.com/",
            messagingSenderId: "243956212766",
            appId: "1:243956212766:web:8da8d4cfa90d46a3297a0f"
        });

    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }
    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef =  firebase.database().ref().child("chat/" + GLOBAL.matchid);


        this.messagesRef.off(); //Detaches a callback previously attached with on()
        const onReceive = data => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                //createdAt: new Date(message.createdAt),
                createdAt: message.createdAt,
                user: {
                    _id: message.user._id,
                    name: message.user.name
                }
            });
        };

        var d = this.getLimit();
        console.log(d);
        //Generates a new Query object limited to the last specific number of children.
        //this.messagesRef.limitToLast(10).on("child_added", onReceive);
        this.messagesRef
            .orderByChild("createdAt")
            //.startAt(d)
            //.endAt("2017-11-27T06:51:47.851Z")
            .on("child_added", onReceive);
    }

    sendImage(image){
      //  const ext = image.split('.').pop(); // Extract image extension
        const filename = `${1}.png`; // Generate unique name

        firebase.storage().ref().bucket

        firebase
            .storage()
            .ref(`tutorials/images/${filename}`)
            .putFile(image)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        const allImages = this.state.images;
                        allImages.push(snapshot.downloadURL);
                        state = {
                            ...state,
                            uploading: false,
                            imgSource: '',
                            imageUri: '',
                            progress: 0,
                            images: allImages
                        };

                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    }

    // send the message to the Backend
    sendMessage(message) {
        //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
        var today = new Date();
        /* today.setDate(today.getDate() - 30);
        var timestamp = new Date(today).toISOString(); */
        var timestamp = today.toISOString();
        for (let i = 0; i < message.length; i++) {



            this.messagesRef.push({

                text: message[i].text,
                user: message[i].user,
                createdAt: timestamp
            });
        }
    }
    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

    getLimit() {
        var today = new Date();
        //var milliseconds = Date.parse(today);
        //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
        today.setDate(today.getDate() - 31); // last 30 Days
        //console.log(today);
        var changedISODate = new Date(today).toISOString();
        //var changedISODate = today.toISOString();
        console.log(changedISODate);
        return changedISODate;
    }
}

export default new Backend();
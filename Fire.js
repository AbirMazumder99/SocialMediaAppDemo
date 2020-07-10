import firebaseConfig from "./App"
import firebase from 'firebase'
import Firebase from './firebase'



class Fire {
    constructor() {
        // FIXME: Error Firebase DEFAULT already initialized
        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        // }
        Firebase
    }

    addPost = async ({ text, localUrl }) => {
        const remoteUrl = await this.uploadPhotoAsync(localUrl, `photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUrl
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = async (url, filename) => {
        // const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(url)
            const file = await response.blob()

            let upload = Firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => { }, err => {
                rej(err)
            },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                });
        });
    };

    creteUser = async user => {
        let remoteUrl = null

        try {
            await Firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if (user.avatar) {
                remoteUrl = await this.uploadPhotoAsync(user.avatar, `avatar/${this.uid}`);

                db.set({ avatar: remoteUrl }, { merge: true });
            }
        } catch (error) {
            alert("Error: ", error);
        }
    };

    signOut = () => {
        Firebase.auth().signOut();
    }

    get firestore() {
        return Firebase.firestore();

    }

    get uid() {
        return (Firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
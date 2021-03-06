import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { decodeValue } from "../utils/localstorage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.firebase = firebase;
  }

  getRef = ({ collection, doc }) => {
    const docRef = this.db.collection(collection).doc(doc);
    return docRef;
  };

  getSnapShotDataFromQuery = (querySnapShot, addUid) => {
    const res = [];

    querySnapShot.forEach((doc) => {
      if (doc.exists) {
        if (addUid) {
          res.push({ ...doc.data(), id: doc.id });
        } else {
          res.push(doc.data());
        }
      }
    });
    // console.log(res);
    return res;
  };

  buildQuery = async ({ collection, where, limit, orderBy } = {}) => {
    let query = this.db.collection(collection);

    if (where) {
      const { field, op, value } = where;
      query = query.where(field, op, value);
    }
    if (orderBy) {
      const { field, op } = orderBy;
      query = query.orderBy(field, op);
    }
    if (limit) {
      query = query.limit(limit);
    }

    return query;
  };

  getCollectionData = async ({
    collection,
    where,
    limit,
    orderBy,
    addUid = true,
  } = {}) => {
    if (!collection) throw new Error("you have to provide a collection");

    const query = await this.buildQuery({ collection, where, limit, orderBy });
    const querySnapShot = await query.get();
    // console.log(querySnapShot);
    const data = await this.getSnapShotDataFromQuery(querySnapShot, addUid);
    return data;
  };

  getDocumentById = ({ collection, doc }) => {
    return new Promise(async (resolve, reject) => {
      let docRef = this.getRef({ collection, doc });

      try {
        docRef = await docRef.get();

        resolve(docRef);
      } catch (error) {
        reject(false);
      }
    });
  };

  updateDocById = ({ collection, doc, data }) => {
    return new Promise(async (resolve, reject) => {
      let docRef = this.getRef({ collection, doc });

      try {
        docRef = await docRef.update(data);
        // console.log(docRef);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  };

  doAuthGoogleWithPopUp = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    return new Promise(async (resolve, reject) => {
      try {
        let result = await firebase.auth().signInWithPopup(googleAuthProvider);

        const userInfo = {
          ...result.credential,
          ...result.additionalUserInfo.profile,
        };
        resolve(userInfo);
      } catch (err) {
        reject(err);
      }
    });
  };

  doAuthGoogleWithCredentials = async () => {
    return new Promise(async (resolve, reject) => {
      const isUserLoggedBefore = localStorage.getItem("user_owloptics");

      if (isUserLoggedBefore) {
        const currentUser = await decodeValue(isUserLoggedBefore);

        let credential;
        try {
          credential = firebase.auth.GoogleAuthProvider.credential(
            currentUser.id_token
          );
        } catch (err) {
          reject(err);
        }

        try {
          const result = await firebase
            .auth()
            .signInWithCredential(credential)
            .catch((err) => {
              const errorCode = err.code;
              console.log(errorCode);
            });

          const userInfo = {
            ...result.credential,
            ...result.additionalUserInfo.profile,
            picture: result.user.photoURL,
          };

          resolve(userInfo);
        } catch (error) {
          reject(error);
        }
      }
      reject(new Error("user not available in localstorage!"));
    });
  };

  singOutUser() {
    return new Promise(async (resolve, reject) => {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          resolve({ singOut: true });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  saveData = ({ collection = null, data = {}, id = null }) => {
    return new Promise(async (resolve, reject) => {
      if (!collection) reject(new Error("Set Collection name"));

      let doc, currentUser;

      try {
        const docRef = this.db.collection(collection);

        if (id) {
          currentUser = await this.getDocumentById({ collection, doc: id });
          if (currentUser.exists) {
            resolve({ ...currentUser.data(), userId: currentUser.id });
          } else {
            await docRef.doc(id).set(data);
            currentUser = await this.getDocumentById({ collection, doc: id });
            currentUser = currentUser.data();
          }
        } else {
          doc = await docRef.add(data);
          currentUser = await this.getDocumentById({ collection, doc: doc.id });
          currentUser = currentUser.data();
        }

        resolve({ ...currentUser, userId: currentUser.id });
      } catch (err) {
        reject({ isAdded: false });
      }
    });
  };

  uploadLenses = async(glasses)=> {
    // console.log(glasses[0].name);
    // console.log(this.db);
    const docRef = this.db.collection("glasses");
    let idDoc;

    for (let i = 0; i < glasses.length; i++) {

      idDoc = glasses[i].name;
      let data = glasses[i];
      await docRef.doc(idDoc).set(data);
    }

    console.log("all glasses has been Inserted in firestore");

  }
}

export default Firebase;

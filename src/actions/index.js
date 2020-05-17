import { firestore, myFireStorage, firebaseAuth } from "../api";

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_ERROR,
  GOOGLE_SIGNIN_ERROR,
  COMPLETE_USER_DATA,
  UPLOAD_PROGRESS,
  UPLOAD_ERROR,
  CREATE_ERROR,
  GET_DOWNLOAD_URL,
  EXPERIENCE_SELECTED,
  CATEGORY_SELECTED,
  FETCH_USER_EXPERIENCES,
  FETCH_EXPERIENCE,
  FETCH_SELECTED_BIZ_EXPERIENCES,
  FETCH_PUBLISHED_EXPERIENCES,
  FETCH_PARTNERS_EXPERIENCES,
  FETCH_BUSINESSES,
  SEARCH_BUSINESS_OWNER,
  FETCH_SELECTED_BUSINESS,
  EDIT_EXPERIENCE,
  CREATE_EXPERIENCE,
  SIGN_UP_ERROR,
  SET_LOADER,
  EDIT_BUSINESS,
  FETCH_CURRENT_USER,
  FETCH_BUSINESS_PARTNERS_EXPERIENCES,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
} from "./types";

// AUTHENTICATONS ACTIONS:

export const googleSignIn = () => async (dispatch) => {
  const provider = new firebaseAuth.GoogleAuthProvider();
  firebaseAuth()
    .signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: SIGN_IN,
        payload: result.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: GOOGLE_SIGNIN_ERROR,
        payload: err,
      });
    });
};

export const userSignIn = ({ email, password }) => async (
  dispatch
) => {
  firebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .then((u) => {
      dispatch({
        type: SIGN_IN,
        payload: u.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: err,
      });
    });
};

export const userSingUp = ({ email, password }) => async (
  dispatch
) => {
  dispatch(setLoaderState(true));
  firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: SIGN_IN,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: err,
      });
      dispatch(setLoaderState(false));
    });
};

export const userSignOut = () => async (dispatch) => {
  firebaseAuth()
    .signOut()
    .then((res) => {
      dispatch({
        type: SIGN_OUT,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAuthState = () => async (dispatch) => {
  firebaseAuth().onAuthStateChanged((user) => {
    if (user) {
      return dispatch({ type: SIGN_IN, payload: user });
    } else {
      return dispatch({ type: SIGN_OUT });
    }
  });
};

/*------------------------------------------------------------- */
/*------------------------------------------------------------- */
/*------------------------------------------------------------- */

//PAYMENTS ACTIONS:
// create transaction details
const get_transaction_details = async (details, share = 0) => {
  return {
    id: details.id,
    payerEmail: details.payer.email_address,
    transactionTime: new Date(),
    payerName: details.payer.name,
    payerId: details.payer.payer_id,
    purchase_details: {
      amount: details.purchase_units[0].amount,
      purchasedExperience: details.purchase_units[0].description,
      earning: share,
    },
  };
};

// Get current Balance
const getUserBalance = async (id) => {
  const balance = await firestore()
    .collection("businesses")
    .doc(id)
    .get()
    .then((b) => b.data().Balance)
    .catch((err) => {
      console.log(err);
    });
  return balance;
};

//Set Paid status
const setPaid = (check, details) => {
  if (check) {
    return {
      type: TRANSACTION_SUCCESS,
      payload: details,
    };
  } else {
    return {
      type: TRANSACTION_FAILED,
      payload: details,
    };
  }
};

export const completePurchase = (
  { OwnerId, Profit, Price, PartnerData },
  details
) => async (dispatch) => {
  dispatch(setLoaderState(true));
  let rate = Profit.split("/");
  rate = rate.map((n) => n.substring(n.length - 2));
  const ownerShare = Price * (parseInt(rate[0]) / 100);
  const partnerShare = Price * (parseInt(rate[1]) / 100);
  const PartnerId = PartnerData.Uid;

  // Get current balance
  const ownerBalance = await getUserBalance(OwnerId);
  const partnerBalance = await getUserBalance(PartnerId);

  console.log(
    `Owner Balance ${ownerBalance} and Partner balance ${partnerBalance}`
  );
  // Calculate the new Balance
  const newOwnerBalance = ownerShare + ownerBalance;
  const newPartnerBalance = partnerShare + partnerBalance;

  // get transaction details
  const owner_transaction_details = await get_transaction_details(
    details,
    ownerShare
  );
  const partner_transaction_details = await get_transaction_details(
    details,
    partnerShare
  );
  console.log(partner_transaction_details);
  console.log(owner_transaction_details);

  // update user Balance & add transaction details
  dispatch(
    updateBusiness(OwnerId, {
      Balance: newOwnerBalance,
      Transactions: firestore.FieldValue.arrayUnion(
        owner_transaction_details
      ),
    })
  );
  dispatch(
    updateBusiness(PartnerId, {
      Balance: newPartnerBalance,
      Transactions: firestore.FieldValue.arrayUnion(
        partner_transaction_details
      ),
    })
  );

  //update paid state
  if (details.status === "COMPLETED") {
    dispatch(setPaid(true, get_transaction_details(details)));
  } else {
    dispatch(setPaid(false, details));
  }
  dispatch(setLoaderState(false));
};

/*------------------------------------------------------------- */
/*------------------------------------------------------------- */
/*------------------------------------------------------------- */

//BUSINESSES ACTIONS:

export const updateBusiness = (id, data) => async (dispatch) => {
  firestore()
    .collection("businesses")
    .doc(id)
    .update(data)
    .then((res) => {
      console.log(res);
      console.log("data updated");
      dispatch({
        type: EDIT_BUSINESS,
        payload: res,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const completeUserData = (user, data, imgLink) => async (
  dispatch
) => {
  const userData = {
    Bname: data.Bname,
    Picture: imgLink,
    About: data.About,
    Uid: user.uid,
    Email: user.email,
    Address: data.Address,
    Web: data.Web,
    Bnumber: data.Bnumber,
    City: data.City,
    Ohours: data.Ohours,
    Category: data.Category,
    Terms: data.Terms,
    Balance: 0,
  };
  const docRef = firestore().collection("businesses").doc(user.uid);
  docRef
    .set(userData)
    .then(() => {
      dispatch(setImgLinktoNull());
      console.log("data saved");
      dispatch({
        type: COMPLETE_USER_DATA,
        payload: userData,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ERROR,
        payload: err,
      });
    });
};

export const fetchSelectedBusiness = (
  id,
  getPartnerExp = false,
  currentUser = false
) => async (dispatch) => {
  const docRef = firestore().collection("businesses").doc(id);
  const res = await docRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        if (getPartnerExp) {
          const partnerEmail = snapshot.data().Email;
          dispatch(fetchPartnersExp(partnerEmail, true));
        }
        return snapshot.data();
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
  if (currentUser) {
    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res,
    });
  } else {
    dispatch({
      type: FETCH_SELECTED_BUSINESS,
      payload: res,
    });
  }
};

export const fetchAllBusinesses = () => async (dispatch) => {
  const docRef = await firestore().collection("businesses").get();
  let newBiz = [];
  docRef.docs.forEach((d) => {
    newBiz.push(d.data());
  });
  dispatch({
    type: FETCH_BUSINESSES,
    payload: newBiz,
  });
};

export const searchBusinessByNameorEmail = (businessId) => async (
  dispatch
) => {
  businessId = businessId.trim();
  let resp;
  if (RegExp(/^\S+@\S+$/i).test(businessId)) {
    const emaildocRef = firestore()
      .collection("businesses")
      .where("Email", "==", businessId)
      .get();
    await emaildocRef.then((snapshot) => {
      if (snapshot.docs.length > 0) {
        resp = snapshot.docs[0].data();
      } else {
        resp = null;
      }
    });
  } else {
    const namedocRef = firestore()
      .collection("businesses")
      .where("Bname", "==", businessId)
      .get();
    await namedocRef.then((snapshot) => {
      if (snapshot.docs.length > 0) {
        console.log("Name exist");
        resp = snapshot.docs[0].data();
      } else {
        console.log("Name not found");
        resp = null;
      }
    });
  }
  dispatch({
    type: SEARCH_BUSINESS_OWNER,
    payload: resp,
  });
};

/*------------------------------------------------------------- */
/*------------------------------------------------------------- */
/*------------------------------------------------------------- */

//EXPERIENCES ACTIONS:

export const createExperience = (
  userId,
  data,
  partnerData,
  imgLink,
  userBname
) => async (dispatch) => {
  const experience = {
    ExpName: data.ExpName,
    Conditions: data.Conditions,
    OwnerOffer: data.OwnerOffer,
    Category: data.Category,
    Price: data.Price,
    Deadline: data.Deadline,
    Picture: imgLink,
    Profit: data.Profit,
    Desc: data.Desc,
    Published: false,
    RedeemOffer: data.RedeemOffer,
    OwnerId: userId,
    OwnerBname: userBname,
    PartnerOffer: "",
    RedeemPartnerOffer: null,
    Partner: data.Partner,
    PartnerData: partnerData,
  };
  const docRef = firestore()
    .collection("businesses")
    .doc(userId)
    .collection("exp");
  docRef
    .add(experience)
    .then(() => {
      dispatch(setImgLinktoNull());
      console.log("data saved");
      dispatch({
        type: CREATE_EXPERIENCE,
        payload: experience,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CREATE_ERROR,
        payload: err,
      });
    });
};

export const updateExperience = (data, ExpId, OwnerId) => async (
  dispatch
) => {
  const docRef = firestore()
    .collection("businesses")
    .doc(OwnerId)
    .collection("exp")
    .doc(ExpId);
  const res = await docRef
    .update(data)
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

  dispatch(fetchSelectedExperience(ExpId));
};

export const fetchExperiencesById = (userUid) => async (dispatch) => {
  const docRef = await firestore()
    .collection("businesses")
    .doc(userUid)
    .collection("exp")
    .get();
  let userExperiences = [];

  docRef.docs.forEach((d) => {
    userExperiences.push({ id: d.id, ...d.data() });
  });

  dispatch({
    type: FETCH_USER_EXPERIENCES,
    payload: userExperiences,
  });
};

export const fetchSelectedBusinessExperiences = (userId) => async (
  dispatch
) => {
  let selectedBizExperiences = [];
  const docRef = await firestore()
    .collection("businesses")
    .doc(userId)
    .collection("exp")
    .where("Published", "==", true)
    .get();
  docRef.docs.forEach((d) => {
    selectedBizExperiences.push(d.data());
  });

  dispatch({
    type: FETCH_SELECTED_BIZ_EXPERIENCES,
    payload: selectedBizExperiences,
  });
};

export const fetchSelectedExperience = (id) => async (dispatch) => {
  let selectedExperience;
  const docRef = await firestore()
    .collectionGroup("exp")
    .where("id", "==", id)
    .get();
  docRef.docs.forEach((d) => {
    selectedExperience = d.data();
  });

  dispatch({
    type: FETCH_EXPERIENCE,
    payload: selectedExperience,
  });
};

// CHECK IF THIS IS IN USE
export const experienceSelected = (experience) => {
  return {
    type: EXPERIENCE_SELECTED,
    payload: experience,
  };
};

export const fetchPartnersExp = (
  userEmail,
  business = false
) => async (dispatch) => {
  const docRef = await firestore()
    .collectionGroup("exp")
    .where("Partner", "==", userEmail)
    .get();
  let partnersExp = [];
  docRef.docs.forEach((d) => {
    partnersExp.push({ id: d.id, ...d.data() });
  });
  if (business) {
    dispatch({
      type: FETCH_BUSINESS_PARTNERS_EXPERIENCES,
      payload: partnersExp,
    });
  } else {
    dispatch({
      type: FETCH_PARTNERS_EXPERIENCES,
      payload: partnersExp,
    });
  }
};

export const fetchPublishedExp = () => async (dispatch) => {
  const docRef = await firestore()
    .collectionGroup("exp")
    .where("Published", "==", true)
    .get();
  let publishedExp = [];
  docRef.docs.forEach((d) => {
    publishedExp.push({ id: d.id, ...d.data() });
  });
  dispatch({
    type: FETCH_PUBLISHED_EXPERIENCES,
    payload: publishedExp,
  });
};

/*------------------------------------------------------------- */
/*------------------------------------------------------------- */
/*------------------------------------------------------------- */

//OTHERS ACTIONS

export const setImgLinktoNull = () => {
  return {
    type: GET_DOWNLOAD_URL,
    payload: null,
  };
};

export const categorySelected = (category) => {
  return {
    type: CATEGORY_SELECTED,
    payload: category,
  };
};

export const setLoaderState = (state) => {
  return {
    type: SET_LOADER,
    payload: state,
  };
};

export const uploadFile = (files, bucketName) => async (dispatch) => {
  let file = files[0];
  let storageRef = myFireStorage().ref(`${bucketName}/${file.name}`);
  let uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = parseInt(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("Upload is " + progress + "% done from action");
      dispatch({
        type: UPLOAD_PROGRESS,
        payload: progress,
      });
      // switch (snapshot.state) {
      //   case myFireStorage.TaskState.PAUSED: // or 'paused'
      //     console.log("Upload is paused");
      //     break;
      //   case myFireStorage.TaskState.RUNNING: // or 'running'
      //     console.log("Upload is running");
      //     break;
      // }
    },
    function (error) {
      // Handle unsuccessful uploads
      dispatch({
        type: UPLOAD_ERROR,
        payload: error,
      });
    },
    function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          dispatch({
            type: GET_DOWNLOAD_URL,
            payload: downloadURL,
          });
          console.log("File available at", downloadURL);
        });
    }
  );
};

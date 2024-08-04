import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import { authentication } from "../firebase";
import { FirebaseError } from "firebase/app";

import { deleteUserData } from "./deleteFirebaseData";
import { emailWithoutSpace } from "./strintText";

const auth = authentication;

export const handleChangeEmail = async (currentPassword, newEmail) => {
  try {
    console.log("currentPassword...", currentPassword);
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    console.log("user...", user);
    // Încercăm reautentificarea
    await reauthenticateWithCredential(user, credential);
    console.log("Reautentificare reușită.");

    // Dacă reautentificarea a reușit, încercăm să actualizăm emailul

    // await verifyBeforeUpdateEmail(user, newEmail);
    await updateEmail(user, newEmail);
    console.log("Actualizarea emailului reușită.");

    // Prindem orice eroare care apare la actualizarea emailului
  } catch (error) {
    // Prindem orice eroare care apare la reautentificare
    console.log("Eroare la reautentificare:", error);
    alert(handleFirebaseAuthError(error));
    throw new Error(handleFirebaseAuthError(error));
  }
};

export const handleChangePassword = async (currentPassword, newPassword) => {
  console.log("Change password...");
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    // Reautentificarea utilizatorului
    await reauthenticateWithCredential(user, credential);
    console.log("Reauthentication successful.");

    // Schimbarea parolei
    await updatePassword(user, newPassword);
    console.log("Password successfully changed.");
  } catch (err) {
    console.log("Error on handleChangePassword", err);
    // Apelăm handleFirebaseAuthError pentru a obține un mesaj de eroare specific
    const errorMessage = handleFirebaseAuthError(err);
    // Aruncăm o nouă eroare cu mesajul specific
    throw new Error(errorMessage);
  }
};

export const handleLogout = async () => {
  console.log("Start....");
  try {
    await signOut(authentication);
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to log out.");
  }
};

export const handleDeleteAccount = async (currentPassword) => {
  try {
    const auth = authentication;
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    console.log("-------test----");
    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    await deleteUser(result.user).then(() => {
      console.log("deleted successfuly...auth account");
    });
  } catch (error) {
    console.error("error delete user auth or firestore...", error);
  }
};

export const handleResetPassword = async (email) => {
  const user = auth.currentUser;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(handleFirebaseAuthError(error));
  }
};

// firebaseErrors.js

// handleFirebaseAuthError.js
export const handleFirebaseAuthError = (error) => {
  let message = "";
  console.log("test...", error.code);
  switch (error.code) {
    case "auth/invalid-email":
      message = "E-mail invalid";
      break;
    case "auth/email-already-in-use":
      message = "E-mail deja folosit";
      break;
    case "auth/weak-password":
      message = "Parola slaba";
      break;
    case "auth/user-not-found":
      message = "Utilizatorul nu a fost gasit";
      break;
    case "auth/user-disabled":
      message = "Utilizator dezactivat";
      break;
    case "auth/wrong-password":
      message = "Parola gresita";
      break;
    case "auth/too-many-requests":
      message = "Prea multe incercari gresite";
      break;
    case "auth/operation-not-allowed":
      message = "Error Operation Not Allowed";
      break;
    case "auth/network-request-failed":
      message =
        "Error Network Request Failed. Check network connection and try again.";
      break;
    case "auth/invalid-credential":
      message = "Credentiale invalide";
      break;
    default:
      message = "Eroare necunoscuta";
  }
  return message;
};

// HANLDE SIGN IN AND RETURN INFOR

export const handleSignIn = async (email, password) => {
  const emailNew = emailWithoutSpace(email);

  try {
    const userCredentials = await signInWithEmailAndPassword(
      authentication,
      emailNew,
      password
    );
    console.log("userCredentials...", userCredentials.user.uid);
    return userCredentials; // Returnează userCredentials pentru succes
  } catch (error) {
    console.log("error on sign in user...message...", error.message);
    console.log("error on sign in user...code...", error.code);
    throw error; // Propagă eroarea mai departe
  }
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authentication, db } from "@/firebase";
import {
  handleQueryFirestoreSubcollection,
  handleUploadFirestore,
} from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";
import { useAuth } from "@/context/AuthContext";
import { handleFirebaseAuthError, handleSignIn } from "@/utils/authUtils";
import { doc, setDoc } from "firebase/firestore";

const LoginSignupPartener = () => {
  const { userData, currentUser, setCurrentUser, setUserData } = useAuth();
  const [denumireBrand, setDenumireBrand] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeContact, setNumeContact] = useState("");
  const [telefonContact, setTelefonContact] = useState("");
  const [judet, setJudet] = useState("");
  const [localitate, setLocalitate] = useState("");
  const [categorie, setCategorie] = useState("");
  const [cui, setCui] = useState("");

  const handleReset = () => {
    setDenumireBrand("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNumeContact("");
    setTelefonContact("");
    setJudet("");
    setLocalitate("");
    setCategorie("");
    setCui("");
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    // console.log(userData);
    // console.log(currentUser);

    let utilizator = await handleQueryFirestoreSubcollection(
      "Users",
      "cui",
      cui
    );
    // setUserData(utilizator[0]);
    handleSignIn(utilizator[0].email, password)
      .then((userCredentials) => {
        console.log("user credentials...", userCredentials);
        setCurrentUser(userCredentials); // Aici trebuie să asiguri că userCredentials este gestionat corect
        // router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error during sign in:", error.message);
        console.error("Error during sign in:", error.code);
        // setError("Failed to log in. Error message: " + error.message); // Utilizează error.message pentru a oferi feedback utilizatorului
      });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const emailNew = emailWithoutSpace(email);
    // Verifică dacă parola este confirmată corect și apoi creează utilizatorul
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        emailNew,
        password
      );
      let user_uid = userCredential.user.uid;
      console.log(
        "User created successfully with email: ",
        userCredential.user
      );
      let data = {
        cui,
        categorie,
        localitate,
        judet,
        telefonContact,
        numeContact,
        email: emailNew,
        denumireBrand,
        user_uid,
        userType: "Partener",
      };
      await handleUploadFirestore(data, "Users");
      const collectionId = "Users";
      const documentId = user_uid;
      setDoc(doc(db, collectionId, documentId), data);
      handleReset();
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn-close"
          onClick={handleReset}
        ></button>
      </div>
      {/* End .modal-header */}

      <div className="modal-body container pb20">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sign_up_tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  id="authpartener-tab"
                  data-bs-toggle="tab"
                  href="#authpartener"
                  role="tab"
                  aria-controls="authpartener"
                  aria-selected="true"
                >
                  Autentificare
                </a>
              </li>
              {/* End login tab */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="partener-tab"
                  data-bs-toggle="tab"
                  href="#partener"
                  role="tab"
                  aria-controls="partener"
                  aria-selected="false"
                >
                  Înregistrare
                </a>
              </li>
              {/* End Register tab */}
            </ul>
            {/* End .sign_up_tab */}
          </div>
        </div>
        {/* End .row */}

        <div className="tab-content container" id="myTabContent">
          <div
            className="row mt25 tab-pane fade show active"
            id="authpartener"
            role="tabpanel"
            aria-labelledby="authpartener-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <Image
                  width={357}
                  height={494}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/login.png"
                  alt="login.jpg"
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <form onSubmit={handleLogIn} action="#">
                  <div className="heading">
                    <h4>Autentificare partener</h4>
                  </div>
                  {/* End heading */}

                  {/* <div className="row mt25">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-fb w-100">
                        <i className="fa fa-facebook float-start mt5"></i> Login
                        with Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-googl w-100">
                        <i className="fa fa-google float-start mt5"></i> Login
                        with Google
                      </button>
                    </div>
                  </div> */}
                  {/* End .row */}

                  <hr />

                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername2"
                      placeholder="CUI"
                      value={cui}
                      onChange={(e) => setCui(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="input-group form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Parola"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remeberMe"
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="remeberMe"
                    >
                      Rămâi conectat
                    </label>

                    <a className="btn-fpswd float-end" href="#">
                      Ai uitat parola?
                    </a>
                  </div>
                  {/* End remember me checkbox */}

                  <button
                    type="submit"
                    className="btn btn-log w-100 btn-thm"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Autentificare
                  </button>
                  {/* End submit button */}

                  <p className="text-center">
                    Nu ai cont?{" "}
                    <a className="text-thm" href="#">
                      Înregistrează-te
                    </a>
                  </p>
                </form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          <div
            className="row mt25 tab-pane fade"
            id="partener"
            role="tabpanel"
            aria-labelledby="partener-tab"
          >
            <form onSubmit={handleSignUp} action="#" className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="sign_up_form">
                  <div className="heading">
                    <h4>Înregistrare Partener</h4>
                  </div>
                  {/* End .heading */}

                  {/* <div className="row ">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-fb w-100">
                        <i className="fa fa-facebook float-start mt5"></i> Login
                        with Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-googl w-100">
                        <i className="fa fa-google float-start mt5"></i> Login
                        with Google
                      </button>
                    </div>
                  </div> */}
                  {/* End .row */}

                  <hr />

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Denumire brand"
                      value={denumireBrand}
                      onChange={(e) => setDenumireBrand(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail2"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-envelope-o"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Parola"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword3"
                      placeholder="Confirma Parola"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Nume si prenume persoana de contact"
                      value={numeContact}
                      onChange={(e) => setNumeContact(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  {/* End .form */}
                </div>
              </div>
              {/* End . left side image for register */}

              <div className="col-lg-6 col-xl-6">
                <div className="sign_up_form">
                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Număr de telefon persoana de contact"
                      value={telefonContact}
                      onChange={(e) => setTelefonContact(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                      value={judet}
                      onChange={(e) => setJudet(e.target.value)}
                    >
                      <option value="">Selectează județ</option>
                      <option value="Operator economic">
                        Operator economic
                      </option>
                      <option value="Doctor">Doctor</option>
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                      value={localitate}
                      onChange={(e) => setLocalitate(e.target.value)}
                    >
                      <option data-tokens="SelectRole">Localitate</option>
                      <option data-tokens="Agent/Agency">
                        Operator economic
                      </option>
                      <option data-tokens="SingleUser">Doctor</option>
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                    >
                      <option data-tokens="SelectRole">Categorie</option>
                      <option data-tokens="Agent/Agency">Categorie 1</option>
                      <option data-tokens="SingleUser">Categorie 2</option>
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="CUI"
                      value={cui}
                      onChange={(e) => setCui(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  {/* End .form */}
                </div>
              </div>
              <div className="form-group form-check custom-checkbox mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="terms"
                />
                <label
                  className="form-check-label form-check-label"
                  htmlFor="terms"
                >
                  Accept termenii si conditiile.
                </label>
              </div>
              {/* End from-group */}

              <button
                type="submit"
                className="btn btn-log w-100 btn-thm"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                înregistrare
              </button>
              {/* End btn */}

              <p className="text-center">
                Aveti cont?{" "}
                <a className="text-thm" href="#">
                  Autentificati-va
                </a>
              </p>
              {/* End register content */}
            </form>
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPartener;

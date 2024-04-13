"use client";

import { useAuth } from "@/context/AuthContext";
import { authentication } from "@/firebase";
import { handleFirebaseAuthError } from "@/utils/authUtils";
import { handleUploadFirestore } from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginSignupUtilizator = () => {
  const { userData, currentUser, setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeUtilizator, setNumeUtilizator] = useState("");
  const [telefon, setTelefon] = useState("");
  const [dataNasterii, setDataNasterii] = useState("");
  const [judet, setJudet] = useState("");
  const [localitate, setLocalitate] = useState("");
  const [titulatura, setTitulatura] = useState("");
  const [specializare, setSpecializare] = useState("");
  const [cuim, setCuim] = useState("");
  const [titulaturaSelectata, setTitulaturaSelectata] = useState("");

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNumeUtilizator("");
    setTelefon("");
    setDataNasterii("");
    setJudet("");
    setLocalitate("");
    setTitulatura("");
    setSpecializare("");
    setCuim("");
  };

  const handleLogIn = async (event) => {
    console.log(userData);
    event.preventDefault();

    signInWithEmailAndPassword(authentication, email, password)
      .then(async (userCredentials) => {
        setCurrentUser(userCredentials);
        console.log("success login");
      })
      .catch((error) => {
        const errorMessage = handleFirebaseAuthError(error);
        // Aici puteți folosi errorMessage pentru a afișa un snackbar sau un alert
        // setShowSnackback(true);
        // setMessage(errorMessage);

        console.log("error on sign in user...", error.message);
        console.log("error on sign in user...", error.code);
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
        cuim,
        specializare,
        titulatura,
        localitate,
        judet,
        dataNasterii,
        telefon,
        numeUtilizator,
        email,
        user_uid,
        userType: "Doctor",
      };
      await handleUploadFirestore(data, "Users");
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
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Autentificare
                </a>
              </li>
              {/* End login tab */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
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
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
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
                    <h4>Autentificare utilizator</h4>
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
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                  <button type="submit" className="btn btn-log w-100 btn-thm">
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
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <form onSubmit={handleSignUp} action="#" className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="sign_up_form">
                  <div className="heading">
                    <h4>Înregistrare Utilizator</h4>
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
                      placeholder="Nume utilizator"
                      value={numeUtilizator}
                      onChange={(e) => setNumeUtilizator(e.target.value)}
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
                      placeholder="Număr de telefon"
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
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
                      placeholder="Data nașterii"
                      value={dataNasterii}
                      onChange={(e) => setDataNasterii(e.target.value)}
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
                      <option data-tokens="SelectRole">Judet</option>
                      <option data-tokens="Agent/Agency">Dambovita</option>
                      <option data-tokens="SingleUser">Prahova</option>
                      <option data-tokens="SingleUser">Timisoara</option>
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
                      <option data-tokens="Agent/Agency">Targoviste</option>
                      <option data-tokens="SingleUser">Brasov</option>
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                      value={titulatura}
                      onChange={(e) => setTitulatura(e.target.value)}
                    >
                      <option data-tokens="SelectRole">Titulatura</option>
                      <option data-tokens="Agent/Agency">Medic Rezident</option>
                      <option data-tokens="Agent/Agency">
                        Medic Generalist
                      </option>
                      <option data-tokens="Agent/Agency">Medic</option>
                      <option data-tokens="Agent/Agency">
                        Medic Specialist
                      </option>
                      <option data-tokens="Agent/Agency">Medic Primar</option>
                      <option data-tokens="Agent/Agency">Farmacist</option>
                      <option data-tokens="Agent/Agency">
                        Asistent Medical
                      </option>
                      <option data-tokens="SingleUser">Altele</option>
                    </select>
                  </div>
                  {/* End .row */}
                  {titulatura !== "Asistent Medical" && (
                    <>
                      <div className="form-group ui_kit_select_search mb-3">
                        <select
                          className="form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={specializare}
                          onChange={(e) => setSpecializare(e.target.value)}
                        >
                          <option data-tokens="SelectRole">Specializare</option>
                          <option data-tokens="Agent/Agency">
                            Alergologie si imunologie
                          </option>
                          <option data-tokens="SingleUser">
                            Anatomie Patologica
                          </option>
                          <option data-tokens="SingleUser">
                            Anestezie si terapie intensiva (ATI)
                          </option>
                          <option data-tokens="SingleUser">
                            Boli Infectioase
                          </option>
                          <option data-tokens="SingleUser">Cardiologie</option>
                          <option data-tokens="SingleUser">
                            Cardiologie pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie cardiovasculara
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie generala
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie orala si maxilofaciala
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie plastica, reconstructiva si microchirurgie
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie toracica
                          </option>
                          <option data-tokens="SingleUser">
                            Chirurgie vasculara
                          </option>
                          <option data-tokens="SingleUser">
                            Dermatovenerologie
                          </option>
                          <option data-tokens="SingleUser">
                            Diabet zaharat, nutritie si boli metabolice
                          </option>
                          <option data-tokens="SingleUser">
                            Endocrinologie
                          </option>
                          <option data-tokens="SingleUser">
                            Epidemiologie
                          </option>
                          <option data-tokens="SingleUser">
                            Expertiza medicala
                          </option>
                          <option data-tokens="SingleUser">Farmacist</option>
                          <option data-tokens="SingleUser">
                            Farmacologie clinica
                          </option>
                          <option data-tokens="SingleUser">
                            Gastroenterologie
                          </option>
                          <option data-tokens="SingleUser">
                            Gastroenterologie Pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Genetica medicala
                          </option>
                          <option data-tokens="SingleUser">
                            Geriatrie si gerontologie
                          </option>
                          <option data-tokens="SingleUser">Hematologie</option>
                          <option data-tokens="SingleUser">Igiena</option>
                          <option data-tokens="SingleUser">
                            Medicina muncii
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina de familie
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina de laborator
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina de urgenta
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina fizica si balneologie
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina interna
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina legala
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina nucleara
                          </option>
                          <option data-tokens="SingleUser">
                            Medicina sportiva
                          </option>
                          <option data-tokens="SingleUser">
                            Microbiologie medicala
                          </option>
                          <option data-tokens="SingleUser">Nefrologie</option>
                          <option data-tokens="SingleUser">
                            Nefrologie pediatrica
                          </option>
                          <option data-tokens="SingleUser">Neonatologie</option>
                          <option data-tokens="SingleUser">
                            Neurochirurgie
                          </option>
                          <option data-tokens="SingleUser">Neurologie</option>
                          <option data-tokens="SingleUser">
                            Neurologie pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Obstetrica ginecologie
                          </option>
                          <option data-tokens="SingleUser">Oftalmologie</option>
                          <option data-tokens="SingleUser">
                            Oncologie medicala
                          </option>
                          <option data-tokens="SingleUser">
                            Oncologie si hematologie
                          </option>
                          <option data-tokens="SingleUser">
                            Oncologie pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Oncologie si traumatologie
                          </option>
                          <option data-tokens="SingleUser">
                            Otorinolaringologie ORL
                          </option>
                          <option data-tokens="SingleUser">Pediatrie</option>
                          <option data-tokens="SingleUser">Pneumologie</option>
                          <option data-tokens="SingleUser">
                            Pneumologie pediatrica
                          </option>
                          <option data-tokens="SingleUser">Psihiatrie</option>
                          <option data-tokens="SingleUser">
                            Psihiatrie pediatrica
                          </option>
                          <option data-tokens="SingleUser">
                            Radiologie si Imagistica medicala
                          </option>
                          <option data-tokens="SingleUser">Radioterapie</option>
                          <option data-tokens="SingleUser">Reumatologie</option>
                          <option data-tokens="SingleUser">
                            Sanatate publica si management
                          </option>
                          <option data-tokens="SingleUser">Urologie</option>
                          <option data-tokens="SingleUser">
                            Medicina generala
                          </option>
                          <option data-tokens="SingleUser">Altele</option>
                        </select>
                      </div>

                      <div className="form-group input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputName"
                          placeholder="CUIM"
                          value={cuim}
                          onChange={(e) => setCuim(e.target.value)}
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="flaticon-user"></i>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

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

              <button type="submit" className="btn btn-log w-100 btn-thm">
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

export default LoginSignupUtilizator;

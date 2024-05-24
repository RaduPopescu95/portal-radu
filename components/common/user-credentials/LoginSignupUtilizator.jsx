"use client";

import { useAuth } from "@/context/AuthContext";
import { authentication, db } from "@/firebase";
import { handleFirebaseAuthError } from "@/utils/authUtils";
import {
  getFirestoreCollectionLength,
  handleQueryFirestoreSubcollection,
  handleUploadFirestore,
} from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";
import { getCurrentDateTime } from "@/utils/timeUtils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AlertModal } from "../AlertModal";

const LoginSignupUtilizator = () => {
  const { userData, currentUser, setCurrentUser, setUserData, judete } =
    useAuth();
  const closeButtonRef = useRef(null); // Referință pentru butonul de închidere
  const [localitati, setLocalitati] = useState([]);
  const [judet, setJudet] = useState("");
  const [localitate, setLocalitate] = useState("");
  const [isJudetSelected, setIsJudetSelected] = useState(true);
  const [isLocalitateSelected, setIsLocalitateSelected] = useState(true);
  const [isCateogireSelected, setIsCategorieSelected] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeUtilizator, setNumeUtilizator] = useState("");
  const [telefon, setTelefon] = useState("");
  const [dataNasterii, setDataNasterii] = useState("");
  const [titulatura, setTitulatura] = useState("");
  const [specializare, setSpecializare] = useState("");
  const [cuim, setCuim] = useState("");
  const [titulaturaSelectata, setTitulaturaSelectata] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [buttonPressed, setButtonPressed] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState("text");
  const router = useRouter();

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const handleJudetChange = async (e) => {
    const judetSelectedName = e.target.value; // Numele județului selectat, un string
    console.log("judetSelectedName...", judetSelectedName);
    setJudet(judetSelectedName);
    setIsJudetSelected(!!judetSelectedName);

    // Găsește obiectul județului selectat bazat pe `judet`
    const judetSelected = judete.find(
      (judet) => judet.judet === judetSelectedName
    );

    if (judetSelected) {
      try {
        // Utilizăm judet pentru a interoga Firestore
        const localitatiFromFirestore = await handleQueryFirestoreSubcollection(
          "Localitati",
          "judet",
          judetSelected.judet
        );
        // Presupunem că localitatiFromFirestore este array-ul corect al localităților
        setLocalitati(localitatiFromFirestore);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocalitati([]); // Resetează localitățile în caz de eroare
      }
    } else {
      // Dacă nu găsim județul selectat, resetăm localitățile
      setLocalitati([]);
    }
  };

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
    setButtonPressed(false);
  };

  const handleLogIn = async (event) => {
    console.log(userData);
    event.preventDefault();
    setButtonPressed(true);

    if (!password || !email) {
      return;
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then(async (userCredentials) => {
        setCurrentUser(userCredentials);
        console.log("success login");
        if (closeButtonRef.current) {
          closeButtonRef.current.click();
        }
        router.push("/panou-doctor"); // Redirecționează după ce mesajul de succes este afișat și închis
      })
      .catch((error) => {
        const errorMessage = handleFirebaseAuthError(error);
        showAlert(`Eroare la autentificare: ${errorMessage}`, "danger");

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
    setButtonPressed(true);
    // Verifică dacă parola este confirmată corect și apoi creează utilizatorul
    if (password !== confirmPassword) {
      setConfirmPasswordError("Parolele nu corespund.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (password.length < 6) {
      setPasswordError("Parola este prea scurta");
      return;
    }

    if (
      !email ||
      !numeUtilizator ||
      !telefon ||
      !dataNasterii ||
      !judet ||
      !localitate ||
      !titulatura ||
      !cuim ||
      !confirmPassword
    ) {
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
      const collectionLength = await getFirestoreCollectionLength("Users");
      let id = collectionLength + 1;
      const dateTime = getCurrentDateTime();
      let data = {
        id,
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
        gradFidelitate: "Silver",
        statusCont: "Inactiv",
        rulajCont: 0,
        firstUploadDate: dateTime.date,
        firstUploadTime: dateTime.time,
      };
      // await handleUploadFirestore(data, "Users");
      const collectionId = "Users";
      const documentId = user_uid;
      setDoc(doc(db, collectionId, documentId), data).then(() => {
        showAlert("Înregistrare cu succes!", "success");
      });
      setUserData(data);
      handleReset();
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
      setTimeout(() => {
        router.push("/panou-doctor"); // Redirecționează după ce mesajul de succes este afișat și închis
      }, 3000); // Așteaptă să dispară alerta
    } catch (error) {
      console.error("Error signing up: ", error);
      const message = handleFirebaseAuthError(error);
      showAlert(`Eroare la înregistrare: ${message}`, "danger");
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
          ref={closeButtonRef}
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
                    <h4>Autentificare cadru medical</h4>
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
                      className={`form-control ${
                        !email && buttonPressed && "border-danger"
                      }`}
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
                      type={passwordVisible ? "text" : "password"}
                      className={`form-control ${
                        !password && buttonPressed && "border-danger"
                      }`}
                      id="exampleInputPassword1"
                      placeholder="Parola"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <i
                          className={
                            passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  {/* <div className="form-group form-check custom-checkbox mb-3">
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
                  </div> */}
                  {/* End remember me checkbox */}

                  <button
                    type="submit"
                    className="btn btn-log w-100 btn-thm"
                    // aria-label="Close"
                    // data-bs-dismiss="modal"
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src="/assets/images/iconite/cadremedicale2.png"
                        alt="Cadre medicale Icon"
                        width={35} // Setează lățimea iconului
                        height={35} // Setează înălțimea iconului
                        priority // Încarcă imaginea cât mai rapid posibil
                        className="loginImg"
                      />
                      <span style={{ marginLeft: 8 }}>Autentificare</span>
                    </span>
                  </button>
                  {/* End submit button */}

                  {/* <p className="text-center">
                    Nu ai cont?{" "}
                    <a className="text-thm" href="#">
                      Înregistrează-te
                    </a>
                  </p> */}
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
                    <h4>Înregistrare Cadru medical</h4>
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
                      className={`form-control ${
                        !numeUtilizator && buttonPressed && "border-danger"
                      }`}
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
                      className={`form-control ${
                        !email && buttonPressed && "border-danger"
                      }`}
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
                      type={passwordVisible ? "text" : "password"}
                      className={`form-control ${
                        !password && buttonPressed && "border-danger"
                      }`}
                      id="exampleInputPassword2"
                      placeholder="Parola"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <i
                          className={
                            passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  {passwordError && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "0.875rem",
                        marginTop: "0px",
                        marginBottom: "1rem",
                      }}
                    >
                      {passwordError}
                    </div>
                  )}

                  <div className="form-group input-group  mb-3">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className={`form-control ${
                        !confirmPassword && buttonPressed && "border-danger"
                      }`}
                      id="exampleInputPassword3"
                      placeholder="Confirma Parola"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <i
                          className={
                            passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  {confirmPasswordError && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "0.875rem",
                        marginTop: "0px",
                        marginBottom: "1rem",
                      }}
                    >
                      {confirmPasswordError}
                    </div>
                  )}

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        !telefon && buttonPressed && "border-danger"
                      }`}
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
                      type={inputType}
                      className={`form-control ${
                        !dataNasterii && buttonPressed && "border-danger"
                      }`}
                      id="exampleInputName"
                      placeholder="Data nașterii"
                      value={dataNasterii}
                      onChange={(e) => setDataNasterii(e.target.value)}
                      onFocus={() => setInputType("date")}
                      onBlur={() => dataNasterii || setInputType("text")}
                    />
                  </div>
                  {/* End .row */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className={`form-select ${
                        !judet && buttonPressed && "border-danger"
                      }`}
                      data-live-search="true"
                      data-width="100%"
                      value={judet}
                      onChange={handleJudetChange}
                    >
                      <option data-tokens="SelectRole">Judet</option>
                      {judete &&
                        judete.map((judet, index) => (
                          <option key={index} value={judet.judet}>
                            {judet.judet}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className={`form-select ${
                        !localitate && buttonPressed && "border-danger"
                      }`}
                      data-live-search="true"
                      data-width="100%"
                      value={localitate}
                      onChange={(e) => setLocalitate(e.target.value)}
                    >
                      <option data-tokens="SelectRole">Localitate</option>
                      {localitati.map((location, index) => (
                        <option key={index} value={location.localitate}>
                          {location.localitate}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className={`form-select ${
                        !titulatura && buttonPressed && "border-danger"
                      }`}
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
                          className={`form-select ${
                            !specializare && buttonPressed && "border-danger"
                          }`}
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
                          className={`form-control ${
                            !cuim && buttonPressed && "border-danger"
                          }`}
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
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                />
                <label
                  className="form-check-label form-check-label"
                  htmlFor="terms"
                >
                  Accept{" "}
                  <Link href={"/termeni-confidentialitate"}>
                    termenii si conditiile.
                  </Link>
                </label>
              </div>
              {/* End from-group */}

              <button
                type="submit"
                className="btn btn-log w-100 btn-thm"
                // data-bs-dismiss="modal"
                disabled={!isTermsAccepted}
              >
                înregistrare
              </button>
              {/* End btn */}

              {/* <p className="text-center">
                Aveti cont?{" "}
                <a className="text-thm" href="#">
                  Autentificati-va
                </a>
              </p> */}
              {/* End register content */}
            </form>
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </div>
  );
};

export default LoginSignupUtilizator;

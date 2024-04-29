"use client";

import { AlertModal } from "@/components/common/AlertModal";
import { useAuth } from "@/context/AuthContext";
import {
  handleQueryFirestoreSubcollection,
  handleUpdateFirestore,
} from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";
import { useEffect, useState } from "react";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const { userData, currentUser, setCurrentUser, setUserData, judete } =
    useAuth();
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeUtilizator, setNumeUtilizator] = useState(
    userData?.numeUtilizator || ""
  );
  const [telefon, setTelefon] = useState(userData?.telefon || "");
  const [dataNasterii, setDataNasterii] = useState(
    userData?.dataNasterii || ""
  );
  const [judet, setJudet] = useState(userData?.judet || "");
  const [localitate, setLocalitate] = useState(userData?.localitate || "");
  const [titulatura, setTitulatura] = useState(userData?.titulatura || "");
  const [specializare, setSpecializare] = useState(
    userData?.specializare || ""
  );
  const [cuim, setCuim] = useState(userData?.cuim || "");
  const [localitati, setLocalitati] = useState([]);
  const [isJudetSelected, setIsJudetSelected] = useState(true);
  const [isLocalitateSelected, setIsLocalitateSelected] = useState(true);
  const [isCateogireSelected, setIsCategorieSelected] = useState(true);

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const emailNew = emailWithoutSpace(email);
    // Verifică dacă parola este confirmată corect și apoi creează utilizatorul
    try {
      let user_uid = currentUser.uid;
      let data = {
        cuim,
        specializare,
        titulatura,
        localitate,
        judet,
        dataNasterii,
        email: emailNew,
        telefon,
        user_uid,
        userType: "Doctor",
        numeUtilizator,
      };
      setUserData(data);
      await handleUpdateFirestore(`Users/${user_uid}`, data).then(() => {
        console.log("update succesfully....");
        showAlert("Actualizare cu succes!", "success");
      });
    } catch (error) {
      showAlert(`Eroare la Actualizare: ${error.message}`, "danger");
      console.error("Error signing up: ", error);
    }
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
  const handleGetLocalitatiJudet = async () => {
    const judetSelectedName = judet; // Numele județului selectat, un string
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

  useEffect(() => {
    if (judet.length > 0) {
      handleGetLocalitatiJudet();
    }
  }, []);

  return (
    <div className="row">
      {/* <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={uploadProfile}
                    />
                    <label
                        style={
                            profile !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(
                                          profile
                                      )})`,
                                  }
                                : undefined
                        }
                        htmlFor="image1"
                    >
                        <span>
                            <i className="flaticon-download"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div> */}
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">Nume utilizator</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput1"
            placeholder="Nume Utilizator"
            value={numeUtilizator}
            onChange={(e) => setNumeUtilizator(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput3">Nume</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            placeholder="Nume"
            value={numeUtilizator}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Titulatura</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={titulatura}
            onChange={(e) => setTitulatura(e.target.value)}
          >
            <option data-tokens="SelectRole">Titulatura</option>
            <option data-tokens="Agent/Agency">Medic Rezident</option>
            <option data-tokens="Agent/Agency">Medic Generalist</option>
            <option data-tokens="Agent/Agency">Medic</option>
            <option data-tokens="Agent/Agency">Medic Specialist</option>
            <option data-tokens="Agent/Agency">Medic Primar</option>
            <option data-tokens="Agent/Agency">Farmacist</option>
            <option data-tokens="Agent/Agency">Asistent Medical</option>
            <option data-tokens="SingleUser">Altele</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Specializare</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={specializare}
            onChange={(e) => setSpecializare(e.target.value)}
          >
            <option data-tokens="SelectRole">Specializare</option>
            <option data-tokens="Agent/Agency">
              Alergologie si imunologie
            </option>
            <option data-tokens="SingleUser">Anatomie Patologica</option>
            <option data-tokens="SingleUser">
              Anestezie si terapie intensiva (ATI)
            </option>
            <option data-tokens="SingleUser">Boli Infectioase</option>
            <option data-tokens="SingleUser">Cardiologie</option>
            <option data-tokens="SingleUser">Cardiologie pediatrica</option>
            <option data-tokens="SingleUser">Chirurgie cardiovasculara</option>
            <option data-tokens="SingleUser">Chirurgie generala</option>
            <option data-tokens="SingleUser">
              Chirurgie orala si maxilofaciala
            </option>
            <option data-tokens="SingleUser">Chirurgie pediatrica</option>
            <option data-tokens="SingleUser">
              Chirurgie plastica, reconstructiva si microchirurgie
            </option>
            <option data-tokens="SingleUser">Chirurgie toracica</option>
            <option data-tokens="SingleUser">Chirurgie vasculara</option>
            <option data-tokens="SingleUser">Dermatovenerologie</option>
            <option data-tokens="SingleUser">
              Diabet zaharat, nutritie si boli metabolice
            </option>
            <option data-tokens="SingleUser">Endocrinologie</option>
            <option data-tokens="SingleUser">Epidemiologie</option>
            <option data-tokens="SingleUser">Expertiza medicala</option>
            <option data-tokens="SingleUser">Farmacist</option>
            <option data-tokens="SingleUser">Farmacologie clinica</option>
            <option data-tokens="SingleUser">Gastroenterologie</option>
            <option data-tokens="SingleUser">
              Gastroenterologie Pediatrica
            </option>
            <option data-tokens="SingleUser">Genetica medicala</option>
            <option data-tokens="SingleUser">Geriatrie si gerontologie</option>
            <option data-tokens="SingleUser">Hematologie</option>
            <option data-tokens="SingleUser">Igiena</option>
            <option data-tokens="SingleUser">Medicina muncii</option>
            <option data-tokens="SingleUser">Medicina de familie</option>
            <option data-tokens="SingleUser">Medicina de laborator</option>
            <option data-tokens="SingleUser">Medicina de urgenta</option>
            <option data-tokens="SingleUser">
              Medicina fizica si balneologie
            </option>
            <option data-tokens="SingleUser">Medicina interna</option>
            <option data-tokens="SingleUser">Medicina legala</option>
            <option data-tokens="SingleUser">Medicina nucleara</option>
            <option data-tokens="SingleUser">Medicina sportiva</option>
            <option data-tokens="SingleUser">Microbiologie medicala</option>
            <option data-tokens="SingleUser">Nefrologie</option>
            <option data-tokens="SingleUser">Nefrologie pediatrica</option>
            <option data-tokens="SingleUser">Neonatologie</option>
            <option data-tokens="SingleUser">Neurochirurgie</option>
            <option data-tokens="SingleUser">Neurologie</option>
            <option data-tokens="SingleUser">Neurologie pediatrica</option>
            <option data-tokens="SingleUser">Obstetrica ginecologie</option>
            <option data-tokens="SingleUser">Oftalmologie</option>
            <option data-tokens="SingleUser">Oncologie medicala</option>
            <option data-tokens="SingleUser">Oncologie si hematologie</option>
            <option data-tokens="SingleUser">Oncologie pediatrica</option>
            <option data-tokens="SingleUser">Oncologie si traumatologie</option>
            <option data-tokens="SingleUser">Otorinolaringologie ORL</option>
            <option data-tokens="SingleUser">Pediatrie</option>
            <option data-tokens="SingleUser">Pneumologie</option>
            <option data-tokens="SingleUser">Pneumologie pediatrica</option>
            <option data-tokens="SingleUser">Psihiatrie</option>
            <option data-tokens="SingleUser">Psihiatrie pediatrica</option>
            <option data-tokens="SingleUser">
              Radiologie si Imagistica medicala
            </option>
            <option data-tokens="SingleUser">Radioterapie</option>
            <option data-tokens="SingleUser">Reumatologie</option>
            <option data-tokens="SingleUser">
              Sanatate publica si management
            </option>
            <option data-tokens="SingleUser">Urologie</option>
            <option data-tokens="SingleUser">Medicina generala</option>
            <option data-tokens="SingleUser">Altele</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Judet</label>
          <select
            className="selectpicker form-select"
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
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Localitate</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={localitate}
            onChange={(e) => setLocalitate(e.target.value)}
          >
            {localitati.map((location, index) => (
              <option key={index} value={location.localitate}>
                {location.localitate}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">Telefon</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput5"
            placeholder="Telefon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Data nașterii</label>
          <input
            type="date"
            className="form-control"
            id="formGroupExampleInput7"
            placeholder="Data Nasterii"
            value={dataNasterii}
            onChange={(e) => setDataNasterii(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput9">CUIM</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput9"
            placeholder="CUIM"
            value={cuim}
            onChange={(e) => setCuim(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-xl-12">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput13">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput13"
                    />
                </div>
            </div> */}
      {/* End .col */}

      {/* <div className="col-xl-12">
                <div className="my_profile_setting_textarea">
                    <label htmlFor="exampleFormControlTextarea1">
                        About me
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="7"
                    ></textarea>
                </div>
            </div> */}
      {/* End .col */}

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          {/* <button className="btn btn1">View Public Profile</button> */}
          <button className="btn btn2" onClick={handleUpdateProfile}>
            Actualizeaza Profil
          </button>
        </div>
      </div>
      {/* End .col */}
      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </div>
  );
};

export default ProfileInfo;

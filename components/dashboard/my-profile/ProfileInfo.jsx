"use client";

import { generateRandomGradient } from "@/utils/commonUtils";
import { useState } from "react";
import GradientSelect from "./GradientSelect";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateFirestore } from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";

const ProfileInfo = () => {
  const { userData, currentUser, setCurrentUser, setUserData } = useAuth();
  const [denumireBrand, setDenumireBrand] = useState(
    userData?.denumireBrand || ""
  );
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeContact, setNumeContact] = useState(userData?.numeContact || "");
  const [telefonContact, setTelefonContact] = useState(
    userData?.telefonContact || ""
  );
  const [judet, setJudet] = useState(userData?.judet || "");
  const [localitate, setLocalitate] = useState(userData?.localitate || "");
  const [categorie, setCategorie] = useState(userData?.categorie || "");
  const [cui, setCui] = useState(userData?.cui || "");
  const [adresaSediu, setAdresaSediu] = useState(userData?.adresaSediu || "");

  const [selectedId, setSelectedId] = useState(
    userData?.gradient?.selectedId || null
  ); // Acum stocăm un singur ID
  const [gradientSelected, setGradientSelected] = useState(
    userData?.gradient?.gradientSelected || ""
  ); // Acum stocăm un singur ID

  const [profile, setProfile] = useState(null);
  const options = ["Opțiunea 1", "Opțiunea 2", "Opțiunea 3"];
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
        adresaSediu,
        gradient: { selectedId, gradientSelected },
      };
      setUserData(data);
      await handleUpdateFirestore(`Users/${user_uid}`, data);
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12">
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
                    backgroundImage: `url(${URL.createObjectURL(profile)})`,
                  }
                : undefined
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> încarcă Logo{" "}
            </span>
          </label>
        </div>
        <p>*minimum 260px x 260px</p>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">Denumire Brand</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput1"
            value={denumireBrand}
            onChange={(e) => setDenumireBrand(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput3">
            Nume si prenume persoana de contact
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            value={numeContact}
            onChange={(e) => setNumeContact(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput4">
            Numar de telefon persoana de contact
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput4"
            value={telefonContact}
            onChange={(e) => setTelefonContact(e.target.value)}
          />
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
            onChange={(e) => setJudet(e.target.value)}
          >
            <option data-tokens="Status1">Alege Judet</option>
            <option data-tokens="Status2">Dambovita</option>
            <option data-tokens="Status3">Timisoara</option>
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
            <option data-tokens="Status1">Alege Localitate</option>
            <option data-tokens="Status2">Targoviste</option>
            <option data-tokens="Status3">Timisoara</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">CUI</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput7"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Categorie</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option data-tokens="Status1">Alege Categorie</option>
            <option data-tokens="Status2">Categorie1</option>
            <option data-tokens="Status3">Categorie2</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <GradientSelect
            options={options}
            selectedId={selectedId}
            gradientSelected={gradientSelected}
            setSelectedGradient={setGradientSelected}
            setSelectedId={setSelectedId}
          />
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput11">Language</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput11"
                    />
                </div>
            </div> */}
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput12">
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput12"
                    />
                </div>
            </div> */}
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput13">Adresa sediu</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput13"
            value={adresaSediu}
            onChange={(e) => setAdresaSediu(e.target.value)}
          />
        </div>
      </div>
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
          {/* <button className="btn btn1">Actualizeaza Profil</button> */}
          <button className="btn btn2" onClick={handleUpdateProfile}>
            Actualizeaza Profil
          </button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ProfileInfo;

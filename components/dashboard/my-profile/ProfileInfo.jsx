"use client";

import { generateRandomGradient } from "@/utils/commonUtils";
import { useState } from "react";
import GradientSelect from "./GradientSelect";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateFirestore } from "@/utils/firestoreUtils";
import { emailWithoutSpace } from "@/utils/strintText";
import AutocompleteInput from "@/components/common/AutocompleteInput";
import { AlertModal } from "@/components/common/AlertModal";
import GalerieFotoSection from "./GalerieFotoSection";
import { useParams, useRouter } from "next/navigation";
import selectedFiles from "@/utils/selectedFiles";
import { uploadImage, uploadMultipleImages } from "@/utils/storageUtils";
import CommonLoader from "@/components/common/CommonLoader";
import LogoUpload from "./LogoUpload";

const ProfileInfo = () => {
  const { userData, currentUser, setCurrentUser, setUserData } = useAuth();
  const [denumireBrand, setDenumireBrand] = useState(
    userData?.denumireBrand || ""
  );
  const [descriere, setDescriere] = useState(userData?.descriere || "");
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
  const [deletedLogo, setDeletedLogo] = useState(null);
  const [isNewLogo, setIsNewLogo] = useState(false);

  const [googleMapsLink, setGoogleMapsLink] = useState(
    userData?.googleMapsLink || ""
  );
  const [coordonate, setCoordonate] = useState(userData?.coordonate || {});

  const [selectedId, setSelectedId] = useState(
    userData?.gradient?.selectedId || null
  ); // Acum stocăm un singur ID
  const [gradientSelected, setGradientSelected] = useState(
    userData?.gradient?.gradientSelected || ""
  );

  const [logo, setLogo] = useState(userData?.logo ? [userData?.logo] : []);
  const [isLoading, setIsLoading] = useState(false);

  const [propertySelectedImgs, setPropertySelectedImgs] = useState(
    userData?.images?.imgs || []
  );
  const [deletedImages, setDeletedImages] = useState([]);
  const [isNewImage, setIsNewImage] = useState(false);

  const params = useParams();
  const router = useRouter();

  let isEdit = userData?.logo?.finalUri ? true : false;

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const options = ["Opțiunea 1", "Opțiunea 2", "Opțiunea 3"];

  // upload Logo
  // Handle single image selection
  const singleImage = (e) => {
    const file = e.target.files[0]; // Get the selected file
    console.log("test..here...", file.name);
    if (file) {
      // Check if the file is already selected
      const isExist = logo.some(
        (existingFile) => existingFile.name === file.name
      );

      if (!isExist) {
        setLogo([file]); // Replace the current file
        setIsNewLogo(true);
      } else {
        alert("This image is already selected!");
      }
    }
  };

  const handleLocationSelect = (lat, lng, adresa, urlMaps) => {
    console.log(`Selected location - Lat: ${lat}, Lng: ${lng}`);
    setAdresaSediu(adresa);
    setGoogleMapsLink(urlMaps);
    setCoordonate({ lat, lng });
    // Aici poți actualiza starea sau trimite aceste date către backend
  };

  const handleUpdateProfile = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const emailNew = emailWithoutSpace(email);

    // Verifică dacă parola este confirmată corect și apoi creează utilizatorul
    try {
      let user_uid = currentUser.uid;
      let lg = {};
      let images = {};

      if (propertySelectedImgs.length === 0) {
        setIsLoading(false);
        showAlert("Selelctati cel putin o imagine în galeria foto", "danger");
        return;
      }

      if (logo.length === 0) {
        setIsLoading(false);
        showAlert("Selelctati logo", "danger");
        return;
      }
      console.log("test....", isNewLogo);
      console.log("test....", isNewImage);
      if (isNewLogo) {
        lg = await uploadImage(logo, true, "ProfileLogo", deletedLogo);
      } else {
        if (!logo[0].fileName) {
          lg = await uploadImage(logo, false, "ProfileLogo");
        } else {
          lg = logo[0];
        }
      }

      if (isNewImage) {
        images = await uploadMultipleImages(
          propertySelectedImgs,
          true,
          "ImaginiProfil",
          deletedImages
        );
      } else {
        if (!images?.img) {
          images = await uploadMultipleImages(
            propertySelectedImgs,
            false,
            "ImaginiProfil"
          );
        }
      }

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
        googleMapsLink,
        coordonate,
        logo: lg,
        images,
        descriere,
      };
      setUserData(data);
      await handleUpdateFirestore(`Users/${user_uid}`, data).then(() => {
        setIsLoading(false);
        showAlert("Actualizare cu succes!", "success");
      });
    } catch (error) {
      setIsLoading(false);
      showAlert(`Eroare la Actualizare: ${error.message}`, "danger");
      console.error("Error actualizare profil partener: ", error);
    }
  };

  //select multiple images
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
      setIsNewImage(true);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete logo
  const deleteLogo = (name) => {
    if (logo[0].fileName) {
      setLogo([]); // Clear the selection when deleting
      setDeletedLogo(logo[0].fileName);
    } else {
      setLogo([]); // Clear the selection when deleting
    }
  };

  // delete image
  const deleteImage = (item) => {
    console.log("itemmm....", item);
    console.log(item);
    // Filtrăm imaginile rămase
    const deleted = propertySelectedImgs?.filter((file) =>
      file instanceof File ? file.name !== item.name : file !== item
    );

    // Setăm imaginile rămase
    setPropertySelectedImgs(deleted);

    // Verificăm dacă elementul șters nu este o instanță a clasei File și, în caz afirmativ, îl adăugăm la setDeletedImages
    const isDeletedNotFile = propertySelectedImgs?.find(
      (file) =>
        (file instanceof File ? file.name === item.name : file === item) &&
        !(item instanceof File)
    );

    if (isDeletedNotFile) {
      setDeletedImages((prevDeletedImages) => [...prevDeletedImages, item]);
      setIsNewImage(true);
    }
  };

  return (
    <div className="row">
      <div className="row">
        <div className="col-lg-12">
          <h3 className="mb30">Galerie foto</h3>
        </div>
        {/* End .col */}

        <GalerieFotoSection
          // handleInputChange={handleInputChange}
          // formValues={formValues}
          deleteImage={deleteImage}
          multipleImage={multipleImage}
          propertySelectedImgs={propertySelectedImgs}
          isEdit={isEdit}
          isNewImage={isNewImage}
        />
        {/* End .col */}
      </div>

      <div className="col-lg-12">
        <h3 className="mb30">Logo partener</h3>
      </div>
      {/* End .col */}

      <LogoUpload
        singleImage={singleImage}
        deleteLogo={deleteLogo}
        logoImg={logo}
        isEdit={isEdit}
        isNewImage={isNewLogo}
      />
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

      <div className="col-xl-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="exampleFormControlTextarea1">
            Descriere partener
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="7"
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
          ></textarea>
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
            <option data-tokens="Status2">Bucuresti</option>
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

      <AutocompleteInput
        onPlaceChanged={handleLocationSelect}
        adresa={adresaSediu}
      />
      {/* End .col */}

      <div className="col-xl-12 text-right mt-4">
        <div className="my_profile_setting_input">
          {/* <button className="btn btn1">Actualizeaza Profil</button> */}
          <button className="btn btn2" onClick={handleUpdateProfile}>
            {isLoading ? <CommonLoader /> : "Actualizeaza Profil"}
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

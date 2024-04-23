"use client";

import { useState } from "react";

const ProfileInfo = ({ partener: part }) => {
  const [profile, setProfile] = useState(null);

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
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
            value={part?.denumireBrand}
            readOnly
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
            value={part?.email}
            readOnly
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
            value={part?.numeContact}
            readOnly
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
            value={part?.telefonContact}
            onChange={(e) => setTelefonContact(e.target.value)}
            readOnly
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
            value={part?.judet}
            readOnly
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
            value={part?.localitate}
            readOnly
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
            value={part?.cui}
            readOnly
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
            value={part?.categorie}
            disabled
          >
            <option data-tokens="Status1">Alege Categorie</option>
            <option data-tokens="Status2">Categorie1</option>
            <option data-tokens="Status3">Categorie2</option>
          </select>
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

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Adresa Sediu</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput7"
            value={part?.adresaSediu}
            readOnly
          />
        </div>
      </div>
      {/* End .col */}
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

      {/* <div className="col-xl-12 text-right mt-4">
        <div className="my_profile_setting_input">
          <button className="btn btn1">Actualizeaza Profil</button>
          <button className="btn btn2" onClick={handleUpdateProfile}>
            Actualizeaza Profil
          </button>
        </div>
      </div> */}
      {/* End .col */}
    </div>
  );
};

export default ProfileInfo;

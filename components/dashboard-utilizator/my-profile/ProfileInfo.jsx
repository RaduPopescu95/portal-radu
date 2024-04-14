"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const { userData, currentUser, setCurrentUser } = useAuth();
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

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

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
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">Titulatura</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput5"
            placeholder="Titulatura..."
            value={titulatura}
            onChange={(e) => setTitulatura(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">județ de reședință</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput5"
            placeholder="Judet de resedinta"
            value={judet}
            onChange={(e) => setJudet(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Localitate</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput7"
            placeholder="Localitate"
            value={localitate}
            onChange={(e) => setLocalitate(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Data nașterii</label>
          <input
            type="text"
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
          <label htmlFor="formGroupExampleInput8">Specializare</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput8"
            placeholder="Specializare"
            value={specializare}
            onChange={(e) => setSpecializare(e.target.value)}
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
          <button className="btn btn2">Actualizeaza Profil</button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ProfileInfo;

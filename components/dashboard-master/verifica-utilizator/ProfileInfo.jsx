'use client'

import { useState } from "react";

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);

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
                        placeholder="Popescu Adrian"
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
                        placeholder="test@email.com"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput3">Nume</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        placeholder="Popescu Adrian"
                        />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput5">Titulatura</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput5"
                        placeholder="Titulatura..."
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
                        placeholder="Dambovita"
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
                        placeholder="Targoviste"
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
                        placeholder="02/03/1995"
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
                        placeholder="Chirurgie"
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
                    <button className="btn btn2">Activeaza</button>
                </div>
            </div>
            {/* End .col */}
        </div>
    );
};

export default ProfileInfo;

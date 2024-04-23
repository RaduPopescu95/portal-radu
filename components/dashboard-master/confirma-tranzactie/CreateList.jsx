"use client";

import { useEffect, useState } from "react";

const CreateList = ({ oferta }) => {
  const [profile, setProfile] = useState(null);
  const [fullPrice, setFullPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [selectedOfferType, setSelectedOfferType] = useState(
    "Oferta cu discount procentual general"
  ); // Starea pentru select
  const [fidelitySilver, setFidelitySilver] = useState(
    oferta?.oferta?.gradeFidelitate?.includes("Silver") ? true : false
  );
  const [fidelityGold, setFidelityGold] = useState(
    oferta?.oferta?.gradeFidelitate?.includes("Gold") ? true : false
  );
  const [fidelityPlatinum, setFidelityPlatinum] = useState(
    oferta?.oferta?.gradeFidelitate?.includes("Platinum") ? true : false
  );

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  useEffect(() => {
    if (fullPrice && discountedPrice) {
      const discount = ((fullPrice - discountedPrice) / fullPrice) * 100;
      setDiscountPercentage(discount.toFixed(2)); // Afișează procentul cu două zecimale
    }
  }, [fullPrice, discountedPrice]); // Dependențe: recalculează la schimbarea prețului întreg sau a celui redus

  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Nume Partener</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            readOnly
            value={oferta?.numePartener}
          />
        </div>
      </div>

      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Nume doctor</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            readOnly
            value={oferta?.utilizator?.numeUtilizator}
          />
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Denumire oferta</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            readOnly
            value={oferta?.oferta?.titluOferta}
          />
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Type</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="type1">Type1</option>
            <option data-tokens="Type2">Type2</option>
            <option data-tokens="Type3">Type3</option>
            <option data-tokens="Type4">Type4</option>
            <option data-tokens="Type5">Type5</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label>Grad de fidelitate</label>
          <div className="row mt-2">
            <div className="col-sm-auto">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Silver"
                  id="Silver"
                  checked={fidelitySilver}
                  disabled
                />
                <label className="form-check-label" for="fidelityGradeSilver">
                  Silver
                </label>
              </div>
            </div>
            <div className="col-sm-auto">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Gold"
                  id="Gold"
                  checked={fidelityGold}
                  disabled
                />
                <label className="form-check-label" for="fidelityGradeGold">
                  Gold
                </label>
              </div>
            </div>
            <div className="col-sm-auto">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Platinum"
                  id="Platinum"
                  checked={fidelityPlatinum}
                  disabled
                />
                <label className="form-check-label" for="fidelityGradePlatinum">
                  Platinum
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Tip oferta</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={oferta?.oferta?.tipOferta}
            disabled
          >
            <option data-tokens="Status1">Selecteaza tip oferta</option>
            <option data-tokens="Oferta cu discount procentual general">
              Oferta cu discount procentual general
            </option>
            <option data-tokens="Oferta specifică">Oferta specifică</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">Procent</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
          />
        </div>
      </div> */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="fullPrice">Preț întreg</label>
          <input
            type="number"
            className="form-control"
            id="fullPrice"
            value={oferta?.oferta?.pretIntreg}
            readOnly
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="discountedPrice">Preț redus</label>
          <input
            type="number"
            className="form-control"
            id="discountedPrice"
            value={oferta?.oferta?.pretRedus}
            readOnly
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="discountPercentage">Procent reducere</label>
          <input
            type="text"
            className="form-control"
            id="discountPercentage"
            value={oferta?.oferta?.procentReducere + "%"}
            readOnly
          />
        </div>
      </div>

      {/* End .col */}
      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">Area</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
          />
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Rooms</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Status1">1</option>
            <option data-tokens="Status2">2</option>
            <option data-tokens="Status3">3</option>
            <option data-tokens="Status4">4</option>
            <option data-tokens="Status5">5</option>
            <option data-tokens="Status6">Other</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          {/* <button className="btn btn1 float-start">Back</button> */}
          <button className="btn btn2 float-end">Confirma tranzactie</button>
        </div>
      </div>
    </>
  );
};

export default CreateList;
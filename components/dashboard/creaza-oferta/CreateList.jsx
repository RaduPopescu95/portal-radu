"use client";

import { handleUploadFirestore } from "@/utils/firestoreUtils";
import { useEffect, useState } from "react";

const CreateList = () => {
  const [image, setImage] = useState(null);
  const [pretIntreg, setPretIntreg] = useState("");
  const [pretRedus, setPretRedus] = useState("");
  const [procentReducere, setProcentReducere] = useState("");
  const [titluOferta, setTitluOferta] = useState("");
  const [descriereOferta, setDescriereOferta] = useState("");
  const [gradeFidelitate, setGradeFidelitate] = useState([]);
  const [tipOferta, setTipOferta] = useState("");
  const [dataActivare, setDataActivare] = useState("");
  const [dataDezactivare, setDataDezactivare] = useState("");

  const handleFidelityChange = (event) => {
    const grade = event.target.value;
    const isChecked = event.target.checked;
    setGradeFidelitate((prev) => {
      if (isChecked) {
        // Adaugă gradul în lista de grade de fidelitate
        return [...prev, grade];
      } else {
        // Elimină gradul din lista de grade de fidelitate
        return prev.filter((g) => g !== grade);
      }
    });
  };

  // upload image
  const uploadProfile = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (pretIntreg && pretRedus) {
      const discount = ((pretIntreg - pretRedus) / pretIntreg) * 100;
      setProcentReducere(discount.toFixed(2)); // Afișează procentul cu două zecimale
    }
  }, [pretIntreg, pretRedus]); // Recalculează la schimbarea prețului întreg sau a celui redus

  const resetState = () => {
    setImage(null);
    setPretIntreg("");
    setPretRedus("");
    setProcentReducere("");
    setTitluOferta("");
    setDescriereOferta("");
    setGradeFidelitate([]);
    setTipOferta("");
    setDataActivare("");
    setDataDezactivare("");
  };

  const handleAddOffer = async () => {
    let data = {
      dataDezactivare,
      dataActivare,
      tipOferta,
      gradeFidelitate,
      descriereOferta,
      titluOferta,
      procentReducere,
      pretRedus,
      pretIntreg,
    };
    handleUploadFirestore(data, "Oferte");
    resetState();
  };

  return (
    <>
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
              image !== null
                ? {
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                  }
                : undefined
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> încarcă Imagine{" "}
            </span>
          </label>
        </div>
        <p>*minimum 260px x 260px</p>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Titlu oferta</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            value={titluOferta}
            onChange={(e) => setTitluOferta(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Descriere oferta</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            value={descriereOferta}
            onChange={(e) => setDescriereOferta(e.target.value)}
          ></textarea>
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
          <label>Valabilă pentru următoarele grade de fidelitate</label>
          <div className="row mt-2">
            <div className="col-sm-auto">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Silver"
                  id="fidelityGradeSilver"
                  onChange={handleFidelityChange}
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
                  id="fidelityGradeGold"
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
                  id="fidelityGradePlatinum"
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
            value={tipOferta}
            onChange={(e) => setTipOferta(e.target.value)}
          >
            <option data-tokens="Status1">
              Oferta cu discount procentual general
            </option>
            <option data-tokens="Status2">Oferta specifică</option>
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
          <label htmlFor="pretIntreg">Preț întreg</label>
          <input
            type="number"
            className="form-control"
            id="pretIntreg"
            value={pretIntreg}
            onChange={(e) => setPretIntreg(e.target.value)}
            placeholder="Introdu prețul întreg"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="pretRedus">Preț redus</label>
          <input
            type="number"
            className="form-control"
            id="pretRedus"
            value={pretRedus}
            onChange={(e) => setPretRedus(e.target.value)}
            placeholder="Introdu prețul redus"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="procentReducere">Procent reducere</label>
          <input
            type="text"
            className="form-control"
            id="procentReducere"
            value={procentReducere + "%"}
            readOnly
          />
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="activationDate">Data de activare</label>
          <input
            type="date"
            className="form-control"
            id="activationDate"
            value={dataActivare}
            onChange={(e) => setDataActivare(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="deactivationDate">Data de dezactivare</label>
          <input
            type="date"
            className="form-control"
            id="deactivationDate"
            value={dataDezactivare}
            onChange={(e) => setDataDezactivare(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

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
          <button onClick={handleAddOffer} className="btn btn2 float-end">
            Adauga
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateList;

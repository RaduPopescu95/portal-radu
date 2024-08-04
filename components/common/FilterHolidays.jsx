"use client";

import {
  addKeyword,
  addLocation,
} from "../../features/properties/propertiesSlice";
import PricingRangeSlider from "./PricingRangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";
import GlobalSelectBox from "./GlobalSelectBox";
import { useRouter } from "next/navigation";
import { jd } from "@/data/judeteLocalitati";
import {
  handleQueryFirestoreSubcollection,
  handleUploadFirestore,
  handleUploadFirestoreSubcollection,
  uploadJudete,
} from "@/utils/firestoreUtils";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { locatii, transportCircuit, transportSejur } from "@/utils/constants";
import { AlertModal } from "./AlertModal";

const FilterHolidays = ({ className = "", partener }) => {
  const router = useRouter();
  const { userData } = useAuth();

  const [tipSejur, setTipSejur] = useState("");
  const [tipTransport, setTipTransport] = useState("");

  const [isCateogireSelected, setIsCategorieSelected] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [deUndes, setDeUndes] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDestinatie, setSelectedDestinatie] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState("");
  const [rooms, setRooms] = useState([
    {
      adults: 4,
      children: [{ age: 12 }, { age: 10 }, { age: 5 }],
      isVisible: false,
    },
  ]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const toggleRoomDetails = (index) => {
    const newRooms = rooms.map((room, roomIndex) => ({
      ...room,
      isVisible: index === roomIndex ? !room.isVisible : room.isVisible,
    }));
    setRooms(newRooms);
  };

  const handleAdultChange = (index, event) => {
    event.stopPropagation();
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    const newRooms = [...rooms];
    newRooms[index].adults = value;
    setRooms(newRooms);
  };

  const handleChildrenChange = (roomIndex, childIndex, event) => {
    event.stopPropagation();
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    const newRooms = [...rooms];
    newRooms[roomIndex].children[childIndex].age = value;
    setRooms(newRooms);
  };

  const handleChildrenNumberChange = (roomIndex, event) => {
    event.stopPropagation();
    event.preventDefault();
    const number = parseInt(event.target.value, 10);
    const newRooms = [...rooms];
    const currentNumberOfChildren = newRooms[roomIndex].children.length;

    if (number > currentNumberOfChildren) {
      for (let i = currentNumberOfChildren; i < number; i++) {
        newRooms[roomIndex].children.push({ age: 0 });
      }
    } else {
      newRooms[roomIndex].children.length = number;
    }

    setRooms(newRooms);
  };

  const handleAddChild = (roomIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].children.push({ age: 0 });
    setRooms(newRooms);
  };

  const handleRemoveChild = (roomIndex, childIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].children.splice(childIndex, 1);
    setRooms(newRooms);
  };

  // Handler pentru schimbarea selectiei de judete
  // La încărcarea componentei, populează lista de țări
  useEffect(() => {
    setCountries(Object.keys(locatii));
    setDeUndes(locatii.România);
  }, []);

  // Actualizează orașele când se schimbă țara selectată
  useEffect(() => {
    if (selectedCountry) {
      setCities(locatii[selectedCountry]);
    } else {
      setCities([]);
    }
    setSelectedDestinatie(""); // Resetează orașul selectat la schimbarea țării
  }, [selectedCountry]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTipSejur = (event) => {
    setTipSejur(event.target.value);
  };

  const handleTipTransport = (event) => {
    setTipTransport(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleDestinatieChange = (event) => {
    setSelectedDestinatie(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleNightsChange = (event) => {
    setNumberOfNights(event.target.value);
  };

  // submit handler
  const handleSubmit = async () => {
    const roomDetails = rooms
      .map((room, index) => {
        const childrenAges = room.children.map((child) => child.age).join(", ");
        return `Cameră ${index + 1}: ${room.adults} adulți, ${
          room.children.length
        } copii , varstele ${childrenAges}`;
      })
      .join(" | ");

    const message = `Am primit solicitarea ta și vă vom contacta în cel mai scurt timp!`;
    // Nopți: ${numberOfNights} |
    // Dată: ${selectedDate} |
    // Localitate: ${selectedCity} |
    // Destinație: ${selectedDestinatie} |
    // Țară: ${selectedCountry} |
    // Transport: ${tipTransport} |
    // Tip Sejur: ${tipSejur} |
    // Detalii camere: ${roomDetails}`;

    const data = {
      numberOfNights,
      selectedDate,
      selectedCity,
      selectedDestinatie,
      selectedCountry,
      tipTransport,
      tipSejur,
      roomDetails,
      rooms,
      infoDoctor: userData,
      helloHolidaysInfo: partener,
    };
    await handleUploadFirestoreSubcollection(
      data,
      `Users/${partener.user_uid}/CereriHelloHolidays`,
      partener.user_uid,
      `${userData.numeUtilizator} a trimis catre Hello Holidays cerere pentru un numar de ${numberOfNights} nopti în data de ${selectedDate} pentru destinatia ${selectedDestinatie}`
    ).then(() => {
      showAlert(message, "success");
    });
  };

  return (
    <>
      <div className={`home1-advnc-search ${className}`}>
        <ul className="h1ads_1st_list mb-10">
          <li className="list-inline-item mb10">
            <div className="search_option_two">
              <div className="candidate_revew_select">
                <select
                  className={`selectpicker w100 form-select show-tick ${
                    !isCateogireSelected ? "border-danger" : ""
                  }`}
                  onChange={handleTipSejur}
                  value={tipSejur}
                >
                  <option value="">Tip rezervare</option>
                  <option data-tokens="Sejururi">Sejururi</option>
                  <option data-tokens="Circuite">Circuite</option>
                  <option data-tokens="Cazari">Cazari</option>
                  <option data-tokens="Turism intern">Turism intern</option>
                </select>
              </div>
            </div>
          </li>
          {/* End li */}

          {tipSejur !== "Turism intern" && tipSejur !== "Cazari" ? (
            <li className="list-inline-item">
              <div className="search_option_two">
                <div className="candidate_revew_select">
                  <select
                    className={`selectpicker w100 form-select show-tick ${
                      !isCateogireSelected ? "border-danger" : ""
                    }`}
                    onChange={handleTipTransport}
                    value={tipTransport}
                  >
                    <option value="">Tip Transport</option>
                    {(tipSejur === "Sejururi"
                      ? transportSejur
                      : transportCircuit
                    ).map((t, index) => (
                      <option key={index} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          ) : null}
          {/* End li */}
          {tipSejur !== "Turism intern" && tipSejur !== "Cazari" ? (
            <li className="list-inline-item">
              <div className="search_option_two">
                <div className="candidate_revew_select">
                  <select
                    className="selectpicker w100 form-select show-tick"
                    onChange={handleCityChange}
                    value={selectedCity}
                  >
                    <option value="">De unde?</option>
                    {deUndes.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          ) : null}

          {/* End li */}

          {tipSejur !== "Turism intern" ? (
            <li className="list-inline-item">
              <div className="search_option_two">
                <div className="candidate_revew_select">
                  <select
                    className="selectpicker w100 form-select show-tick"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                  >
                    <option value="">Unde?</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          ) : null}
          {/* End li */}

          <li className="list-inline-item">
            <div className="search_option_two">
              <div className="candidate_revew_select">
                <select
                  className="selectpicker w100 form-select show-tick"
                  onChange={handleDestinatieChange}
                  value={selectedDestinatie}
                >
                  <option value="">Destinatie</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>

          {/* End li */}
          <li className="list-inline-item">
            <div className="search_option_two">
              <div className="candidate_revew_select">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </li>

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <input
                type="date"
                className="form-control"
                id="activationDate"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          {/* End li */}
          <li className="list-inline-item">
            <div className="search_option_two">
              <div className="candidate_revew_select">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nopti"
                  value={numberOfNights}
                  onChange={handleNightsChange}
                />
              </div>
            </div>
          </li>

          {/* End li */}
          {rooms.map((room, index) => (
            <li key={index} className="list-inline-item">
              <div className="camere">
                <div>{`1 cameră, ${room.adults} adulți, ${room.children.length} copii`}</div>
                <span
                  className="toggle-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRoomDetails(index);
                  }}
                >
                  {room.isVisible ? (
                    <span
                      className="flaticon-tick"
                      style={{ color: "green" }}
                    ></span>
                  ) : (
                    <span className="flaticon-download"></span>
                  )}
                  {/* Icon pentru toggle */}
                </span>
              </div>
              <div className="search_option_two container_drop_copil">
                <div className="container_drop_copil">
                  {room.isVisible ? (
                    <>
                      <select
                        className="selectpicker form-select"
                        value={room.adults}
                        onChange={(e) => {
                          handleAdultChange(index, e);
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        {[1, 2, 3, 4].map((number) => (
                          <option
                            key={number}
                            value={number}
                          >{`${number} Adulți`}</option>
                        ))}
                      </select>
                      <select
                        className="selectpicker form-select"
                        value={room.children.length}
                        onChange={(e) => {
                          handleChildrenNumberChange(index, e);
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        {[0, 1, 2, 3, 4, 5].map((number) => (
                          <option
                            key={number}
                            value={number}
                          >{`${number} Copii`}</option>
                        ))}
                      </select>
                      {room.children.map((child, childIndex) => (
                        <select
                          key={childIndex}
                          className="selectpicker form-select"
                          value={child.age}
                          onChange={(e) => {
                            handleChildrenChange(index, childIndex, e);
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          {[
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                            15, 16, 17,
                          ].map((age) => (
                            <option
                              key={age}
                              value={age}
                            >{`${age} ani`}</option>
                          ))}
                        </select>
                      ))}
                      <div className="search_option_button buton_selectare_camere">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRoomDetails(index);
                          }}
                          type="submit"
                          className="btn btn-thm buton_selectare_camere"
                        >
                          Selecteaza
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          ))}

          {/* End li */}

          {/* End li */}
        </ul>
        <ul className="h1ads_1st_list mb-10">
          <li className="list-inline-item">
            <div className="search_option_button">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-thm"
              >
                Trimite formular
              </button>
            </div>
          </li>
        </ul>
      </div>
      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </>
  );
};

export default FilterHolidays;

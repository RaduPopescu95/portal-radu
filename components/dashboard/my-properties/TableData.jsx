"use client";

import Image from "next/image";
import properties from "../../../data/properties";
import { useState } from "react";
import oferte from "@/data/oferte";
import GradeFidelitate from "./GradeFidelitate";

// CSS in JS pentru simbolurile tick și close
const styles = {
  tick: {
    color: "green", // Verde pentru tick
  },
  close: {
    color: "red", // Roșu pentru close
  },
};

const TableData = ({ oferte }) => {
  const initialState = oferte.reduce((acc, item) => {
    acc[item.id] = item.initialState;
    return acc;
  }, {});

  const [toggled, setToggled] = useState(initialState);
  const handleToggle = (id) => {
    setToggled((prev) => {
      const currentToggleState = prev[id] || "none"; // Presupunem 'none' ca stare inițială
      let nextToggleState;

      if (currentToggleState === "none" || currentToggleState === "close") {
        nextToggleState = "tick"; // Dacă este 'none' sau 'close', schimbăm la 'tick'
      } else {
        nextToggleState = "close"; // Dacă este 'tick', schimbăm la 'close'
      }

      return { ...prev, [id]: nextToggleState };
    });
  };

  let theadConent = ["Oferta", "Data", "Status", "Fidelitate", "Actiune"];
  let tbodyContent = oferte?.map((item) => (
    <tr key={item.id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
            <Image
              width={150}
              height={220}
              className="cover"
              src={item.img}
              alt="fp1.jpg"
            />
            {/* <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">For Rent</a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>{item.titluOferta}</h4>
              {/* <p>
                <span className="flaticon-placeholder"></span>
                {item.location}
              </p> */}
              {/* <a className="fp_price text-thm" href="#">
                ${item.price}
                <small>/mo</small>
              </a> */}
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td>{item.firstUploadDate}</td>
      {/* End td */}

      <td>
        {item.status === "Inactiva" ? (
          <span className="status_tag redbadge">Inactiva</span>
        ) : item.status === "Activa" ? (
          <span className="status_tag badge">Activa</span>
        ) : null}
      </td>
      {/* End td */}

      <GradeFidelitate grades={item.gradeFidelitate} />

      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <a href="#">
              <span className="flaticon-edit"></span>
            </a>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#">
              <span className="flaticon-garbage"></span>
            </a>
          </li>
          {/* End li */}
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Toggle"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleToggle(item.id);
              }}
            >
              {item.status === "Activa" ? (
                <span className="flaticon-tick" style={styles.tick}></span>
              ) : item.status === "Inactiva" ? (
                <span className="flaticon-close" style={styles.close}></span>
              ) : (
                // Afișează ambele opțiuni când nu este niciuna selectată inițial
                <>
                  <span className="flaticon-tick" style={styles.tick}></span>
                  <span className="flaticon-close" style={styles.close}></span>
                </>
              )}
            </a>
          </li>
          {/* End li */}
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;

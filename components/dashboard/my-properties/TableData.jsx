"use client";

import Image from "next/image";
import properties from "../../../data/properties";
import { useState } from "react";
import oferte from "@/data/oferte";
import GradeFidelitate from "./GradeFidelitate";
import Link from "next/link";
import { handleUpdateFirestoreSubcollection } from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";

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
  const [offers, setOffers] = useState([...oferte]);
  const { currentUser } = useAuth();

  const handleToggle = async (oferta) => {
    // Mapați și transformați fiecare item asincron
    const updatedOffers = await Promise.all(
      offers.map(async (item) => {
        if (item.id === oferta.id) {
          // Verifică statusul curent și îl schimbă
          const newStatus = item.status === "Activa" ? "Inactiva" : "Activa";
          let data = {
            status: newStatus,
          };
          await handleUpdateFirestoreSubcollection(
            data,
            `Users/${currentUser.uid}/Oferte/${oferta.documentId}`
          );
          return { ...item, status: newStatus }; // Returnează obiectul actualizat
        }
        return item; // Returnează obiectul neschimbat
      })
    );

    // Actualizează starea offers cu noul array modificat
    setOffers(updatedOffers);
  };

  let theadConent = ["Oferta", "Data", "Status", "Fidelitate", "Actiune"];
  let tbodyContent = offers?.map((item) => (
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
          <div className="details d-flex justify-content-center">
            <div className="tc_content d-flex align-items-center justify-content-center">
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
            <Link href={`creaza-oferta/${item.id}`}>
              <span className="flaticon-edit"></span>
            </Link>
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
                handleToggle(item);
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

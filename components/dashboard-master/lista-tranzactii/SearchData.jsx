"use client";

import { useAuth } from "@/context/AuthContext";
import {
  handleQueryFirestore,
  handleUpdateFirestore,
  handleUpdateFirestoreSubcollection,
  handleUploadFirestore,
} from "@/utils/firestoreUtils";
import Link from "next/link";
import React, { useState } from "react";

// CSS in JS pentru simbolurile tick și close
const styles = {
  tick: {
    color: "green", // Verde pentru tick
  },
  close: {
    color: "red", // Roșu pentru close
  },
};

const SearchData = ({ oferteInregistrate }) => {
  const [offers, setOffers] = useState([...oferteInregistrate]);
  const { currentUser } = useAuth();

  const handleToggle = async (oferta) => {
    console.log(oferta);
    // Mapați și transformați fiecare item asincron
    const updatedOffers = await Promise.all(
      offers.map(async (item) => {
        if (item.id === oferta.id) {
          // Verifică statusul curent și îl schimbă
          const newStatus =
            item.status === "Confirmata" ? "Neconfirmata" : "Confirmata";
          let data = {
            status: newStatus,
          };
          await handleUpdateFirestoreSubcollection(
            data,
            `Users/${oferta?.collectionId}/OferteÎnregistrate/${oferta?.documentId}`
          );
          const doctor = await handleQueryFirestore(
            "Users",
            "user_uid",
            oferta?.idUtilizator
          );
          console.log("test....doctor[0]....", doctor[0]);
          if (newStatus === "Confirmata") {
            doctor[0].rulajCont =
              Number(doctor[0].rulajCont) + Number(oferta.pretFinal);
          } else if (newStatus === "Neconfirmata") {
            doctor[0].rulajCont =
              Number(doctor[0].rulajCont) - Number(oferta.pretFinal);
          }

          console.log("test....doctor[0]....", doctor[0]);
          await handleUpdateFirestore(
            `Users/${oferta.idUtilizator}`,
            doctor[0]
          );
          return { ...item, status: newStatus }; // Returnează obiectul actualizat
        }
        return item; // Returnează obiectul neschimbat
      })
    );

    // Actualizează starea offers cu noul array modificat
    setOffers(updatedOffers);
  };
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Titlu oferta</th>
          <th scope="col">Tip oferta</th>
          <th scope="col">Nume partener</th>
          <th scope="col">Nume doctor</th>
          <th scope="col">status</th>
          <th scope="col">Data</th>
          <th scope="col">Actiune</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((row, index) => (
          <tr key={index} className={row.active ? "title active" : "title"}>
            <td className="para">{row.oferta?.titluOferta}</td>
            <td className="para">{row.oferta?.tipOferta}</td>
            <td className="para">{row.numePartener}</td>
            <td className="para">{row.utilizator?.numeUtilizator}</td>
            <td>
              {row.status === "Neconfirmata" ? (
                <span className="status_tag redbadge">Neconfirmata</span>
              ) : row.status === "Confirmata" ? (
                <span className="status_tag badge">Confirmata</span>
              ) : null}
            </td>
            <td className="para">{row.firstUploadDate}</td>
            <td>
              <ul className="view_edit_delete_list mb0">
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="View"
                >
                  <Link href={`/confirma-tranzactie/${row.id}`}>
                    <span className="flaticon-view"></span>
                  </Link>
                </li>
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
                      handleToggle(row);
                    }}
                  >
                    {row.status === "Confirmata" ? (
                      <span
                        className="flaticon-tick"
                        style={styles.tick}
                      ></span>
                    ) : (
                      <span
                        className="flaticon-close"
                        style={styles.close}
                      ></span>
                    )}
                  </a>
                </li>
                {/* End li */}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchData;

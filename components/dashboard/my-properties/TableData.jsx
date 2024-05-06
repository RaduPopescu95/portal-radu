"use client";

import Image from "next/image";
import properties from "../../../data/properties";
import { useState } from "react";
import oferte from "@/data/oferte";
import GradeFidelitate from "./GradeFidelitate";
import Link from "next/link";
import {
  handleDeleteFirestoreSubcollectionData,
  handleUpdateFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";
import DeleteDialog from "@/components/common/dialogs/DeleteDialog";
import { deleteImage } from "@/utils/storageUtils";
import { useCollectionPagination } from "@/hooks/useCollectionPagination";

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
  console.log("TableData oferte:", oferte); // Check what is received exactly
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("TableData oferte:", oferte); // Check what is received exactly
  const { currentUser } = useAuth();
  const collectionPath = `Users/${currentUser?.uid}/Oferte`; // Replace with your actual path
  const pageSize = 6; // Set the desired number of items per page
  const {
    items,
    currentPage,
    totalPages,
    setCurrentPage,
    previousPage,
    nextPage,
    setItems,
  } = useCollectionPagination(collectionPath, pageSize);
  let content = offers.length > 0 ? offers : oferte;

  const handleDeleteClick = (item) => {
    console.log("item...", item);
    setSelectedItem(item); // Salvează ID-ul elementului selectat
    setShowModal(true); // Afișează modalul
  };

  // Închide modalul fără a șterge
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Logica de ștergere a elementului
  const handleConfirmDelete = async () => {
    console.log("Deleting item with ID:", selectedItem);
    // console.log("location.....:", location);
    let updatedData = await handleDeleteFirestoreSubcollectionData(
      `Users/${selectedItem.collectionId}/Oferte/${selectedItem.documentId}`,
      true,
      `Users/${selectedItem.collectionId}/Oferte`,
      selectedItem
    );
    if (selectedItem.imagineOferta) {
      deleteImage("PozeOferte", selectedItem.imagineOferta.fileName);
    }
    // // Aici adaugi logica pentru a șterge elementul din sursa ta de date
    setItems(updatedData);
    setShowModal(false); // Închide modalul după ștergere
  };

  const handleToggle = async (oferta) => {
    // Mapați și transformați fiecare item asincron
    const updatedOffers = await Promise.all(
      content.map(async (item) => {
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

    // Actualizează starea oferte cu noul array modificat
    setOffers(updatedOffers);
  };

  if (!oferte || oferte.length === 0) {
    return <p>No data available.</p>; // Show a message if no data
  }

  let theadConent = ["Oferta", "Data", "Status", "Fidelitate", "Actiune"];

  let tbodyContent = content?.map((item) => (
    <tr key={item.id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          {item?.tipOferta === "Oferta specifică" && (
            <div className="thumb">
              <Image
                width={150}
                height={220}
                className="cover"
                src={item?.imagineOferta?.finalUri}
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
          )}
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
            <Link href={`creaza-oferta/${item.id}-${item.collectionId}`}>
              <span className="flaticon-edit"></span>
            </Link>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(item);
            }}
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

      {showModal && (
        <DeleteDialog
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default TableData;

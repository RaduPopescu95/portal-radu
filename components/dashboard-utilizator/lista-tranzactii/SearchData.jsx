import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateFirestoreSubcollection } from "@/utils/firestoreUtils";
import { uploadImage } from "@/utils/storageUtils";
import { AlertModal } from "@/components/common/AlertModal";
import CommonLoader from "@/components/common/CommonLoader";

const SearchData = ({ oferteInregistrate }) => {
  const [offers, setOffers] = useState([...oferteInregistrate]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loadingStates, setLoadingStates] = useState(Array(oferteInregistrate.length).fill(false)); // Array de stări de încărcare

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const updateOffers = (index, newOffer) => {
    const updatedOffers = [...offers];
    updatedOffers[index] = newOffer;
    setOffers(updatedOffers);
  };

  const handleFileSelect = (index) => async (event) => {
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);

    const file = event.target.files[0];
    if (file) {
      const imagineBonFactura = await uploadImage(
        file,
        offers[index].imagineBonFactura?.fileName ? true : false,
        "BonuriFacturi",
        offers[index].imagineBonFactura?.fileName
      );
      const newOffer = { ...offers[index], imagineBonFactura };
      updateOffers(index, newOffer);
      handleUpdateFirestoreSubcollection(
        newOffer,
        `Users/${offers[index].collectionId}/OferteInregistrate/${offers[index].documentId}`
      )
        .then(() => {
          showAlert("Operație efectuată cu succes!", "success");
        })
        .catch((error) => {
          showAlert(`A apărut o eroare: ${error.message}`, "danger");
        })
        .finally(() => {
          newLoadingStates[index] = false;
          setLoadingStates(newLoadingStates);
        });
    } else {
      newLoadingStates[index] = false;
      setLoadingStates(newLoadingStates);
    }
  };

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Titlu oferta</th>
            <th scope="col">Tip oferta</th>
            <th scope="col">Nume partener</th>
            <th scope="col">Data</th>
            <th scope="col">Acțiune</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((row, index) => (
            <tr key={index} className={row.active ? "title active" : "title"}>
              <td className="para">{row.oferta?.titluOferta}</td>
              <td className="para">{row.oferta?.tipOferta}</td>
              <td className="para">{row.numePartener}</td>
              <td className="para">{row.firstUploadDate}</td>
              <td className="para">
                <input
                  type="file"
                  onChange={handleFileSelect(index)}
                  style={{ display: "none" }}
                  id={`file-input-${index}`}
                />
                {loadingStates[index] ? (
                  <CommonLoader />
                ) : (
                  <label htmlFor={`file-input-${index}`} className="btn admore_btn mb30">
                    {row.imagineBonFactura?.fileName ? "Modifica bon/factura" : "Adauga bon/factura"}
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </>
  );
};

export default SearchData;

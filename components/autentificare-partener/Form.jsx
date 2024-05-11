"use client";

import { useAuth } from "@/context/AuthContext";
import { authentication } from "@/firebase";
import { handleSignIn } from "@/utils/authUtils";
import { handleQueryFirestoreSubcollection } from "@/utils/firestoreUtils";
import { useRouter } from "next/navigation"; // Aici ar trebui să fie "next/router", nu "next/navigation"
import React, { useState } from "react"; // Importăm useState din React
import { AlertModal } from "../common/AlertModal";

const Form = () => {
  // Stări locale pentru email și parolă
  const [cui, setCui] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Stare pentru a stoca mesaje de eroare
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  // Functie pentru a gestiona trimiterea formularului
  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log(userData);
    // console.log(currentUser);

    if (!password || !cui) {
      return;
    }

    let utilizator = await handleQueryFirestoreSubcollection(
      "Users",
      "cui",
      cui
    );

    // setUserData(utilizator[0]);
    console.log(utilizator);
    console.log(cui);
    if (!utilizator) {
      showAlert(`Nu a fost gasit nici un utilizator cu acest CUI`, "danger");
    }
    handleSignIn(utilizator[0].email, password)
      .then((userCredentials) => {
        console.log("user credentials...", userCredentials);
        setCurrentUser(userCredentials); // Aici trebuie să asiguri că userCredentials este gestionat corect
      })
      .catch((error) => {
        console.error("Error during sign in:", error.message);
        console.error("Error during sign in:", error.code);
        showAlert(`Eroare la autentificare: ${error.message}`, "danger");
        // setError("Failed to log in. Error message: " + error.message); // Utilizează error.message pentru a oferi feedback utilizatorului
      });
  };

  return (
    <>
      <form action="#" onSubmit={handleSubmit}>
        <div className="heading text-center">
          <h3>Autentificare Partener - Verificare Tranzactie</h3>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}{" "}
        {/* Afișăm mesajul de eroare */}
        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Cui"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        <div className="input-group form-group">
          <input
            type="password"
            className="form-control"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-log w-100 btn-thm">
          Autentificare
        </button>
      </form>

      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </>
  );
};

export default Form;
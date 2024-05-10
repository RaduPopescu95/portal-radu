"use client";

import React, { useEffect, useState } from "react";
import CreateList from "@/components/dashboard/verificare-tranzactie/CreateList";
import Form from "@/components/autentificare-partener/Form";
import { useAuth } from "@/context/AuthContext";
import { authentication } from "@/firebase";

const TransactionVerification = ({ oferta, utilizator, partenerId }) => {
  const { userData, loading } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCurrentUser = async () => {
      if (partenerId) {
        console.log("is partener id...");
        if (
          (!loading && userData?.userType !== "Partener") ||
          (!loading && userData.user_uid !== partenerId)
        ) {
          console.log("not first...");
          setIsVerified(false);
        } else {
          console.log("is first...");
          setIsVerified(true);
        }
      } else {
        if (!loading && userData?.userType !== "Partener") {
          console.log("not second...");
          setIsVerified(false);
        } else {
          console.log("is second...");
          setIsVerified(true);
        }
      }
    };

    verifyCurrentUser(); // Apelarea funcției asincrone în useEffect
  }, [partenerId, userData, loading]); // Dependențele efectului

  return (
    <div className="col-lg-12 mb10">
      <div className="breadcrumb_content style2">
        {!isVerified ? (
          <h2 className="breadcrumb_title">Verificare date utilizator...</h2>
        ) : (
          <h2 className="breadcrumb_title">Verificare tranzacție</h2>
        )}
      </div>
      {!isVerified ? (
        <div className="col-lg-12">
          <Form />
        </div>
      ) : (
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <CreateList oferta={oferta[0]} utilizator={utilizator[0]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionVerification;

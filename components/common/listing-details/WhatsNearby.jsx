"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const WhatsNearby = ({ oferte }) => {
  const [activeTab, setActiveTab] = useState("Silver"); // Default tab
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { userData } = useAuth();

  const fidelityLevels = {
    Silver: ["Silver"],
    Gold: ["Silver", "Gold"],
    Platinum: ["Silver", "Gold", "Platinum"],
  };

  useEffect(() => {
    console.log("oferte.....partener....", oferte);
  }, []);

  const handleOfferSelect = (offer) => {
    setSelectedOffer(
      `https://www.exclusivmd.ro/verificare-tranzactie/${userData?.id}-${offer?.documentId}UIDD${offer?.collectionId}`
    );
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const today = new Date();

  const renderContent = (level) => {
    if (userData?.userType === "Partener" || !userData) {
      return null;
    }

    const today = new Date();

    return (
      <>
        {oferte
          .filter((offer) => {
            const offerStart = new Date(offer.dataActivare);
            const offerEnd = new Date(offer.dataDezactivare);
            console.log("offerstart...", offerStart);
            console.log("offerstart...", offerStart);
            console.log("offerstart...", offerStart);
            console.log("offerstart...", offerStart);
            console.log("offerstart...", offerStart);
            console.log("offerEnd...", offerEnd);
            const isActive =
              today >= offerStart &&
              today <= offerEnd &&
              offer?.gradeFidelitate.includes(level);
            return isActive;
          })
          .map((offer, index) => {
            const isAvailable =
              fidelityLevels[userData?.gradFidelitate].includes(level);
            return (
              <div key={index} className={`offer ${index > 0 ? "mt10" : ""}`}>
                <div className="single_line">
                  <div
                    className={`${
                      !isAvailable ? "grey-out" : ""
                    } text_container`}
                  >
                    <h5>
                      <span className={"flaticon-money-bag"}></span>
                      {offer?.titluOferta}
                    </h5>
                    <p>{offer?.descriereOferta}</p>
                  </div>
                  {isAvailable ? (
                    <button
                      onClick={() => handleOfferSelect(offer)}
                      className="btn btn-primary"
                    >
                      Obține Oferta
                    </button>
                  ) : (
                    <p className="text-muted">{`Oferta valabilă pentru utilizatori ${activeTab}`}</p>
                  )}
                </div>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <ul className="nav nav-tabs">
          {["Silver", "Gold", "Platinum"].map((level) => (
            <li className="nav-item" key={level}>
              <a
                className={`nav-link ${activeTab === level ? "active" : ""}`}
                onClick={() => setActiveTab(level)}
                style={{ cursor: "pointer" }}
              >
                {level}
              </a>
            </li>
          ))}
        </ul>

        <div className="tab-content mt-3">
          {["Silver", "Gold", "Platinum"].map((level) => (
            <div
              key={level}
              className={`tab-pane fade ${
                activeTab === level ? "show active" : ""
              }`}
            >
              {activeTab === level && renderContent(level)}
            </div>
          ))}
        </div>
      </div>

      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: windowWidth < 768 ? "80%" : "24%",
          }}
        >
          <QRCode
            value={selectedOffer}
            size={windowWidth < 768 ? 200 : 256}
            level={"H"}
          />
          <p className="mt10">Scanează pentru a verifica oferta</p>
          <button
            onClick={closeModal}
            className="btn btn-primary btn-md"
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsNearby;

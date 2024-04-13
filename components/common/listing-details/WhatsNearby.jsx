"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Image from "next/image";

const WhatsNearby = () => {
  const [activeTab, setActiveTab] = useState("Silver"); // Default tab
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nearbyContent = [
    {
      id: 1,
      level: "Silver",
      title: "Primiti 20% discount la toate produsele noastre",
      icon: "flaticon-money-bag",
      isAvailable: true,
      singleItem: [
        {
          id: 1,
          name: "Beneficiază de un discount de 20% la toate serviciile de înfrumusețare, exclusiv pentru deținătorii cardului nostru de fidelitate!",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason:
            "Nu este disponibil pentru gradul tău de fidelitate.",
        },
      ],
    },
    {
      id: 2,
      level: "Silver",
      title: "Primiti 20% discount la toate produsele noastre",
      icon: "flaticon-money-bag",
      isAvailable: true,
      singleItem: [
        {
          id: 1,
          name: "Beneficiază de un discount de 20% la toate serviciile de înfrumusețare, exclusiv pentru deținătorii cardului nostru de fidelitate!",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason:
            "Nu este disponibil pentru gradul tău de fidelitate.",
        },
      ],
    },
    {
      id: 3,
      level: "Gold",
      title: "Meniu special de seară la doar 50€ pentru doi",
      icon: "flaticon-money-bag",
      isAvailable: false,
      singleItem: [
        {
          id: 1,
          name: "Meniu special de seară la doar 50€ pentru doi! Include aperitiv, fel principal și desert. Exclusiv pentru posesorii cardului de fidelitate.",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason: "Oferta exclusiva pentru utilizatori Gold.",
        },
      ],
    },
    {
      id: 4,
      level: "Gold",
      title: "Meniu special de seară la doar 50€ pentru doi",
      icon: "flaticon-money-bag",
      isAvailable: false,
      singleItem: [
        {
          id: 1,
          name: "Meniu special de seară la doar 50€ pentru doi! Include aperitiv, fel principal și desert. Exclusiv pentru posesorii cardului de fidelitate.",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason: "Oferta exclusiva pentru utilizatori Gold.",
        },
      ],
    },
    {
      id: 5,
      level: "Platinum",
      title: "Acces gratuit la VIP Lounge",
      icon: "flaticon-money-bag",
      isAvailable: false,
      singleItem: [
        {
          id: 1,
          name: "Acces gratuit la VIP Lounge, exclusiv pentru posesorii cardului de fidelitate Platinum.",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason: "Oferta exclusiva pentru utilizatori Platinum.",
        },
      ],
    },
    {
      id: 6,
      level: "Platinum",
      title: "Acces gratuit la VIP Lounge",
      icon: "flaticon-money-bag",
      isAvailable: false,
      singleItem: [
        {
          id: 1,
          name: "Acces gratuit la VIP Lounge, exclusiv pentru posesorii cardului de fidelitate Platinum.",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason: "Oferta exclusiva pentru utilizatori Platinum.",
        },
      ],
    },
  ];

  const handleOfferSelect = (offer) => {
    setSelectedOffer(
      `https://portal-adrian-beta.vercel.app/verificare-tranzactie?offerId=${offer.id}`
    );
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const renderContent = (level) => {
    return (
      <>
        {nearbyContent
          .filter((item) => item.level === level)
          .map((offer, index) => (
            <div key={index} className={`offer ${index > 0 ? "mt10" : ""}`}>
              <h5>
                <span className={offer.icon}></span> {offer.title}
              </h5>
              {offer.singleItem.map((detail, idx) => (
                <div
                  key={idx}
                  className={`single_line ${
                    !offer.isAvailable ? "grey-out" : ""
                  }`}
                >
                  <p>{detail.name}</p>
                  {!offer.isAvailable ? (
                    <p className="text-muted">{detail.unavailabilityReason}</p>
                  ) : (
                    <button
                      onClick={() => handleOfferSelect(offer)}
                      className="btn btn-primary"
                    >
                      Obține Oferta
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "Silver" ? "active" : ""}`}
              onClick={() => setActiveTab("Silver")}
              style={{ cursor: "pointer" }}
            >
              Silver
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "Gold" ? "active" : ""}`}
              onClick={() => setActiveTab("Gold")}
              style={{ cursor: "pointer" }}
            >
              Gold
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "Platinum" ? "active" : ""}`}
              onClick={() => setActiveTab("Platinum")}
              style={{ cursor: "pointer" }}
            >
              Platinum
            </a>
          </li>
        </ul>

        <div className="tab-content mt-3">
          <div
            className={`tab-pane fade ${
              activeTab === "Silver" ? "show active" : ""
            }`}
          >
            {activeTab === "Silver" && renderContent("Silver")}
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "Gold" ? "show active" : ""
            }`}
          >
            {activeTab === "Gold" && renderContent("Gold")}
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "Platinum" ? "show active" : ""
            }`}
          >
            {activeTab === "Platinum" && renderContent("Platinum")}
          </div>
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

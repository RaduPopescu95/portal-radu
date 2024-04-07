"use client"

import React, { useState } from 'react';
import Ratings from "../../blog-details/Ratings";
import QRCode from 'react-qr-code';

const WhatsNearby = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const nearbyContent = [
    {
      id: 1,
      styleClass: "grey-out", // Adăugăm o clasă pentru stilizarea înnegrită
      title: "Primiti 20% discount la toate produsele noastre",
      icon: "flaticon-money-bag",
      isAvailable: false, // Indicăm că oferta nu este disponibilă
      singleItem: [
        {
          id: 1,
          name: "Beneficiază de un discount de 20% la toate serviciile de înfrumusețare, exclusiv pentru deținătorii cardului nostru de fidelitate!",
          miles: "3.13",
          totalReview: "8895",
          unavailabilityReason: "Nu este disponibil pentru gradul tău de fidelitate.", // Motivul pentru indisponibilitate
          ratings: <Ratings />,
        },
      ],
    },
    {
      id: 2,
      styleClass: "grey-out", // Similar pentru a doua ofertă
      title: "Meniu special de seară la doar 50€ pentru doi",
      icon: "flaticon-money-bag",
      isAvailable: false,
      singleItem: [
        {
          id: 1,
          name: "Meniu special de seară la doar 50€ pentru doi! Include aperitiv, fel principal și desert. Exclusiv pentru posesorii cardului de fidelitate.",
          miles: "3.13",
          totalReview: "8895",
    
          unavailabilityReason: "Ofertă nevalabilă în acest moment.",
          ratings: <Ratings />,
        },
      ],
    },
    {
      id: 3,
      styleClass: "grey-out", // Similar pentru a doua ofertă
      title: "Meniu special de seară la doar 50€ pentru doi",
      icon: "flaticon-money-bag",
      isAvailable: true,
      singleItem: [
        {
          id: 1,
          name: "Meniu special de seară la doar 50€ pentru doi! Include aperitiv, fel principal și desert. Exclusiv pentru posesorii cardului de fidelitate.",
          miles: "3.13",
          totalReview: "8895",
      
          unavailabilityReason: "Ofertă nevalabilă în acest moment.",
          ratings: <Ratings />,
        },
      ],
    },
    // A treia ofertă rămâne neschimbată, presupunând că este disponibilă
  ];

    // Funcția care va fi apelată când utilizatorul selectează o ofertă
    const handleOfferSelect = (offerId) => {
      const verificationLink = `http://localhost:3000/verificare-tranzactie`;
      setSelectedOffer(verificationLink);
      setIsModalVisible(true); // Afișează modalul
    };

  const renderContent = (content, title) => (
    <>
      <h4 className="mb10">{title}</h4>
      {content.map((item) => (
        <div
          className={`education_distance mb15 ${title === "Oferte" && !item.isAvailable ? "grey-out" : ""}`}
          key={item.id}
        >
          <h5>
            <span className={`${item.icon} ${title === "Oferte" && !item.isAvailable ? "grey-out" : ""}`}></span> {item.title}
          </h5>
          {item.singleItem.map((val) => (
            <div className="single_line" key={val.id}>
              <p className="para">{val.name}</p>
              {title === "Oferte" && item.isAvailable
                ? <ul className="review">
                    <li className="list-inline-item">
                      <button className="btn btn-primary btn-md" onClick={() => handleOfferSelect(val.id)}>Obține Oferta</button>
                    </li>
                  </ul>
                : title === "Oferte" && !item.isAvailable
                  // În loc de buton, afișăm motivul indisponibilității
                  ? 
                  <ul className="review">
                    <li className="list-inline-item">
                      <button className="btn btn-primary btn-md unavailability-reason">{val.unavailabilityReason}</button>
                    </li>
                  </ul>
                  // Dacă suntem în "Istoric oferte accesate", nu aplicăm condițiile de indisponibilitate
                  : null
              }
            </div>
          ))}
          
        </div>
      ))}
    </>
  );

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderModal = () => {
    if (!isModalVisible) return null;

    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '50px',
        zIndex: 1000,
        border: '1px solid #ccc',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width:"24%"
      }}>
        <QRCode value={selectedOffer} size={256} level={"H"} />
        <p className='mt10'>Scanează pentru a verifica oferta</p>
        <button onClick={closeModal} className="btn btn-primary btn-md" style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}>X</button>
      </div>
    );
  };

  return (
    <>
    {renderModal()}
      {renderContent(nearbyContent, "Oferte")}
      <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: '2px', width: '100%', margin: '40px auto' }} />
      {renderContent(nearbyContent, "Istoric oferte accesate")}
            {/* Afișarea codului QR pentru oferta selectată */}
     
    </>
  );
};

export default WhatsNearby;

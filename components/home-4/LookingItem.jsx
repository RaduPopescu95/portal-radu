"use client";
import { useEffect, useState } from "react";
import find from "../../data/find";
import { handleQueryFirestore } from "@/utils/firestoreUtils";
import Image from "next/image";

const LookingItem = () => {
  const [parteneri, setParteneri] = useState([]);
  const handleGetParteners = async () => {
    let parts = await handleQueryFirestore(
      "Users",
      "userType",
      "Partener",
      "statusCont",
      "Activ"
    );
    console.log("parteneri...", parts);
    setParteneri(parts);
  };
  useEffect(() => {
    handleGetParteners();
  }, []);
  return (
    <ul className="list-unstyled w-100 d-flex flex-row align-items-center">
      {parteneri.map((val) => (
        <li
          className="d-flex justify-content-center align-items-center mx-2 my-2 px-0"
          key={val.id}
        >
          <div className="icon icon-container py-2 d-flex align-items-center justify-content-center">
            <Image
              src={val?.logo?.finalUri}
              alt={val?.denumireBrand}
              width={100}
              height={100}
              objectFit="contain"
              className="partner_image"
            />
            <p className="ms-2 text-truncate w-100">{val?.denumireBrand}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LookingItem;

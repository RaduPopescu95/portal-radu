"use client";
import { handleQueryFirestore } from "@/utils/firestoreUtils";
import Image from "next/image";
import { useEffect, useState } from "react";

const Partners = () => {
  const partnersImages = ["1", "1", "1", "1", "1"];
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
    <>
      {parteneri.map((val, i) => (
        <div className="col-sm-6 col-md-4 col-lg" key={i}>
          <div className="our_partner">
            <Image
              width={106}
              height={71}
              className="contain"
              src={val?.logo?.finalUri}
              alt={val?.denumireBrand}
            />

            <div className="main-title text-center mt-1">
              <p>{val?.denumireBrand}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;

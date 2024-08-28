import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { handleQueryFirestore } from "@/utils/firestoreUtils";

const HeaderLogosMobil = () => {
  const [parteneri, setParteneri] = useState([]);
  const sliderRef = useRef(null);

  // Definirea funcției slide la nivelul componentei
  const slide = () => {
    if (sliderRef.current && sliderRef.current.firstChild) {
      const childWidth = sliderRef.current.firstChild.clientWidth;
      const newScrollLeft = sliderRef.current.scrollLeft + childWidth;

      // Resetăm la început când scroll-ul depășește jumătatea lungimii totale (după clone)
      if (
        newScrollLeft >=
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      ) {
        sliderRef.current.scrollLeft = 0;
      } else {
        sliderRef.current.scrollLeft = newScrollLeft;
      }

      setTimeout(slide, 3000); // Așteaptă 3 secunde înainte de următorul slide
    }
  };

  const handleGetParteners = async () => {
    try {
      const parts = await handleQueryFirestore(
        "Users",
        "userType",
        "Partener",
        "statusCont",
        "Activ"
      );
      setParteneri(parts);
      setTimeout(slide, 1000); // Dă timp componentelor să se renderizeze
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    handleGetParteners();
  }, []);

  return (
    <div className="slider-container-mobil">
      <div className="slider-mobil" ref={sliderRef}>
        {parteneri.map((val) => (
          <div className="slide-logos-mobil" key={val.id}>
            <Image
              src={val?.logo?.finalUri}
              alt={val?.denumireBrand}
              width={100}
              height={100}
              objectFit="contain"
              quality={90}
              className="logo-mobil"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderLogosMobil;

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { handleQueryFirestore } from "@/utils/firestoreUtils";

const HeaderLogos = () => {
  const [parteneri, setParteneri] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const sliderRef = useRef(null);

  const slide = () => {
    if (sliderRef.current && sliderRef.current.firstChild) {
      const childWidth = sliderRef.current.firstChild.clientWidth;
      const newScrollLeft = sliderRef.current.scrollLeft + childWidth;

      if (newScrollLeft >= sliderRef.current.scrollWidth / 2) {
        // Resetăm scroll-ul la început după ce ajunge la jumătatea listei clonate
        sliderRef.current.scrollLeft = 0;
      } else {
        sliderRef.current.scrollLeft = newScrollLeft;
      }

      setTimeout(slide, 2000); // Așteaptă 2 secunde înainte de următorul slide
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
      setParteneri([...parts, ...parts]); // Dublăm lista pentru efectul de carousel
      setTimeout(slide, 1000); // Dă timp componentelor să se renderizeze
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    handleGetParteners();
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {parteneri.map((val, index) => (
          <div
            className={`slide-logos ${navbar ? "logos-fundal" : ""}`}
            key={index}
          >
            <Image
              src={val?.logo?.finalUri}
              alt={val?.denumireBrand}
              width={100}
              height={100}
              objectFit="contain"
              quality={90}
              className="logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderLogos;

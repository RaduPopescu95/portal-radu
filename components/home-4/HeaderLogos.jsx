import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { handleQueryFirestore } from "@/utils/firestoreUtils";

const HeaderLogos = () => {
  const [parteneri, setParteneri] = useState([]);

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
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    handleGetParteners();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 5, // 5 slide-uri vizibile pe ecran mare
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // 3 slide-uri vizibile pe ecrane medii
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // 2 slide-uri vizibile pe ecrane mici
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1, // 1 slide vizibil pe ecrane foarte mici
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider className="navbar_brand float-start dn-smd" {...settings}>
      {parteneri.map((val) => (
        <Image
          key={val.id} // Presupunând că `val.id` este unic
          src={val?.logo?.finalUri}
          alt={val?.denumireBrand}
          width={100} // Dimensiuni ajustate pentru o vizualizare mai bună
          height={100}
          objectFit="contain"
          quality={90} // Ajustează calitatea pentru a îmbunătăți claritatea
          className="logo1 img-fluid"
        />
      ))}
    </Slider>
  );
};

export default HeaderLogos;

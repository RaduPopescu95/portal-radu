"use client";

import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";
import {
  calculateDistance,
  generateRandomGradient,
  toUrlSlug,
} from "@/utils/commonUtils";
import { useEffect, useState } from "react";
import { fetchLocation } from "@/app/services/geocoding";
import { handleDiacrtice } from "@/utils/strintText";
import {
  handleQueryDoubleParam,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";
import PropertyItem from "./PropertyItem";

const FeaturedProperties = () => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const [parteneri, setParteneri] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const { latitude, longitude } = position.coords;

        try {
          let res = await fetchLocation(latitude, longitude);
          let localitate = handleDiacrtice(res.results[0].locality);

          let parteneri = await handleQueryDoubleParam(
            "Users",
            "localitate",
            localitate,
            "userType",
            "Partener"
          );

          // Adaugă distanța ca o proprietate pentru fiecare partener
          const parteneriCuDistanta = parteneri.map((partener) => {
            const distanta = calculateDistance(
              latitude,
              longitude,
              partener.coordonate.lat,
              partener.coordonate.lng
            );

            return { ...partener, distanta: Math.floor(distanta) };
          });

          // Sortează partenerii după distanță
          const parteneriOrdonati = parteneriCuDistanta.sort(
            (a, b) => a.distanta - b.distanta
          );

          console.log("parteneri cu distanta...", parteneriOrdonati);

          setParteneri([...parteneriOrdonati]);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      },
      function (error) {
        console.error("Geolocation error: ", error);
      }
    );
  }, []);

  return (
    <>
      <Slider {...settings} arrows={false}>
        {parteneri.map((item) =>
          currentUser ? (
            <Link
              href={`/partener/${item?.id}-${toUrlSlug(item?.denumireBrand)}`}
              key={item?.id}
              passHref
            >
              <PropertyItem item={item} isActive={true} />
            </Link>
          ) : (
            <a
              key={item?.id}
              data-bs-toggle="modal"
              data-bs-target=".bd-utilizator-modal-lg"
            >
              <PropertyItem item={item} isActive={false} />
            </a>
          )
        )}
      </Slider>
    </>
  );
};

export default FeaturedProperties;

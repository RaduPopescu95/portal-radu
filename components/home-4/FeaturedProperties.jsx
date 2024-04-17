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
        {parteneri.map((item) => (
          <Link
            href={`/partener/${item.id}-${toUrlSlug(item.denumireBrand)}`}
            key={item.id}
            passHref
          >
            <div className="item" key={item.id}>
              <div className="feat_property home3">
                <div
                  className="thumb"
                  style={{ backgroundImage: item.gradient?.gradientSelected }}
                >
                  <Image
                    width={343}
                    height={220}
                    className="img-whp w-100 h-100 cover"
                    src={"/assets/clinicaexample.png"}
                    alt="fp1.jpg"
                  />
                  <div className="thmb_cntnt">
                    <div
                      style={{
                        position: "absolute",
                        top: "1px",
                        left: "10px",
                        zIndex: 10,
                      }}
                    >
                      <Image
                        src="/assets/user-profile.png" // Asigură-te că calea este corectă
                        alt="Logo"
                        width={50}
                        height={50}
                        className="logo"
                      />
                    </div>

                    {/* <ul className="icon mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-transfer-1"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-heart"></span>
                      </a>
                    </li>
                  </ul> */}

                    <Link
                      href={`/partener/${item.id}-${toUrlSlug(
                        item.denumireBrand
                      )}`}
                      className="fp_price"
                    >
                      {item.denumireBrand}
                    </Link>
                  </div>
                </div>
                <div className="details">
                  <div className="tc_content">
                    {/* <p className="text-thm">{item.type}</p> */}
                    {/* <h4>
                      <Link href={`/partener/${item.id}`}>3 oferte</Link>
                    </h4> */}
                    <p>
                      <span className="flaticon-placeholder"></span>
                      {item.adresaSediu}
                    </p>
                    <p>{item.distanta} metri</p>

                    {/* <ul className="prop_details mb0">
                    {item.itemDetails.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">
                          {val.name}: {val.number}
                        </a>
                      </li>
                    ))}
                  </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;

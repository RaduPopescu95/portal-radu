"use client";

import Link from "next/link";
import Pagination from "../../common/blog/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import Image from "next/image";
import {
  calculateDistance,
  filtrareParteneri,
  generateRandomGradient,
  toUrlSlug,
} from "@/utils/commonUtils";
import { fetchLocation } from "@/app/services/geocoding";
import { handleDiacrtice } from "@/utils/strintText";
import {
  handleQueryDoubleParam,
  handleQueryFirestore,
  handleQueryPatruParam,
  handleQueryTripleParam,
} from "@/utils/firestoreUtils";
import FeaturedProperty from "./Item";
import { useAuth } from "@/context/AuthContext";

const FeaturedItemHome = ({ params }) => {
  const {
    keyword,
    location,
    status,
    propertyType,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
  } = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  const { currentUser, setSearchQueryPateneri, searchQueryParteneri } =
    useAuth();

  const [parteneri, setParteneri] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("test....de query...", searchQueryParteneri);
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const { latitude, longitude } = position.coords;

        try {
          let res = await fetchLocation(latitude, longitude);
          let localitate = handleDiacrtice(res.results[0].locality);

          let parteneri;
          let parteneriCuDistanta;
          let parteneriOrdonati;

          if (!params && searchQueryParteneri) {
            parteneri = await handleQueryDoubleParam(
              "Users",
              "userType",
              "Partener",
              "statusCont",
              "Activ"
            );
            parteneriOrdonati = parteneri;
          } else {
            parteneri = await handleQueryTripleParam(
              "Users",
              "localitate",
              localitate,
              "userType",
              "Partener",
              "statusCont",
              "Activ"
            );

            // Adaugă distanța ca o proprietate pentru fiecare partener
            parteneriCuDistanta = parteneri.map((partener) => {
              const distanta = calculateDistance(
                latitude,
                longitude,
                partener.coordonate.lat,
                partener.coordonate.lng
              );

              return { ...partener, distanta: Math.floor(distanta) };
            });

            // Sortează partenerii după distanță
            parteneriOrdonati = parteneriCuDistanta.sort(
              (a, b) => a.distanta - b.distanta
            );
          }

          let parteneriFiltrati = [];
          if (params) {
            if (params[0].split("-")[0] === "parteneri") {
              console.log("params contains parteneri....");
              let localitate = params[0]; // presupunem că params[0] este un string
              const parts = localitate.split("-");

              // Decodifică partea pentru a elimina codificările URL (de exemplu, transformă "%20" înapoi în spații)
              let decodedPart = decodeURIComponent(parts[1]);
              // Verifică dacă stringul decodificat conține cuvântul "sector"
              if (decodedPart.includes("sector")) {
                console.log("Partea conține 'sector'", decodedPart);

                let sectorDorit =
                  decodedPart.charAt(0).toUpperCase() + decodedPart.slice(1);
                console.log("Test here sector dorit....", sectorDorit);

                let parteneriFiltrati = await handleQueryTripleParam(
                  "Users",
                  "sector",
                  sectorDorit,
                  "userType",
                  "Partener",
                  "statusCont",
                  "Activ"
                );

                console.log(
                  "Test here parteneriFiltrati....",
                  parteneriFiltrati
                );
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                }

                // Execută codul dorit aici
              } else {
                console.log("Partea nu conține 'sector'");
                let judetDorit =
                  parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                console.log("Test here judet....", judetDorit);

                let parteneriFiltrati = await handleQueryTripleParam(
                  "Users",
                  "judet",
                  judetDorit,
                  "userType",
                  "Partener",
                  "statusCont",
                  "Activ"
                );

                console.log("Test here judet....", parteneriFiltrati);
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                }
              }
            } else {
              console.log("params does not contains parteneri....");
              if (params.length === 1) {
                console.log("params does not contains parteneri length 1....");
                let string = params[0]; // presupunem că params[0] este un string

                let categorieDorita =
                  string.charAt(0).toUpperCase() + string.slice(1);

                let parteneriFiltrati = await handleQueryTripleParam(
                  "Users",
                  "categorie",
                  categorieDorita,
                  "userType",
                  "Partener",
                  "statusCont",
                  "Activ"
                );

                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                }
              } else if (params.length === 2) {
                console.log("params does not contains parteneri length 2....");
                let string = params[0]; // presupunem că params[0] este un string

                let categorieDorita =
                  string.charAt(0).toUpperCase() + string.slice(1);
                let localitate = params[1]; // presupunem că params[0] este un string
                const parts = localitate.split("-");
                let decodedPart = decodeURIComponent(parts[1]);
                console.log("it tests....", decodedPart);
                if (decodedPart.includes("sector")) {
                  let sectorDorit =
                    decodedPart.charAt(0).toUpperCase() + decodedPart.slice(1);
                  console.log("Test here localitate....", categorieDorita);
                  console.log("Test here sector....", sectorDorit);

                  let parteneriFiltrati = await handleQueryPatruParam(
                    "Users",
                    "categorie",
                    categorieDorita,
                    "sector",
                    sectorDorit,
                    "userType",
                    "Partener",
                    "statusCont",
                    "Activ"
                  );

                  console.log("Test here localitate....", parteneriFiltrati);
                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriFiltrati]);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriFiltrati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                  }
                } else {
                  let judetDorit =
                    parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                  console.log("Test here categorie....", categorieDorita);
                  console.log("Test here judet....", judetDorit);

                  let parteneriFiltrati = await handleQueryPatruParam(
                    "Users",
                    "categorie",
                    categorieDorita,
                    "judet",
                    judetDorit,
                    "userType",
                    "Partener",
                    "statusCont",
                    "Activ"
                  );

                  console.log(
                    "Test here parteneriFiltrati....",
                    parteneriFiltrati
                  );

                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriFiltrati]);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriFiltrati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                  }
                }
              } else {
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriOrdonati]);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriOrdonati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                }
              }
            }
          } else {
            if (!searchQueryParteneri) {
              setParteneri([...parteneriOrdonati]);
            } else {
              const rezultatFiltrare = filtrareParteneri(
                parteneriOrdonati,
                searchQueryParteneri
              );
              setParteneri([...rezultatFiltrare]);
            }
          }
          console.log("parteneri cu distanta...", parteneriOrdonati);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      },
      function (error) {
        console.error("Geolocation error: ", error);
      }
    );
  }, []);

  // Funcție pentru schimbarea paginilor
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // keyword filter
  const keywordHandler = (item) =>
    item?.title.toLowerCase().includes(keyword?.toLowerCase());

  // location handler
  const locationHandler = (item) => {
    return item?.location.toLowerCase().includes(location.toLowerCase());
  };

  // status handler
  const statusHandler = (item) =>
    item?.type.toLowerCase().includes(status.toLowerCase());

  // properties handler
  const propertiesHandler = (item) =>
    item?.type.toLowerCase().includes(propertyType.toLowerCase());

  // price handler
  const priceHandler = (item) =>
    item?.price < price?.max && item?.price > price?.min;

  // bathroom handler
  const bathroomHandler = (item) => {
    if (bathrooms !== "") {
      return item?.itemDetails[1].number == bathrooms;
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item) => {
    if (bedrooms !== "") {
      return item?.itemDetails[0].number == bedrooms;
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item) =>
    garages !== ""
      ? item?.garages?.toLowerCase().includes(garages.toLowerCase())
      : true;

  // built years handler
  const builtYearsHandler = (item) =>
    yearBuilt !== "" ? item?.built == yearBuilt : true;

  // area handler
  const areaHandler = (item) => {
    if (area.min !== 0 && area.max !== 0) {
      if (area.min !== "" && area.max !== "") {
        return (
          parseInt(item?.itemDetails[2].number) > area.min &&
          parseInt(item?.itemDetails[2].number) < area.max
        );
      }
    }
    return true;
  };

  // advanced option handler
  const advanceHandler = (item) => {
    if (amenities.length !== 0) {
      return amenities.find((item2) =>
        item2.toLowerCase().includes(item?.amenities.toLowerCase())
      );
    }
    return true;
  };

  // status filter
  const statusTypeHandler = (a, b) => {
    if (statusType === "recent") {
      return a.created_at + b.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    } else if (statusType === "") {
      return a.created_at + b.created_at;
    }
  };

  // featured handler
  const featuredHandler = (item) => {
    if (featured !== "") {
      return item?.featured === featured;
    }
    return true;
  };

  const paginatedParteneri = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return parteneri.slice(startIndex, endIndex);
  };

  // status handler
  let content = paginatedParteneri()
    .slice(0, 10)
    .map((item) => (
      <div
        className={`${
          isGridOrList ? "col-12 feature-list" : "col-md-4 col-lg-4"
        } `}
        key={item?.id}
      >
        {currentUser ? (
          <Link
            href={`/partener/${item?.id}-${toUrlSlug(item?.denumireBrand)}`}
            key={item?.id}
            passHref
          >
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </Link>
        ) : (
          <a
            key={item?.id}
            data-bs-toggle="modal"
            data-bs-target=".bd-utilizator-modal-lg"
          >
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </a>
        )}
      </div>
    ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, content]);

  return (
    <>
      {content}

      {/* <div className="row">
        <div className="col-lg-12 mt20">
          <div className="mbp_pagination">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={parteneri.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div> */}
      {/* End .row */}
    </>
  );
};

export default FeaturedItemHome;

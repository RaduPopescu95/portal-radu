"use client";

import Link from "next/link";
import Pagination from "../../common/blog/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLength,
  lengthLoad,
} from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import Image from "next/image";
import {
  calculateDistance,
  calculeazaSiOrdoneazaParteneriDupaDistanta,
  filtrareParteneri,
  generateRandomGradient,
  toUrlSlug,
} from "@/utils/commonUtils";
import { fetchLocation } from "@/app/services/geocoding";
import { handleDiacrtice } from "@/utils/strintText";
import {
  handleGetFirestore,
  handleQueryDoubleParam,
  handleQueryFirestore,
  handleQueryPatruParam,
  handleQueryTripleParam,
} from "@/utils/firestoreUtils";
import FeaturedProperty from "./Item";
import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { useSearchParams } from "next/navigation";

const FeaturedItem = ({ params }) => {
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  const {
    currentUser,
    userData,
    localitate,
    setLocalitate,
    judet,
    setJudet,
    categorie,
    setCategorie,
  } = useAuth();

  const [parteneri, setParteneri] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const handleFilteringItems = (categorie, judet, localitate) => {
    setCategorie(categorie);
    setJudet(judet);
    setLocalitate(localitate);
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const { latitude, longitude } = position.coords;

        try {
          let searchQueryParteneri = searchParams.get("searchQueryParteneri");
          console.log("test....de query...", searchQueryParteneri);
          let localitate;
          let res = await fetchLocation(latitude, longitude);
          if (res && res.results && res.results.length > 0) {
            // Caută primul element cu proprietatea 'locality' definită
            const firstLocality = res.results.find(
              (result) => result.locality !== undefined
            );

            if (firstLocality && firstLocality.locality) {
              localitate = handleDiacrtice(firstLocality.locality);
            } else {
              console.error("Localitate missing in all results:", res);
            }
          } else {
            console.error("Invalid response or results missing:", res);
          }

          let parteneriCuDistanta;
          let parteneriOrdonati;

          if (!params && searchQueryParteneri) {
            // parteneri = await handleQueryDoubleParam(
            //   "Users",
            //   "userType",
            //   "Partener",
            //   "statusCont",
            //   "Activ"
            // );
            handleFilteringItems("", "", "");
            let parteneri = await handleGetFirestore("Users");
            parteneri = parteneri.filter((partener) => {
              return (
                partener.userType === "Partener" &&
                partener.statusCont === "Activ"
              );
            });

            parteneriOrdonati = calculeazaSiOrdoneazaParteneriDupaDistanta(
              parteneri,
              latitude,
              longitude
            );
          } else {
            // parteneri = await handleQueryTripleParam(
            //   "Users",
            //   "localitate",
            //   localitate,
            //   "userType",
            //   "Partener",
            //   "statusCont",
            //   "Activ"
            // );
            handleFilteringItems("", "", "");
            let parteneri = await handleGetFirestore("Users");
            // Filtrare inițială după localitate, userType și statusCont, inclusiv verificarea punctelor de lucru
            let parts = parteneri.filter((partener) => {
              const inLocalitate = partener.localitate === localitate;
              const inPunctDeLucru = partener.puncteDeLucru?.some(
                (punct) => punct.localitate === localitate
              );

              return (
                (inLocalitate || inPunctDeLucru) &&
                partener.userType === "Partener" &&
                partener.statusCont === "Activ"
              );
            });

            // După filtrare, înlocuiește proprietățile partenerului cu cele ale punctului de lucru, dacă este cazul
            parteneri = parts.map((partener) => {
              const punctDeLucruApropiat = partener.puncteDeLucru?.find(
                (punct) => punct.localitate === localitate
              );

              if (punctDeLucruApropiat) {
                partener.coordonate = punctDeLucruApropiat.coordonate;
                partener.adresaSediu = punctDeLucruApropiat.adresa;
                partener.localitate = punctDeLucruApropiat.localitate;
                partener.judet = punctDeLucruApropiat.judet;
                partener.googleMapsLink = punctDeLucruApropiat.googleMapsLink;
              }

              return partener;
            });

            // Exemplu de utilizare a funcției calculeazaSiOrdoneazaParteneriDupaDistanta
            parteneriOrdonati = calculeazaSiOrdoneazaParteneriDupaDistanta(
              parteneri,
              latitude,
              longitude
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

                // let parteneriFiltrati = await handleQueryTripleParam(
                //   "Users",
                //   "sector",
                //   sectorDorit,
                //   "userType",
                //   "Partener",
                //   "statusCont",
                //   "Activ"
                // );
                handleFilteringItems("", "Bucuresti", sectorDorit);
                let parteneri = await handleGetFirestore("Users");
                let parteneriFiltrati = parteneri.filter((partener) => {
                  const inLocalitate = partener.sector === sectorDorit;
                  const inPunctDeLucru = partener.puncteDeLucru?.some(
                    (punct) => punct.sector === sectorDorit
                  );

                  return (
                    (inLocalitate || inPunctDeLucru) &&
                    partener.userType === "Partener" &&
                    partener.statusCont === "Activ"
                  );
                });
                console.log(
                  "Test here parteneriOrdonati la gasire sector....",
                  parteneri
                );
                console.log(
                  "Test here parteneriOrdonati la gasire sector....",
                  parteneriFiltrati
                );
                // După filtrare, înlocuiește proprietățile partenerului cu cele ale punctului de lucru, dacă este cazul
                parteneriFiltrati = parteneriFiltrati.map((partener) => {
                  const punctDeLucruApropiat = partener.puncteDeLucru?.find(
                    (punct) => punct.sector === sectorDorit
                  );

                  if (punctDeLucruApropiat) {
                    partener.coordonate = punctDeLucruApropiat.coordonate;
                    partener.adresaSediu = punctDeLucruApropiat.adresa;
                    partener.localitate = punctDeLucruApropiat.localitate;
                    partener.judet = punctDeLucruApropiat.judet;
                    partener.googleMapsLink =
                      punctDeLucruApropiat.googleMapsLink;
                    partener.sector = punctDeLucruApropiat.sector;
                  }

                  return partener;
                });

                parteneriOrdonati = calculeazaSiOrdoneazaParteneriDupaDistanta(
                  parteneriFiltrati,
                  latitude,
                  longitude
                );

                if (!searchQueryParteneri) {
                  setParteneri([...parteneriOrdonati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriOrdonati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
                }

                // Execută codul dorit aici
              } else {
                console.log("Partea nu conține 'sector'");
                let judetDorit =
                  parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                console.log("Test here judet....", judetDorit);

                // let parteneriFiltrati = await handleQueryTripleParam(
                //   "Users",
                //   "judet",
                //   judetDorit,
                //   "userType",
                //   "Partener",
                //   "statusCont",
                //   "Activ"
                // );
                handleFilteringItems("", judetDorit, "");
                let parteneri = await handleGetFirestore("Users");
                // Filtrare inițială după sector, userType și statusCont, inclusiv verificarea punctelor de lucru
                let parteneriFiltrati = parteneri.filter((partener) => {
                  const inJudet = partener.judet === judetDorit;
                  const inPunctDeLucru = partener.puncteDeLucru?.some(
                    (punct) => punct.judet === judetDorit
                  );

                  return (
                    (inJudet || inPunctDeLucru) &&
                    partener.userType === "Partener" &&
                    partener.statusCont === "Activ"
                  );
                });

                // După filtrare, înlocuiește proprietățile partenerului cu cele ale punctului de lucru, dacă este cazul
                parteneriFiltrati = parteneriFiltrati.map((partener) => {
                  const punctDeLucruApropiat = partener.puncteDeLucru?.find(
                    (punct) => punct.judet === judetDorit
                  );

                  if (punctDeLucruApropiat) {
                    partener.coordonate = punctDeLucruApropiat.coordonate;
                    partener.adresaSediu = punctDeLucruApropiat.adresa;
                    partener.localitate = punctDeLucruApropiat.localitate;
                    partener.judet = punctDeLucruApropiat.judet;
                    partener.googleMapsLink =
                      punctDeLucruApropiat.googleMapsLink;
                  }

                  return partener;
                });

                parteneriOrdonati = calculeazaSiOrdoneazaParteneriDupaDistanta(
                  parteneriFiltrati,
                  latitude,
                  longitude
                );

                console.log("Test here judet....", parteneriOrdonati);
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriOrdonati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriOrdonati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
                }
              }
            } else {
              console.log("params does not contains parteneri....");
              if (params.length === 1) {
                console.log("params does not contains parteneri length 1....");
                let string = params[0]; // presupunem că params[0] este un string

                let categorieDorita =
                  string.charAt(0).toUpperCase() + string.slice(1);

                // let parteneriFiltrati = await handleQueryTripleParam(
                //   "Users",
                //   "categorie",
                //   categorieDorita,
                //   "userType",
                //   "Partener",
                //   "statusCont",
                //   "Activ"
                // );
                handleFilteringItems(categorieDorita, "", "");
                let parteneri = await handleGetFirestore("Users");
                let parteneriFiltrati = parteneri.filter((partener) => {
                  return (
                    partener.categorie === categorieDorita &&
                    partener.userType === "Partener" &&
                    partener.statusCont === "Activ"
                  );
                });

                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
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
                  console.log("Test here categorieDorita....", categorieDorita);
                  console.log("Test here sector....", sectorDorit);

                  // let parteneriFiltrati = await handleQueryPatruParam(
                  //   "Users",
                  //   "categorie",
                  //   categorieDorita,
                  //   "sector",
                  //   sectorDorit,
                  //   "userType",
                  //   "Partener",
                  //   "statusCont",
                  //   "Activ"
                  // );
                  handleFilteringItems(
                    categorieDorita,
                    "Bucuresti",
                    sectorDorit
                  );
                  let parteneri = await handleGetFirestore("Users");
                  let parteneriFiltrati = parteneri.filter((partener) => {
                    const inLocalitate = partener.sector === sectorDorit;
                    const inPunctDeLucru = partener.puncteDeLucru?.some(
                      (punct) => punct.sector === sectorDorit
                    );

                    return (
                      (inLocalitate || inPunctDeLucru) &&
                      partener.userType === "Partener" &&
                      partener.statusCont === "Activ" &&
                      partener.categorie === categorieDorita
                    );
                  });

                  // După filtrare, înlocuiește proprietățile partenerului cu cele ale punctului de lucru, dacă este cazul
                  parteneriFiltrati = parteneriFiltrati.map((partener) => {
                    const punctDeLucruApropiat = partener.puncteDeLucru?.find(
                      (punct) => punct.sector === sectorDorit
                    );

                    if (punctDeLucruApropiat) {
                      partener.coordonate = punctDeLucruApropiat.coordonate;
                      partener.adresaSediu = punctDeLucruApropiat.adresa;
                      partener.localitate = punctDeLucruApropiat.localitate;
                      partener.judet = punctDeLucruApropiat.judet;
                      partener.googleMapsLink =
                        punctDeLucruApropiat.googleMapsLink;
                      partener.sector = punctDeLucruApropiat.sector;
                    }

                    return partener;
                  });

                  parteneriOrdonati =
                    calculeazaSiOrdoneazaParteneriDupaDistanta(
                      parteneriFiltrati,
                      latitude,
                      longitude
                    );

                  console.log(
                    "Test here parteneriOrdonati....cautare categorie si sector",
                    parteneriOrdonati
                  );
                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriOrdonati]);
                    setIsLoading(false);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriOrdonati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                    setIsLoading(false);
                  }
                } else {
                  let judetDorit =
                    parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                  console.log("Test here categorie....", categorieDorita);
                  console.log("Test here judet....", judetDorit);

                  // let parteneriFiltrati = await handleQueryPatruParam(
                  //   "Users",
                  //   "categorie",
                  //   categorieDorita,
                  //   "judet",
                  //   judetDorit,
                  //   "userType",
                  //   "Partener",
                  //   "statusCont",
                  //   "Activ"
                  // );
                  handleFilteringItems(categorieDorita, "Bucuresti", "");

                  let parteneri = await handleGetFirestore("Users");
                  let parteneriFiltrati = parteneri.filter((partener) => {
                    const inJudet = partener.judet === judetDorit;
                    const inPunctDeLucru = partener.puncteDeLucru?.some(
                      (punct) => punct.judet === judetDorit
                    );

                    return (
                      (inJudet || inPunctDeLucru) &&
                      partener.userType === "Partener" &&
                      partener.statusCont === "Activ" &&
                      partener.categorie === categorieDorita
                    );
                  });

                  // După filtrare, înlocuiește proprietățile partenerului cu cele ale punctului de lucru, dacă este cazul
                  parteneriFiltrati = parteneriFiltrati.map((partener) => {
                    const punctDeLucruApropiat = partener.puncteDeLucru?.find(
                      (punct) => punct.judet === judetDorit
                    );

                    if (punctDeLucruApropiat) {
                      partener.coordonate = punctDeLucruApropiat.coordonate;
                      partener.adresaSediu = punctDeLucruApropiat.adresa;
                      partener.localitate = punctDeLucruApropiat.localitate;
                      partener.judet = punctDeLucruApropiat.judet;
                      partener.googleMapsLink =
                        punctDeLucruApropiat.googleMapsLink;
                    }

                    return partener;
                  });

                  parteneriOrdonati =
                    calculeazaSiOrdoneazaParteneriDupaDistanta(
                      parteneriFiltrati,
                      latitude,
                      longitude
                    );

                  console.log(
                    "Test here parteneriOrdonati....",
                    parteneriOrdonati
                  );

                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriOrdonati]);
                    setIsLoading(false);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriOrdonati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                    setIsLoading(false);
                  }
                }
              } else {
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriOrdonati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriOrdonati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
                }
              }
            }
          } else {
            if (!searchQueryParteneri) {
              setParteneri([...parteneriOrdonati]);
              setIsLoading(false);
            } else {
              const rezultatFiltrare = filtrareParteneri(
                parteneriOrdonati,
                searchQueryParteneri
              );
              setParteneri([...rezultatFiltrare]);
              setIsLoading(false);
            }
          }
          console.log("parteneri cu distanta...", parteneriOrdonati);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      },
      //DACA EXISTA EROARE LA GEOLOCATIE, CUM AR FI PERMISSION DENIED
      async function (error) {
        console.error("Geolocation error: ", error);
        // ....
        try {
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
                handleFilteringItems("", "Bucuresti", sectorDorit);

                console.log(
                  "Test here parteneriFiltrati....",
                  parteneriFiltrati
                );
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
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
                handleFilteringItems("", judetDorit, "");

                console.log("Test here judet....", parteneriFiltrati);
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
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
                handleFilteringItems(categorieDorita, "", "");

                if (!searchQueryParteneri) {
                  setParteneri([...parteneriFiltrati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriFiltrati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
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
                  handleFilteringItems(
                    categorieDorita,
                    "Bucuresti",
                    sectorDorit
                  );
                  console.log("Test here localitate....", parteneriFiltrati);
                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriFiltrati]);
                    setIsLoading(false);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriFiltrati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                    setIsLoading(false);
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
                  handleFilteringItems(categorieDorita, judetDorit, "");
                  console.log(
                    "Test here parteneriFiltrati....",
                    parteneriFiltrati
                  );

                  if (!searchQueryParteneri) {
                    setParteneri([...parteneriFiltrati]);
                    setIsLoading(false);
                  } else {
                    const rezultatFiltrare = filtrareParteneri(
                      parteneriFiltrati,
                      searchQueryParteneri
                    );
                    setParteneri([...rezultatFiltrare]);
                    setIsLoading(false);
                  }
                }
              } else {
                if (!searchQueryParteneri) {
                  setParteneri([...parteneriOrdonati]);
                  setIsLoading(false);
                } else {
                  const rezultatFiltrare = filtrareParteneri(
                    parteneriOrdonati,
                    searchQueryParteneri
                  );
                  setParteneri([...rezultatFiltrare]);
                  setIsLoading(false);
                }
              }
            }
          } else {
            if (!searchQueryParteneri) {
              setParteneri([...parteneriOrdonati]);
              setIsLoading(false);
            } else {
              const rezultatFiltrare = filtrareParteneri(
                parteneriOrdonati,
                searchQueryParteneri
              );
              setParteneri([...rezultatFiltrare]);
              setIsLoading(false);
            }
          }
          console.log("parteneri cu distanta...", parteneriOrdonati);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
        // ....
      }
    );
  }, [searchParams]);

  // Funcție pentru schimbarea paginilor
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedParteneri = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return parteneri.slice(startIndex, endIndex);
  };

  // status handler
  let content = paginatedParteneri().map((item) => (
    <div
      className={`${
        isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
      } `}
      key={item?.user_uid}
    >
      {currentUser ? (
        userData?.userType === "Partener" &&
        userData?.user_uid !== item?.user_uid ? (
          <a key={item?.user_uid}>
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </a>
        ) : (
          <Link
            href={`/partener/${item?.user_uid}-${toUrlSlug(
              item?.denumireBrand
            )}?localitate=${item?.localitate}`}
            key={item?.user_uid}
            passHref
          >
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </Link>
        )
      ) : (
        <a
          key={item?.user_uid}
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
    dispatch(lengthLoad(isLoading));
  }, [dispatch, content]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {content}

      <div className="row">
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
        {/* End paginaion .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default FeaturedItem;

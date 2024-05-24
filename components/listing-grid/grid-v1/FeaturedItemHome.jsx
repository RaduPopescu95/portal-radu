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
import SkeletonLoader from "@/components/common/SkeletonLoader";

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
  const [isLoading, setIsLoading] = useState(true);
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
          // let maxQuery = 10; NU AI CUM SA FACI SORTARE DUPA DISTANTA DIN SERVER DACA DISTANTA ESTE CALCULATA PE CLIENT
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

          setParteneri(parteneriOrdonati);
          setIsLoading(false);
          let parteneriFiltrati = [];

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
      {isLoading ? <SkeletonLoader /> : content}

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

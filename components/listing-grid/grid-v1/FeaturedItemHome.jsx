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

  async function fetchLocationAndUpdatePartners(latitude, longitude) {
    try {
        let res = await fetchLocation(latitude, longitude);
        if (res && res.results && res.results.length > 0 && res.results[0].locality) {
            const localitate = handleDiacrtice(res.results[0].locality);
            updatePartnersByLocation(localitate, latitude, longitude);
        } else {
            console.error('Invalid response or locality missing:', res);
        }
    } catch (error) {
        setIsLoading(false);
        console.error("Error fetching location data: ", error);
    }
}

async function updatePartnersByLocation(localitate, latitude, longitude) {
    let parteneri = await handleQueryTripleParam(
        "Users",
        "localitate",
        localitate,
        "userType",
        "Partener",
        "statusCont",
        "Activ"
    );

    let parteneriCuDistanta = parteneri.map((partener) => {
        const distanta = calculateDistance(latitude, longitude, partener.coordonate.lat, partener.coordonate.lng);
        return { ...partener, distanta: Math.floor(distanta) };
    });

    let parteneriOrdonati = parteneriCuDistanta.sort((a, b) => a.distanta - b.distanta);

    setParteneri(parteneriOrdonati);
    setIsLoading(false);
}

useEffect(() => {
  function handleGeoSuccess(position) {
      const { latitude, longitude } = position.coords;
      fetchLocationAndUpdatePartners(latitude, longitude);
  }

  function handleGeoError() {
      console.error("Geolocation error: User denied location access......");
      setIsLoading(false);
      // Oferă utilizatorului posibilitatea de a introduce manual locația
      // sau de a continua fără funcționalități bazate pe localizare
  }

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
  }
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

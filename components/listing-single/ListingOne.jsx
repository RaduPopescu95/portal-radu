"use client";

import Image from "next/image";

export default function ListingOne({ partener }) {
  // Calculate columns based on the number of images, with a maximum of 4 columns
  const calcColumns = (count) => {
    if (count === 1) return 6; // Folosește o coloană mai mică pentru o singură imagine
    if (count > 4) return 3; // Folosește 4 coloane dacă sunt mai mult de 4 imagini
    return 12 / count; // Altfel, distribuie imaginile uniform
  };

  return (
    <section className="listing-title-area mt85 md-mt0">
      <div className="container">
        <div className="row mb30">
          <div className="col-lg-7 col-xl-8">
            <div className="single_property_title mt30-767">
              <h2>{partener?.denumireBrand}</h2>
              <p>{partener?.adresaSediu}</p>
            </div>
          </div>
          <div className="col-lg-5 col-xl-4">
            {/* Placeholder for social share buttons */}
          </div>
        </div>
        <div className="row">
          {partener?.images?.imgs.map((val, i) => (
            <div
              key={i}
              className={`col-lg-${calcColumns(
                partener.images.imgs.length
              )} col-md-4 col-sm-6 mb-4`}
              style={{
                maxWidth: partener.images.imgs.length === 1 ? "50%" : "100%", // Limitați lățimea containerului la 50% pentru o singură imagine
                margin: "auto", // Centrează containerul când este mai mic
              }}
            >
              <Image
                width={752}
                height={450}
                src={val.finalUri}
                alt={`Property Image ${i + 1}`}
                layout="responsive"
                objectFit="cover"
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

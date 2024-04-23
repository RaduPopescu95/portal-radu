import { toUrlSlug } from "@/utils/commonUtils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PropertyItem = ({ item, isActive }) => {
  return (
    <div className="item" key={item?.id}>
      <div className="feat_property home3">
        <div
          className="thumb"
          style={{ backgroundImage: item?.gradient?.gradientSelected }}
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
              href={`/partener/${item?.id}-${toUrlSlug(item?.denumireBrand)}`}
              className="fp_price"
            >
              {item?.denumireBrand}
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            {/* <p className="text-thm">{item?.type}</p> */}
            {/* <h4>
            <Link href={`/partener/${item?.id}`}>3 oferte</Link>
          </h4> */}
            <p>
              <span className="flaticon-placeholder"></span>
              {item?.adresaSediu}
            </p>
            <p>{item?.distanta} metri</p>

            {/* <ul className="prop_details mb0">
          {item?.itemDetails.map((val, i) => (
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
  );
};

export default PropertyItem;

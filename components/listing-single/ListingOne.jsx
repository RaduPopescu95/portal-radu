"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import Slider from "react-slick";

export default function ListingOne({ partener }) {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
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
          slidesToScroll: 1,
        },
      },
    ],
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
            <div className="single_property_social_share position-static transform-none">
              {/* <div className="price float-start fn-400">
                <h2>
                  ${property?.price}
                  <small>/mo</small>
                </h2>
              </div> */}

              {/* <div className="spss style2 mt20 text-end tal-400">
                <ul className="mb0">
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
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-share"></span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-printer"></span>
                    </a>
                  </li>
                </ul>
              </div> */}
              {/* End activity and social sharing */}
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="row">
          <div className="col-lg-12">
            {/* <Slider {...settings}>
              {property?.imgList?.map((val, i) => (
                <div key={i} className="slick-slide-padding">
                  <Image
                    width={752}
                    height={450}
                    className="img-fluid w100"
                    src={property.img}
                    alt={`Property Image ${i + 1}`}
                  />
                </div>
              ))}
            </Slider> */}
          </div>
        </div>
        {/* End .row */}
      </div>
    </section>
  );
}

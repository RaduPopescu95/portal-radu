"use client";

import { useState } from "react";

import Image from "next/image";

const LogoUpload = ({
  singleImage,
  deleteLogo,
  logoImg,
  isVerifica,
  isNewImage,
  text,
  isAdmin,
}) => {
  const handleDownloadImage = (imageUrl) => {
    const a = document.createElement("a");
    a.href = imageUrl;

    // Setează numele fișierului cu extensia .jpeg
    a.download = "downloaded-image.jpeg"; // Schimbă extensia dacă este necesar (de exemplu, .png, .jpg etc.)

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {logoImg.length > 0
            ? logoImg?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    {!isNewImage ? (
                      <Image
                        width={300}
                        height={300}
                        className="img-fluid cover"
                        src={item.finalUri}
                        alt="fp1.jpg"
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        className="img-fluid cover"
                        src={URL.createObjectURL(item)}
                        alt="fp1.jpg"
                      />
                    )}
                    {isVerifica ? null : (
                      <div
                        className="edu_stats_list"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                        data-original-title="Delete"
                      >
                        <a onClick={() => deleteLogo()}>
                          <span className="flaticon-garbage"></span>
                        </a>
                      </div>
                    )}
                    {!isAdmin ? null : (
                      <div
                        className="edu_stats_download mr-10"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                        data-original-title="Delete"
                      >
                        <a
                          onClick={() =>
                            handleDownloadImage(logoImg[0].finalUri)
                          }
                        >
                          <span className="flaticon-download"></span>
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))
            : undefined}

          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      {logoImg.length === 0 && (
        <div className="col-lg-12">
          <div className="portfolio_upload">
            <input
              type="file"
              onChange={singleImage}
              multiple
              accept="image/png, image/gif, image/jpeg"
            />
            <div className="icon">
              <span className="flaticon-download"></span>
            </div>
            <p>{text}</p>
          </div>
        </div>
      )}
      {/* End .col */}
    </div>
  );
};

export default LogoUpload;

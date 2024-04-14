import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateRandomGradient } from "@/utils/commonUtils";
import properties from "@/data/properties";
import carduriFidelitate from "@/data/carduriFidelitate";

const predefinedGradients = [
  "linear-gradient(135deg, #647DEE, #7F53AC)", // Albastru la Mov
  "linear-gradient(135deg, #605C3C, #3E5151)", // Gri-verde la Albastru petrol
  "linear-gradient(135deg, #9FA8DA, #7986CB)", // Albastru deschis la Albastru moderat
  "linear-gradient(135deg, #6A1B9A, #8E24AA)", // Violet închis la Violet
  "linear-gradient(135deg, #6200EA, #311B92)", // Violet electric la Violet închis
  "linear-gradient(135deg, #536DFE, #3D5AFE)", // Albastru electric la Albastru intens
  "linear-gradient(135deg, #8C9EFF, #536DFE)", // Albastru pal la Albastru electric
  "linear-gradient(135deg, #B39DDB, #9575CD)", // Mov pal la Mov
  "linear-gradient(135deg, #9575CD, #7E57C2)", // Mov la Violet închis
  "linear-gradient(135deg, #673AB7, #5E35B1)", // Violet profund la Violet închis
  "linear-gradient(135deg, #7C4DFF, #651FFF)", // Violet electric la Violet profund
  "linear-gradient(135deg, #7E57C2, #673AB7)", // Violet la Violet profund
  "linear-gradient(135deg, #5C6BC0, #3F51B5)", // Albastru gri la Albastru închis
  "linear-gradient(135deg, #7986CB, #5C6BC0)", // Albastru mediu la Albastru gri
  "linear-gradient(135deg, #8E24AA, #7B1FA2)", // Violet la Violet închis
  "linear-gradient(135deg, #AB47BC, #8E24AA)", // Violet pal la Violet
];

const GradientSelect = ({
  selectedId,
  setSelectedId,
  gradientSelected,
  setSelectedGradient,
}) => {
  const [pops, setProperties] = useState([]); // Stocăm proprietățile cu gradientul generat

  useEffect(() => {
    // Adaugă un gradient fiecărei proprietăți la încărcarea componentei
    const propertiesWithGradient = carduriFidelitate
      .slice(0, 12)
      .map((item, index) => ({
        ...item,
        gradient: predefinedGradients[index % predefinedGradients.length],
      }));
    setProperties(propertiesWithGradient);
  }, []); // Dependența goală indică faptul că efectul se rulează o singură dată la montarea componentei

  const toggleSelect = (id, gradient) => {
    setSelectedId((prevSelectedId) => {
      if (prevSelectedId === id) {
        setSelectedGradient(""); // Resetare gradient când deselectăm
        return null; // Deselectează dacă este același ID
      } else {
        setSelectedGradient(gradient); // Setare gradient nou
        return id; // Selectează noul ID
      }
    });
  };
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
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

  return (
    <>
      <Slider {...settings} arrows={false}>
        {pops.map((item) => (
          <div
            className="item"
            key={item.id}
            onClick={() => toggleSelect(item.id, item.gradient)}
            style={{ cursor: "pointer" }}
          >
            <div className="feat_property home3">
              <div
                className="thumb"
                style={{
                  backgroundImage: item.gradient, // Folosește gradientul stocat
                  width: "95%",
                  height: "220px",
                  backgroundSize: "cover",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  borderRadius: "15px",
                  borderColor: "#E0E0E0",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {selectedId === item.id && (
                  <span
                    className="flaticon-tick"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      color: "white",
                      fontSize: "24px",
                    }}
                  />
                )}
                <Image
                  width={300}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.img}
                  alt="properties identity"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default GradientSelect;

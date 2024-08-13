import Image from "next/image";
import PopupVideo from "../common/PopupVideo";

const OurMission = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Vizitatori zilnic",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "1,000",
      meta: "Parteneri înregistrați",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "100,000 RON",
      meta: "În discount",
    },
  ];

  return (
    <>
      <div className="col-lg-12 col-xl-12">
        <div className="about_content">
          <p className="large">
            Suntem o echipă de IT ce s-a remarcat prin compania Credite
            Medicale, respectiv site-ul www.creditemedicale.ro, ajungând astfel
            să ne clasăm printre primii 3 din țară în categoria activităților
            desfășurate pentru cadrele medicale de pretutindeni. Fiindcă ne
            desfășurăm activitatea în acest domeniu, știm și înțelegem foarte
            bine dificultatea pe care o reprezintă timpul pentru cadrele
            medicale, iar astfel ne dorim să sărim în ajutorul lor. Punem la
            dispoziție o platformă adresată exclusiv lor prin care pot găsi ușor
            oferte, discount-uri, beneficii în diferite locații aflate în
            împrejurimea lor.
          </p>
          <p>
            ExclusivMD.ro este un portal dedicat exclusiv cadrelor medicale,
            creat pentru a aduce în atenția acestora cele mai bune oferte de la
            parteneri economici din diverse domenii. Scopul nostru este de a
            economisi timp și de a oferi soluții eficiente, menite să sprijine
            activitatea zilnică a medicilor.
          </p>
          <p>
            Pentru a adăuga anunțuri pe site-ul nostru, este necesar să vă
            creați un cont. Înscrierea ca membru constă în completarea unui
            formular cu informații minime despre dumneavoastră. Aceasta este o
            măsură necesară pentru a ne asigura că serviciile noastre sunt
            adresate exclusiv cadrelor medicale și pentru a menține standarde
            ridicate de calitate și siguranță.
          </p>
          <p>
            Prin intermediul ExclusivMD.ro, medicii pot accesa rapid și eficient
            cele mai bune oferte disponibile, economisind timp prețios și
            beneficiind de soluții care să le sprijine activitatea profesională.
          </p>
          {/* 
          <ul className="ab_counting">
            {missionContent.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <div className="about_counting">
                  <div className="icon">
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className="details">
                    <h3>{item.number}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul> */}
          {/* End .ab_counting */}
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-5">
        <div className="about_thumb">
          <Image
            width={461}
            height={509}
            priority
            className="img-fluid w100 cover"
            src="/assets/images/about/1.jpg"
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div> */}
    </>
  );
};

export default OurMission;

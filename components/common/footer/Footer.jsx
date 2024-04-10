import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";

const Footer = () => {
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <h4>Denumire portal</h4>
          <p>
            Paragraf care explic scurt destinatia portalului. Paragraf care explic scurt destinatia portalului. Paragraf care explic scurt destinatia portalului
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Companie</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/despre-noi">Despre noi</Link>
            </li>
            <li>
              <Link href="/terms">Termeni si conditii</Link>
            </li>
            {/* <li>
              <Link href="/faq">User’s Guide</Link>
            </li> */}
            {/* <li>
              <Link href="/cum-functioneaza">Cum functioneaza</Link>
            </li> */}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Contactează-ne</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:info@email.com">info@numeportal.com</a>
            </li>
            <li>
              <a href="#">Bucurest, str. Cernauti, nr.1A</a>
            </li>
            <li>
              <a href="tel:+079999999">079999999</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Urmărește-ne</h4>
          <ul className="mb30">
            <Social />
          </ul>
          {/* <h4>Subscribe</h4>
          <SubscribeForm /> */}
        </div>
      </div>
    </>
  );
};

export default Footer;

import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import CreateList from "@/components/dashboard/verificare-tranzactie/CreateList";
import DetailedInfo from "@/components/dashboard/creaza-oferta/DetailedInfo";
import FloorPlans from "@/components/dashboard/creaza-oferta/FloorPlans";
import LocationField from "@/components/dashboard/creaza-oferta/LocationField";
import PropertyMediaUploader from "@/components/dashboard/creaza-oferta/PropertyMediaUploader";
import {
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import { authentication } from "@/firebase";
import { verifyCurrentUser } from "@/utils/commonUtils";
import Form from "@/components/autentificare-partener/Form";
import TransactionVerification from "@/components/dashboard/verificare-tranzactie/TransactionVerification";

const index = async ({ params }) => {
  const id = params.id;
  const parts = id.split("-");
  const userId = parseFloat(parts[0]);
  const cod = parts[1];
  const codParts = cod.split("UIDD");
  const offerId = codParts[0];
  const partenerId = codParts[1];

  let utilizator = await handleQueryFirestore("Users", "id", userId);
  let oferta = await handleQueryFirestoreSubcollection(
    "Oferte",
    "documentId",
    offerId
  );

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu partenerId={partenerId} />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Navigatie cont
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <TransactionVerification
                  oferta={oferta}
                  utilizator={utilizator}
                  partenerId={partenerId}
                />
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;

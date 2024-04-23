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

const index = async ({ params }) => {
  const id = params.id;
  const parts = id.split("-");
  const userId = parseFloat(parts[0]);
  const offerId = parts[1];

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
          <SidebarMenu />
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

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Verificare tranzactie</h2>
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <CreateList
                        oferta={oferta[0]}
                        utilizator={utilizator[0]}
                      />
                    </div>
                  </div>
                  {/* <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>

                      <LocationField />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Detailed Information</h3>
                    </div>
                    <DetailedInfo />
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property media</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Floor Plans</h3>
                      <button className="btn admore_btn mb30">Add More</button>
                    </div>
                    <FloorPlans />
                  </div> */}
                </div>
                {/* End .col */}
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

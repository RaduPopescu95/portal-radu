"use client";

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { handleGetFirestore } from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";

import { db } from "@/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useCollectionPagination } from "@/hooks/useCollectionPagination";

const index = () => {
  const { currentUser } = useAuth();

  const collectionPath = `Users/${currentUser?.uid}/Oferte`; // Replace with your actual path
  const pageSize = 6; // Set the desired number of items per page

  // Initialize the pagination hook
  const {
    items: posts,
    currentPage,
    totalPages,
    setCurrentPage,
    previousPage,
    nextPage,
  } = useCollectionPagination(collectionPath, pageSize);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.titluOferta
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())
      )
    );
  }, [searchQuery, posts]);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber === currentPage) return; // Add this to prevent reloading the same page data
    setCurrentPage(newPageNumber); // This should ideally happen before fetching new data
    if (newPageNumber > currentPage) {
      nextPage();
    } else {
      previousPage();
    }
  };

  const handleSearchChange = (query) => {
    if (query === 0) {
      if (newPageNumber > currentPage) {
        nextPage();
      } else {
        previousPage();
      }
    } else {
      setSearchQuery(query);
    }
  };

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
                        <i className="fa fa-bars pr10"></i> Navigatie panou de
                        administrare
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Lista oferte</h2>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox onSearchChange={handleSearchChange} />
                        </div>
                      </li>
                      {/* End li */}

                      {/* <li className="list-inline-item">
                        <Filtering />
                      </li> */}
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData
                          oferte={
                            filteredPosts.length > 0
                              ? filteredPosts
                              : filteredPosts.length === 0 &&
                                searchQuery.length > 0
                              ? filteredPosts
                              : posts
                          }
                        />
                      </div>
                      {/* End .table-responsive */}

                      <div className="mbp_pagination">
                        <Pagination
                          onPageChange={handlePageChange}
                          currentPage={currentPage}
                          totalPages={totalPages}
                        />
                      </div>
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
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

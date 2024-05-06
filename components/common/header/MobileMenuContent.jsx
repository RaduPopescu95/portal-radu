"use client";

// import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  Sidebar,
} from "react-pro-sidebar";
import Link from "next/link";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const pages = [
  { id: 1, name: "Despre noi", routerPath: "/despre-noi" },
  // { id: 2, name: "Faq", routerPath: "/faq" },
  {
    id: 3,
    name: "Termeni & Conditii",
    routerPath: "/termeni-confidentialitate",
  },
  // { id: 3, name: "Cum functioneaza", routerPath: "/cum-functioneaza" },
];

const MobileMenuContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userData, currentUser } = useAuth();

  return (
    <>
      <div className="sidebar-header">
        <Link href="/" className="sidebar-header-inner">
          {/* <Image
              width={40}
              height={45}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/header-logo2.png"
              alt="header-logo.png"
            /> */}
          <span className="brand-text">Portal</span>
        </Link>
        {/* End .logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="flaticon-close"></span>
        </div>
        {/* Mobile Menu close icon */}
      </div>

      {/* End logo */}
      {/* <Sidebar> */}
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <Menu>
          <MenuItem>
            <div
              onClick={() => router.push("/")}
              className={
                pathname === "/" ? "ui-active" : "inactive-mobile-menu"
              }
            >
              Acasă
            </div>
          </MenuItem>
          <MenuItem>
            <div
              onClick={() => router.push("/parteneri")}
              className={
                pathname === "/parteneri" ? "ui-active" : "inactive-mobile-menu"
              }
            >
              Parteneri
            </div>
          </MenuItem>

          <SubMenu
            label="Despre noi"
            className={
              pages.some(
                (page) =>
                  page.routerPath?.split("/")[1] === pathname.split("/")[1]
              )
                ? "parent-menu-active"
                : "inactive-mobile-menu"
            }
          >
            {pages.map((val, i) => (
              <MenuItem key={i}>
                <div
                  onClick={() => router.push(val.routerPath)}
                  className={
                    pathname?.split("/")[1] === val.routerPath?.split("/")[1]
                      ? "ui-active"
                      : "inactive-mobile-menu"
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End pages Pages */}

          <MenuItem>
            <div
              onClick={() => router.push("/contact")}
              className={
                pathname === "/contact" ? "ui-active" : "inactive-mobile-menu"
              }
            >
              Contact
            </div>
          </MenuItem>

          <MenuItem>
            <div
              onClick={() => router.push("/plangeri")}
              className={
                pathname === "/plangeri" ? "ui-active" : "inactive-mobile-menu"
              }
            >
              Plângeri
            </div>
          </MenuItem>

          {currentUser && userData?.userType ? null : (
            <>
              <MenuItem>
                <a
                  href="#"
                  className="btn flaticon-user pl0"
                  data-bs-toggle="modal"
                  data-bs-target=".bd-partener-modal-lg"
                >
                  <span className="pl5">Partener</span>
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="btn flaticon-user pl0"
                  data-bs-toggle="modal"
                  data-bs-target=".bd-partener-modal-lg"
                >
                  <span className="pl5">Utilizator</span>
                </a>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
      {/* </Sidebar> */}
      {userData?.userType === "Partener" && currentUser ? (
        <Link
          href="/panou-partener"
          className="btn btn-block btn-lg btn-thm circle"
          style={{ width: "90%", margin: "10px auto" }}
        >
          Cont Partener
        </Link>
      ) : userData?.userType === "Doctor" && currentUser ? (
        <Link
          href="/utilizator"
          className="btn btn-block btn-lg btn-thm circle"
          style={{ width: "90%", margin: "0px auto" }}
        >
          Cont Utilizator
        </Link>
      ) : null}
    </>
  );
};

export default MobileMenuContent;

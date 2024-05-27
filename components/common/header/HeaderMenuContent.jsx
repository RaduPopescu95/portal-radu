"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();
  const { userData, currentUser } = useAuth();

  const home = [
    {
      id: 1,
      name: "Home 1",
      routerPath: "/",
    },
  ];

  const listing = [
    {
      id: 1,
      title: "Listing Grid",
      items: [
        {
          name: "Grid v1",
          routerPath: "/parteneri",
        },
      ],
    },
  ];

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

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="last">
        <Link href="/" className={pathname === "/" ? "ui-active" : undefined}>
          Acasă
        </Link>
      </li>
      {/* End .simpleitem */}

      {/* <li className="last">
        <Link
          href="/parteneri"
          className={pathname === "/parteneri" ? "ui-active" : undefined}
        >
          Parteneri
        </Link>
      </li> */}
      {/* End .simpleitem */}

      <li className="dropitem">
        <a
          href="#"
          className={
            pages.some(
              (page) =>
                page.routerPath?.split("/")[1] === pathname?.split("/")[1]
            )
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">Despre noi</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {pages.map((item) => (
            <li key={item.id}>
              <Link
                href={item.routerPath}
                className={
                  pathname?.split("/")[1] === item.routerPath?.split("/")[1]
                    ? "ui-active"
                    : undefined
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* End .dropitem */}

      {/* <li className="last">
        <Link
          href="/blog-list-1"
          className={pathname === "/blog-list-1" ? "ui-active" : undefined}
        >
          Blog
        </Link>
      </li> */}
      {/* End .simpleitem */}

      <li className="last">
        <Link
          href="/contact"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          Contact
        </Link>
      </li>
      {/* End .simpleitem */}

      <li className="last">
        <Link
          href="/plangeri"
          className={pathname === "/plangeri" ? "ui-active" : undefined}
        >
          Plângeri
        </Link>
      </li>
      {/* End .simpleitem */}

      {currentUser && userData?.userType ? null : (
        <>
          <li className={`list-inline-item list_s ${float}`}>
            <a
              href="#"
              // className="btn flaticon-user"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target=".bd-utilizator-modal-lg"
            >
              <Image
                src={
                  pathname === "/"
                    ? "/assets/images/iconite/cadremedicale2.png"
                    : "/assets/images/iconite/cadremedicale1.png"
                }
                alt="Cadre medicale Icon"
                width={25} // Setează lățimea iconului
                height={25} // Setează înălțimea iconului
                priority // Încarcă imaginea cât mai rapid posibil
                className="mr5 mb-1"
              />
              <span className="dn-lg">Cadre medicale</span>
            </a>
          </li>
          {/* End .dropitem */}
          <li className={`list-inline-item list_s ${float}`}>
            <a
              href="#"
              // className="btn flaticon-user" flaticon-user pentru a afisa icon
              className="btn"
              data-bs-toggle="modal"
              data-bs-target=".bd-partener-modal-lg"
            >
              <Image
                src={
                  pathname === "/"
                    ? "/assets/images/iconite/parteneri2.png"
                    : "/assets/images/iconite/parteneri1.png"
                }
                alt="Cadre medicale Icon"
                width={25} // Setează lățimea iconului
                height={25} // Setează înălțimea iconului
                priority // Încarcă imaginea cât mai rapid posibil
                className="mr5 mb-1"
              />
              <span className="dn-lg"> Parteneri</span>
            </a>
          </li>
          {/* End .dropitem */}
        </>
      )}

      {userData?.userType === "Partener" && currentUser ? (
        <li className={`list-inline-item add_listing ${float}`}>
          <Link href="/panou-partener">
            <span className="dn-lg">CONTUL MEU</span>
          </Link>
        </li>
      ) : userData?.userType === "Doctor" && currentUser ? (
        <li className={`list-inline-item add_listing ${float}`}>
          <Link href="/panou-doctor">
            <span className="dn-lg">CONTUL MEU</span>
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default HeaderMenuContent;

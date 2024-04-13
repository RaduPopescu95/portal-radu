"use client";
import { useAuth } from "@/context/AuthContext";
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

  const property = [
    {
      id: 1,
      title: "User Admin",
      items: [
        {
          name: "Cont",
          routerPath: "/utilizator",
        },
      ],
    },
  ];

  const blog = [{ id: 1, name: "Blog List 1", routerPath: "/blog-list-1" }];

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
        <Link
          href="/"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          Acasă
        </Link>
      </li>
      {/* End .simpleitem */}

      <li className="last">
        <Link
          href="/parteneri"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          Parteneri
        </Link>
      </li>
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

      {currentUser && userData?.userType ? null : (
        <>
          <li className={`list-inline-item list_s ${float}`}>
            <a
              href="#"
              className="btn flaticon-user"
              data-bs-toggle="modal"
              data-bs-target=".bd-utilizator-modal-lg"
            >
              <span className="dn-lg">Utilizator</span>
            </a>
          </li>
          {/* End .dropitem */}
          <li className={`list-inline-item list_s ${float}`}>
            <a
              href="#"
              className="btn flaticon-user"
              data-bs-toggle="modal"
              data-bs-target=".bd-partener-modal-lg"
            >
              <span className="dn-lg">Partener</span>
            </a>
          </li>
          {/* End .dropitem */}
        </>
      )}

      {userData?.userType === "Partener" && currentUser ? (
        <li className={`list-inline-item add_listing ${float}`}>
          <Link href="/panou-partener">
            <span className="dn-lg">CONT PARTENER</span>
          </Link>
        </li>
      ) : userData?.userType === "Doctor" && currentUser ? (
        <li className={`list-inline-item add_listing ${float}`}>
          <Link href="/utilizator">
            <span className="dn-lg">CONT UTILIZATOR</span>
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default HeaderMenuContent;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-link.module.css";

const NavLink = ({ href, children }) => {
  // gives the path after the domain
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`${classes.link} ${
        path.startsWith(href) ? classes.active : undefined
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

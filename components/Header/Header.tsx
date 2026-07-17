"use client";
import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";
  return (
    <header className={css.header}>
      <Link href="/">
        <Image src="/logo.svg" width={136} height={16} alt="logo"></Image>
      </Link>
      <nav>
        <ul className={css.navigation}>
          <li>
            <Link
              className={`${css.link} ${pathname === "/" ? css.active : ""}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${css.link} ${isCatalogPage ? css.active : ""}`}
              href="/catalog"
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

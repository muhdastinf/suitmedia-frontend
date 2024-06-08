import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/images/suitmedia-logo-fix.png";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [lastScrollY]);

  const pathname = usePathname();

  return (
    <header
      className={`fixed top-0 left-0 w-full shadow transition-transform bg-[#eb6125] duration-200 z-50 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex p-2 items-center">
        <div className="container mx-auto text-white">
          <Image
            src={Logo}
            alt="Logo"
            width={180}
            height={180}
            className="lg:ml-12 md:ml-2"
          ></Image>
        </div>
        <div>
          <ul className="flex flex-row lg:space-x-2 lg:mr-12 font-base md:mr-4 lg:text-base mt-1 md:text-sm">
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/" ? "fix-underline" : "link-underline"}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/work" ? "fix-underline" : "link-underline"}`}>
              <Link href="/work">Work</Link>
            </li>
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/about" ? "fix-underline" : "link-underline"}`}>
              <Link href="/about">About</Link>
            </li>
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/services" ? "fix-underline" : "link-underline"}`}>
              <Link href="/services">Services</Link>
            </li>
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/ideas" ? "fix-underline" : "link-underline"}`}>
              <Link href="/ideas">Ideas</Link>
            </li>
            <li className={`text-white hover:text-orange-300 cursor-pointer px-2 pb-2 ${pathname === "/careers" ? "fix-underline" : "link-underline"}`}>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .link-underline,
        .fix-underline {
          border-bottom-width: 0;
          background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
          background-size: 0 4px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.3s ease-in-out;
        }

        .link-underline:hover {
          background-size: 100% 4px;
          background-position: 0 100%;
        }

        .fix-underline {
          background-size: 100% 4px;
          background-position: 0 100%;
        }
      `}</style>
    </header>
  );
}

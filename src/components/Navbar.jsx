"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faClock,
  faHouse,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/timeline", label: "Timeline", icon: faClock },
  { href: "/stats", label: "Stats", icon: faChartLine },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white border-b border-[#E9E9E9] sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-20 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[24px] leading-[1.3] font-semibold text-[#1F2937]"
        >
          KeenKeeper
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "h-11 px-4 rounded-[4px] inline-flex items-center justify-center gap-1 transition-colors",
                  active
                    ? "bg-[#244D3F] text-white"
                    : "bg-white text-[#64748B] hover:bg-black/5",
                ].join(" ")}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={[
                    "w-5 h-5",
                    active ? "text-white" : "text-[#64748B]",
                  ].join(" ")}
                />
                <span className="text-[16px] leading-[1.3] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#64748B] hover:bg-black/5 rounded-md transition-all duration-200"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#E9E9E9] bg-white",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-5 py-4 space-y-2">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={[
                  "w-full h-12 px-4 rounded-[4px] flex items-center gap-3 transition-colors",
                  active
                    ? "bg-[#244D3F] text-white"
                    : "bg-white text-[#64748B] hover:bg-black/5",
                ].join(" ")}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={[
                    "w-5 h-5",
                    active ? "text-white" : "text-[#64748B]",
                  ].join(" ")}
                />
                <span className="text-[18px] leading-[1.3] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
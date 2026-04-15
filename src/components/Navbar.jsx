"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faClock, faHouse } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/timeline", label: "Timeline", icon: faClock },
  { href: "/stats", label: "Stats", icon: faChartLine },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-[#E9E9E9]">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-20 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[24px] leading-[1.3] font-semibold text-[#1F2937]"
        >
          KeenKeeper
        </Link>

        <div className="flex items-center">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

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
      </div>
    </nav>
  );
}
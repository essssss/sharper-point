"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "tests", href: "/testing" },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-400 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-gray-200 text-gray-900":
                                    pathname === link.href,
                            }
                        )}
                    >
                        <p className="">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
